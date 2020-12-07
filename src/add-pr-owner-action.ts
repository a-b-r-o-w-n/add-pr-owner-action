import * as core from "@actions/core";
import * as github from "@actions/github";
import { Octokit } from "@octokit/rest";

import { addAssignees } from "./addAssignees";
import { getPrNumber } from "./getPrNumber";
import { getReviewers } from "./getReviewers";

const OWNER = github.context.repo.owner;
const REPO = github.context.repo.repo;

async function run() {
  try {
    const prNumber = getPrNumber();

    const octokit = new Octokit({
      auth: core.getInput("repo-token", { required: true }),
      log: {
        debug: core.debug,
        info: core.info,
        warn: core.warning,
        error: core.error,
      },
    });

    const reviewers = await getReviewers(octokit, OWNER, REPO, prNumber);
    await addAssignees(octokit, OWNER, REPO, prNumber, reviewers);
  } catch (err) {
    core.setFailed(err.message ?? "Error assigning reviewers.");
  }
}

run();
