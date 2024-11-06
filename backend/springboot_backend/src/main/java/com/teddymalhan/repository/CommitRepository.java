package com.teddymalhan.repository;

import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.model.CreateTableEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.KeyType;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.services.dynamodb.model.ScalarAttributeType;
import software.amazon.awssdk.services.dynamodb.model.ProvisionedThroughput;
import com.teddymalhan.model.Commit;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.services.dynamodb.model.AttributeDefinition;
import software.amazon.awssdk.services.dynamodb.model.CreateTableRequest;
import software.amazon.awssdk.services.dynamodb.model.KeySchemaElement;
import software.amazon.awssdk.services.dynamodb.model.ResourceNotFoundException;

@Repository
public class CommitRepository {
        private final DynamoDbTable<Commit> commitTable;

        public CommitRepository(DynamoDbEnhancedClient enhancedClient) {
            this.commitTable = enhancedClient.table("CommitTable", TableSchema.fromBean(Commit.class));
        }

        public void saveCommit(Commit commit) {
            createTableifNotExists();
            commitTable.putItem(commit);
        }

        public Commit getCommitById(String commitId) {
            return commitTable.getItem(Key.builder().partitionValue(commitId).build());
        }

        public void deleteCommitById(String commitId) {
            commitTable.deleteItem(Key.builder().partitionValue(commitId).build());
        }

        private void createTableifNotExists() {
            try {
                commitTable.describeTable();
            }
            catch (ResourceNotFoundException e)
            {
                ProvisionedThroughput provisionedThroughput1 = ProvisionedThroughput.builder().readCapacityUnits(50L).writeCapacityUnits(50L).build();
                commitTable.createTable(CreateTableEnhancedRequest.builder()
                        .provisionedThroughput(provisionedThroughput1)
                        .build());
            }
        }
}