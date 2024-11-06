use aws_config::meta::region::RegionProviderChain;
use aws_sdk_s3::primitives::ByteStream;
use aws_sdk_s3::types::SdkError;
use aws_sdk_s3::{config::Builder as S3ConfigBuilder, Client as S3Client};
use futures::StreamExt;
use git2::Repository;
use rdkafka::consumer::{Consumer, StreamConsumer};
use rdkafka::message::Message;
use rdkafka::ClientConfig;
use std::str;
use tokio::io::AsyncReadExt;
use tokio_postgres::{Client, NoTls};

#[tokio::main]
async fn main() {
    // Step 1: Kafka Consumer Setup
    let consumer: StreamConsumer = ClientConfig::new()
        .set("group.id", "rust-consumer-group")
        .set("bootstrap.servers", "localhost:9092")
        .create()
        .expect("Consumer creation failed");

    consumer
        .subscribe(&["your_topic"])
        .expect("Subscription failed");
    let mut message_stream = consumer.stream();

    // Step 2: PostgreSQL Setup
    let (pg_client, connection) = tokio_postgres::connect(
        "host=localhost user=postgres dbname=mydb password=mypassword",
        NoTls,
    )
    .await
    .expect("Postgres connection failed");
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Postgres connection error: {:?}", e);
        }
    });

    // Step 3: AWS S3 Client Setup (using Localstack)
    let region_provider = RegionProviderChain::default_provider().or_else("us-east-1");
    let aws_config = aws_config::from_env().region(region_provider).load().await;
    let s3_client = S3Client::from_conf(
        S3ConfigBuilder::new()
            .endpoint_url("http://localhost:4566")
            .build(),
    );

    while let Some(result) = message_stream.next().await {
        match result {
            Ok(message) => {
                if let Some(payload) = message.payload() {
                    let repo_name = String::from_utf8_lossy(payload);

                    // Fetch and clone the repository from S3
                    if let Err(e) = fetch_and_process_repo(&repo_name, &s3_client, &pg_client).await
                    {
                        eprintln!("Failed to process repository: {:?}", e);
                    }
                } else {
                    eprintln!("Received message with no payload");
                }
            }
            Err(e) => eprintln!("Error receiving message: {:?}", e),
        }
    }
}

async fn fetch_and_process_repo(
    repo_name: &str,
    s3_client: &S3Client,
    pg_client: &Client,
) -> Result<(), Box<dyn std::error::Error>> {
    // Step 4: Fetch the repository from S3
    let key = format!("{}.git", repo_name);
    let get_req = s3_client
        .get_object()
        .bucket("my-repo-bucket")
        .key(&key)
        .send()
        .await;

    let result = match get_req {
        Ok(output) => output,
        Err(SdkError::ServiceError { err, .. }) if err.is_no_such_key() => {
            eprintln!("File not found in bucket: {}", key);
            return Ok(());
        }
        Err(err) => return Err(Box::new(err)),
    };

    let mut repo_data = Vec::new();
    ByteStream::from(output.body.unwrap())
        .into_async_read()
        .read_to_end(&mut repo_data)
        .await?;

    // Step 5: Clone the repository from the downloaded data
    let temp_dir = tempfile::tempdir()?;
    let repo_path = temp_dir.path().join(repo_name);
    std::fs::create_dir_all(&repo_path)?;

    // Assuming the data is a bare repository
    std::fs::write(repo_path.join(".git"), &repo_data)?;

    let repo = Repository::open_bare(repo_path)?;

    // Step 6: Process each commit
    let mut revwalk = repo.revwalk()?;
    revwalk.push_head()?;

    for commit_id in revwalk {
        let commit = repo.find_commit(commit_id?)?;
        let commit_message = commit.message().unwrap_or("").to_string();
        let commit_author = commit.author().name().unwrap_or("").to_string();

        // Insert commit information into PostgreSQL
        pg_client
            .execute(
                "INSERT INTO commits (repo, author, message, date) VALUES ($1, $2, $3, $4)",
                &[
                    &repo_name,
                    &commit_author,
                    &commit_message,
                    &commit.time().seconds(),
                ],
            )
            .await?;
    }

    Ok(())
}
