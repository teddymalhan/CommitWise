import boto3

sns = boto3.client(
    'sns',
    endpoint_url='http://localhost:4566',
    aws_access_key_id='test',
    aws_secret_access_key='test',
    region_name='us-west-2'
)

def publish_to_topic(topic_arn, message):
    sns.publish(TopicArn=topic_arn, Message=message)
