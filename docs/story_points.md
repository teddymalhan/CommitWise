## As this is a student project rather an enterprise solution, I'll be using LocalStack to simulate AWS services locally.

## This will allow me to develop and test the application without incurring any costs.

### Building the MVP for **CommitWise** Backend

### High-Level Objectives

1. **Core Functionality**: Implement the essential backend services that power the key features of CommitWise.
2. **Scalability**: Ensure the architecture is scalable from the start, leveraging microservices and cloud services like AWS.
3. **Security**: Implement basic security measures, including user authentication and API security.
4. **Observability**: Integrate basic logging and monitoring to help with troubleshooting and performance tracking.

### User Stories and Story Points

#### 1. **Set Up Basic Infrastructure (8 Story Points)**

- **Task**: Set up the initial project structure for the backend, including repositories, Docker setup, and integration with AWS.
- **Subtasks**:
  - [x] Initialize a new Git repository for the backend (1 SP).
  - [x] Set up Docker for microservices (2 SP).
  - [x] Configure basic AWS services (RDS, DynamoDB, S3, ElastiCache) (2 SP).

#### 2. **User Management Service (10 Story Points)**

    (I'll be doing this task later as I'll be the only user for now)

- **Task**: Implement user authentication and management, ensuring secure access to the application.
- **Subtasks**:
  - Set up user registration and login with JWT authentication (4 SP).
  - Integrate with Amazon Cognito or handle user management internally (3 SP).
  - Implement user roles and permissions (3 SP).

#### 3. **Commit Getter Service (8 Story Points)**

- **Task**: Develop a service to fetch and store commits from GitHub repositories.
- **Subtasks**:
  - Integrate with the GitHub API to fetch commit history (3 SP).
  - [x] Store commit data in DynamoDB (2 SP).
  - [x]Expose an API endpoint to retrieve commits (3 SP).

#### 4. **Diff Parser Service (10 Story Points)**

- **Task**: Parse commit diffs to extract relevant changes and prepare data for AI processing.
- **Subtasks**:
  - Implement diff parsing logic to extract changes (4 SP).
  - Store parsed diffs in DynamoDB (3 SP).
  - Expose an API endpoint to retrieve parsed diffs (3 SP).

#### 5. **AI Explanation Service (12 Story Points)**

- **Task**: Develop a service to generate explanations for parsed diffs using an AI model.
- **Subtasks**:
  - Integrate with the Ollama backend to generate explanations (4 SP).
  - Store AI-generated explanations in DynamoDB (3 SP).
  - Expose an API endpoint to retrieve AI explanations (3 SP).
  - Save AI output files to S3 and generate pre-signed URLs (2 SP).

#### 6. **API Gateway Setup (6 Story Points)**

- **Task**: Implement an API Gateway to manage and secure API requests across services.
- **Subtasks**:
  - Configure routing for microservices through API Gateway (3 SP).
  - Implement basic rate limiting and request validation (2 SP).
  - Set up logging and monitoring for API requests (1 SP).

#### 7. **Notification Service (8 Story Points)**

- **Task**: Implement a notification system to alert users when tasks are complete (optional for MVP but valuable).
- **Subtasks**:
  - Set up a messaging queue (SQS or Kafka) for notification triggers (3 SP).
  - Implement the notification delivery logic (3 SP).
  - Expose an API endpoint to manage notification settings (2 SP).

#### 8. **Monitoring and Logging (5 Story Points)**

- **Task**: Integrate basic logging and monitoring to ensure system observability.
- **Subtasks**:
  - Set up CloudWatch for centralized logging (2 SP).
  - Implement basic performance monitoring with CloudWatch Metrics (2 SP).
  - Set up alarms for critical failures or performance degradation (1 SP).

### Timeline and Prioritization

1. **Week 1:**

   - Complete the **Basic Infrastructure** setup (8 SP).
   - Begin work on the **User Management Service** (4 SP).

2. **Week 2:**

   - Finish the **User Management Service** (6 SP).
   - Start and finish the **Commit Getter Service** (8 SP).

3. **Week 3:**

   - Begin and complete the **Diff Parser Service** (10 SP).
   - Start work on the **AI Explanation Service** (6 SP).

4. **Week 4:**

   - Complete the **AI Explanation Service** (6 SP).
   - Set up the **API Gateway** (6 SP).

5. **Week 5:**

   - Implement **Monitoring and Logging** (5 SP).
   - Start work on the **Notification Service** (4 SP).

6. **Week 6:**
   - Finish the **Notification Service** (4 SP).
   - Final testing and deployment of the MVP.

### Deliverables for the MVP

1. **Functional Backend Services**: All core microservices operational, integrated with the frontend.
2. **Scalable Infrastructure**: Proper integration with AWS services ensuring scalability.
3. **Secure User Authentication**: Basic authentication and authorization mechanisms in place.
4. **APIs for Frontend Integration**: All necessary APIs exposed and documented for frontend use.
5. **Basic Monitoring**: Logging and monitoring configured to track the system’s health.
