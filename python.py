import os
import json
import git

def get_commit_diffs(repo, commit):
    diffs = []
    for diff in commit.diff(commit.parents[0] if commit.parents else None, create_patch=True):
        file_path = diff.a_path if diff.a_path else diff.b_path
        if file_path and file_path.endswith(('.py', '.java', '.js', '.ts', '.cpp', '.c', '.h')):  # Modify extensions as needed
            file_diff = {
                "file_path": file_path,
                "diff": ""
            }
            for line in diff.diff.decode('utf-8').splitlines():
                if line.startswith('@@'):
                    file_diff["diff"] += line + '\n'
                elif line.startswith('-') or line.startswith('+'):
                    file_diff["diff"] += line + '\n'
                else:
                    file_diff["diff"] += line + '\n'
            diffs.append(file_diff)
    return diffs

def generate_commit_history(repo_path):
    repo = git.Repo(repo_path)
    commit_data = []

    for commit in repo.iter_commits('HEAD'):
        commit_info = {
            "commit_message": commit.message.strip(),
            "diffs": get_commit_diffs(repo, commit)
        }
        commit_data.append(commit_info)

    return commit_data

def save_commit_history_to_json(commit_data, output_file):
    with open(output_file, 'w') as f:
        json.dump(commit_data, f, indent=4)

if __name__ == "__main__":
    repo_path = os.path.abspath(".")  # Path to the git repository
    output_file = "commit_history.json"  # Output file

    commit_data = generate_commit_history(repo_path)
    save_commit_history_to_json(commit_data, output_file)

    print(f"Commit history saved to {output_file}")

