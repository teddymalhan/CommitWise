import unittest
import json
import os
from unittest.mock import patch, MagicMock
import boto3
from moto import mock_aws
from app import app, DYNAMODB_TABLE_NAME

class CommitGetterServiceTests(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        # Set environment variables for testing
        os.environ['GITHUB_TOKEN'] = 'test_token'
        os.environ['AWS_REGION'] = 'us-east-1'


    @patch('app.Github')
    @mock_aws
    def test_fetch_commits_success(self, mock_github):
        # Mock DynamoDB
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        dynamodb.create_table(
            TableName=DYNAMODB_TABLE_NAME,
            KeySchema=[{'AttributeName': 'sha', 'KeyType': 'HASH'}],
            AttributeDefinitions=[{'AttributeName': 'sha', 'AttributeType': 'S'}],
            ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
        )

        # Mock GitHub API response
        mock_repo = MagicMock()
        mock_commit = MagicMock()
        mock_commit.sha = 'test_sha'
        mock_commit.commit.author.name = 'Test Author'
        mock_commit.commit.author.email = 'test@example.com'
        mock_commit.commit.author.date.isoformat.return_value = '2024-01-01T00:00:00'
        mock_commit.commit.message = 'Test commit message'
        mock_repo.get_commits.return_value = [mock_commit]

        mock_user = MagicMock()
        mock_user.get_repo.return_value = mock_repo
        mock_github_instance = mock_github.return_value
        mock_github_instance.get_user.return_value = mock_user

        payload = {'repo_url': 'https://github.com/user/repo'}
        response = self.app.post('/fetch_commits', json=payload)
        data = json.loads(response.data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Commits fetched and stored successfully')

        # Verify data in DynamoDB
        table = dynamodb.Table(DYNAMODB_TABLE_NAME)
        db_response = table.get_item(Key={'sha': 'test_sha'})
        self.assertIn('Item', db_response)
        self.assertEqual(db_response['Item']['author_name'], 'Test Author')
        self.assertEqual(db_response['Item']['repo_url'], 'https://github.com/user/repo')


    def test_fetch_commits_missing_repo_url(self):
        response = self.app.post('/fetch_commits', json={})
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['error'], 'Repository URL is required')

    @patch('app.Github')
    def test_fetch_commits_github_exception(self, mock_github):
        mock_github.side_effect = Exception("GitHub API Error")
        payload = {'repo_url': 'https://github.com/user/repo'}
        response = self.app.post('/fetch_commits', json=payload)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 500)
        self.assertIn('GitHub API Error', data['error'])


    @mock_aws
    def test_get_commits_success(self):
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        table = dynamodb.create_table(
            TableName=DYNAMODB_TABLE_NAME,
            KeySchema=[{'AttributeName': 'sha', 'KeyType': 'HASH'}],
            AttributeDefinitions=[{'AttributeName': 'sha', 'AttributeType': 'S'}],
            ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
        )
        # Add some mock data
        mock_commit_item = {
            'sha': 'test_sha_123',
            'author_name': 'Another Author',
            'author_email': 'another@example.com',
            'date': '2024-01-02T00:00:00',
            'message': 'Another commit message',
            'repo_url': 'https://github.com/test/repo2'
        }
        table.put_item(Item=mock_commit_item)

        response = self.app.get('/get_commits?repo_url=https://github.com/test/repo2')
        data = json.loads(response.data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['sha'], 'test_sha_123')
        self.assertEqual(data[0]['repo_url'], 'https://github.com/test/repo2')


    def test_get_commits_missing_repo_url(self):
        response = self.app.get('/get_commits')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['error'], 'Repository URL is required')

    @patch('app.table.scan')
    @mock_aws # Keep mock_aws for consistency even if not strictly needed for this specific boto error mock
    def test_get_commits_dynamodb_error(self, mock_scan):
        # Mock DynamoDB client error
        mock_scan.side_effect = boto3.exceptions.Boto3Error("DynamoDB scan error")

        # We need to ensure the table resource itself is mocked if app.table is accessed before scan
        # However, in this case, we are directly mocking table.scan
        # For a ClientError, it's more specific:
        from botocore.exceptions import ClientError
        mock_scan.side_effect = ClientError({'Error': {'Code': 'ResourceNotFoundException', 'Message': 'Table not found'}}, 'Scan')


        response = self.app.get('/get_commits?repo_url=https://github.com/nonexistent/repo')
        data = json.loads(response.data)

        self.assertEqual(response.status_code, 500)
        self.assertEqual(data['error'], 'Table not found')


if __name__ == '__main__':
    unittest.main()
