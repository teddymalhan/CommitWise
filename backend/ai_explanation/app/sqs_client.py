import boto3

sqs = boto3.client(
    'sqs',
    endpoint_url='http://localhost:4566',
    aws_access_key_id='test',
    aws_secret_access_key='test',
    region_name='us-west-2'
)

def send_message_to_queue(queue_url, message_body):
    sqs.send_message(QueueUrl=queue_url, MessageBody=message_body)

def receive_messages_from_queue(queue_url):
    response = sqs.receive_message(QueueUrl=queue_url, MaxNumberOfMessages=10)
    return response.get('Messages', [])
