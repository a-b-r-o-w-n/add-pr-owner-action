import * as core from "@actions/core";
import { Octokit } from "@octokit/rest";

import { addAssignees } from "./addAssignees";
import { getReviewers } from "./getReviewers";

async function run() {
  try {
    const octokit = new Octokit({
      auth: core.getInput("repo-token", { required: true }),
      log: {
        debug: core.debug,
        info: core.info,
        warn: core.warning,
        error: core.error,
      },
    });

    const reviewers = await getReviewers(octokit);
    await addAssignees(octokit, reviewers);
  } catch (err) {
    core.setFailed(err.message ?? "Error assigning reviewers.");
  }
}

run();
