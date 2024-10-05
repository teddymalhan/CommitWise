import boto3
from botocore.config import Config

s3 = boto3.client(
    's3',
    endpoint_url='http://localhost:4566',
    aws_access_key_id='test',
    aws_secret_access_key='test',
    region_name='us-west-2',
    config=Config(signature_version='s3v4')
)

def upload_file_to_s3(bucket_name, file_name, file_content):
    s3.put_object(Bucket=bucket_name, Key=file_name, Body=file_content)

def download_file_from_s3(bucket_name, file_name):
    response = s3.get_object(Bucket=bucket_name, Key=file_name)
    return response['Body'].read()
