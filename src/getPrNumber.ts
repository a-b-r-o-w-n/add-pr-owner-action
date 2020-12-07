import * as github from "@actions/github";

export function getPrNumber(): number {
  const pullRequest = github.context.payload.pull_request;

  if (!pullRequest) {
    throw new Error("Not in a pull request context.");
  }

  return pullRequest.number;
}
