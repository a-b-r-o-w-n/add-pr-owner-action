# add-reviewer-as-assignee-action

Adds code reviewer as pull request assignee.

## Why?

In larger projects with many reviewers and many pull requests, it is difficult to quickly see if a pull request has an owner (someone responsible for reviewing).
This action automatically adds anyone who reviews a pull request its assignees. With assignees, its much easier to tell if a pull request has an owner.

## Usage

In `.github/workflows/add-pr-owner.yml`:

```yml
name: Add PR Owner

on:
  pull_request_review:
    types: [submitted]

jobs:
  add-pr-owner:
    runs-on: ubuntu-latest
    steps:
      - uses: a-b-r-o-w-n/add-pr-owner-action@v1
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```
