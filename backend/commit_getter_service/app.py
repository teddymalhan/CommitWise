import os
from flask import Flask, request, jsonify
from github import Github
import boto3
from botocore.exceptions import ClientError

app = Flask(__name__)

# Configuration
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')
DYNAMODB_TABLE_NAME = 'commits'
AWS_REGION = os.environ.get('AWS_REGION', 'us-east-1')

# Initialize GitHub client
g = Github(GITHUB_TOKEN)

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name=AWS_REGION)
table = dynamodb.Table(DYNAMODB_TABLE_NAME)

@app.route('/fetch_commits', methods=['POST'])
def fetch_commits():
    data = request.get_json()
    repo_url = data.get('repo_url')

    if not repo_url:
        return jsonify({'error': 'Repository URL is required'}), 400

    try:
        repo_name = repo_url.split('/')[-1]
        user_name = repo_url.split('/')[-2]
        repo = g.get_user(user_name).get_repo(repo_name)
        commits = repo.get_commits()

        for commit in commits:
            commit_data = {
                'sha': commit.sha,
                'author_name': commit.commit.author.name,
                'author_email': commit.commit.author.email,
                'date': commit.commit.author.date.isoformat(),
                'message': commit.commit.message,
                'repo_url': repo_url
            }
            table.put_item(Item=commit_data)

        return jsonify({'message': 'Commits fetched and stored successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_commits', methods=['GET'])
def get_commits():
    repo_url = request.args.get('repo_url')

    if not repo_url:
        return jsonify({'error': 'Repository URL is required'}), 400

    try:
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr('repo_url').eq(repo_url)
        )
        return jsonify(response.get('Items', [])), 200
    except ClientError as e:
        return jsonify({'error': e.response['Error']['Message']}), 500

if __name__ == '__main__':
    # Create DynamoDB table if it doesn't exist
    try:
        table = dynamodb.create_table(
            TableName=DYNAMODB_TABLE_NAME,
            KeySchema=[
                {
                    'AttributeName': 'sha',
                    'KeyType': 'HASH'  # Partition key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'sha',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        table.wait_until_exists()
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceInUseException':
            print(f"Table {DYNAMODB_TABLE_NAME} already exists.")
        else:
            raise
    app.run(debug=True, host='0.0.0.0', port=5000)
