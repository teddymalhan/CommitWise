# CommitWise 
![Screenshot 2024-08-23 at 19 08 18](https://github.com/user-attachments/assets/7e56b840-77d4-49d4-ab64-80357ae4f8da)

## Overview

**CommitWise** is a powerful tool that allows developers to create interactive tutorials directly from a GitHub repository. This application simplifies the process of teaching and learning by enabling users to attach explanations and code sections to specific commits in a Git repository. It also supports AI-powered explanations to assist in generating detailed and understandable content.

## Features

- **Interactive Tutorials**: Create tutorials that guide users step-by-step through a Git repository.
- **Commit-Based Sections**: Link specific commits to tutorial sections, allowing users to see code changes in context.
- **AI-Assisted Explanations**: Use AI to generate explanations for the code, making it easier to understand complex logic.
- **Easy Integration**: Pass in the link to a GitHub repository, and the app will automatically fetch all the commits.
- **Customizable Content**: Write your own explanations or use the AI suggestions to enhance your tutorials.
- **User-Friendly Interface**: Navigate through the tutorial using an intuitive interface that highlights both the code and explanations.

## Installation

To install and run CommitWise, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/teddymalhan/commitwise.git
    ```
   
2. **Navigate to the Project Directory**:
    ```bash
    cd commitwise/frontend
    ```

3. **Install the Required Dependencies**:
    ```bash
    pnpm i
    ```

4. **Run the Application**:
    ```bash
    pnpm run dev
    ```

## Usage

1. **Open the Application**:
    Once the application is running, open your browser and navigate to `http://localhost:3000`.

2. **Input the GitHub Repository URL**:
    Enter the URL of the GitHub repository you want to create a tutorial for.

3. **Fetch Commits**:
    The app will fetch all commits from the repository and display them in a timeline.

4. **Attach Explanations**:
    Select a commit to attach an explanation. You can write your own or use the AI-generated suggestion.

5. **Generate and Share**:
    After you've finished, you can export the tutorial and share it with others.

## Database Design

Here’s an overview of the database design used in CommitWise. This design helps to efficiently manage and link tutorial data with Git commits.

![Database Design](https://github.com/user-attachments/assets/f32f4af4-fa04-4b99-a788-4bf5511f806c))

## Examples

Here’s a simple example to get you started:

- **Repository**: [Sample GitHub Repo](https://github.com/yourusername/sample-repo)
- **Tutorial**: This tutorial walks through the basic setup and configuration of a Python project, including setting up a virtual environment, installing dependencies, and creating a basic Python script.

## Contribution

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

Please make sure to follow the [contribution guidelines](CONTRIBUTING.md) when submitting changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
