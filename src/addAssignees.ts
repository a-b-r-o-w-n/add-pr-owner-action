import * as core from "@actions/core";
import { Octokit } from "@octokit/rest";
import chunk from "lodash.chunk";

import { commonOptions } from "./commonOptions";

export async function addAssignees(octokit: Octokit, assignees: string[]) {
  core.info(`Assigning ${assignees.join(", ")}.`);
  const chunks = chunk(assignees, 10);
  const { repo, owner, pull_number: issue_number } = commonOptions();

  try {
    await Promise.all(
      chunks.map((batch) =>
        octokit.issues.addAssignees({
          repo,
          owner,
          issue_number,
          assignees: batch,
        })
      )
    );
  } catch (err) {
    if (err.status === 403) {
      core.warning("Unable to assign users. Token provided does not have write permission.");
    } else {
      throw err;
    }
  }
}
