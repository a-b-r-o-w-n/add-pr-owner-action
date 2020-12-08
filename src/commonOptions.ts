import * as github from "@actions/github";

export const owner = () => github.context.repo.owner;
export const repo = () => github.context.repo.repo;

export function getPrNumber(): number {
  const pullRequest = github.context.payload.pull_request;

  if (!pullRequest) {
    throw new Error("Not in a pull request context.");
  }

  return pullRequest.number;
}

export function commonOptions() {
  return {
    owner: owner(),
    repo: repo(),
    pull_number: getPrNumber(),
  };
}
