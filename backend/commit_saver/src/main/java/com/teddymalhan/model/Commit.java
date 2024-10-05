package com.teddymalhan.model;

import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

import java.util.List;

@Data
@DynamoDbBean
public class Commit {
    private String repositoryId; // Unique identifier for the repository
    private String commitId; // Unique identifier for the commit and the partition key
    private String message;
    private String ai_explanation; // AI-generated explanation for the commit
    private String author;
    private String timestamp;
    private List<String> files; // List of files that were changed in the commit stored in S3 buckets

    @DynamoDbPartitionKey
    public String getCommitId() {
        return commitId;
    }

    @DynamoDbSortKey
    public String getRepositoryId() {
        return repositoryId;
    }
}
