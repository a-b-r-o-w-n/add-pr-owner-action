import * as core from "@actions/core";
import { Octokit } from "@octokit/rest";
import chunk from "lodash.chunk";

export async function addAssignees(
  octokit: Octokit,
  owner: string,
  repo: string,
  prNumber: number,
  assignees: string[]
) {
  core.info(`Assigning ${assignees.join(", ")}.`);
  const chunks = chunk(assignees, 10);

  await Promise.all(
    chunks.map((batch) =>
      octokit.issues.addAssignees({
        repo,
        owner,
        issue_number: prNumber,
        assignees: batch,
      })
    )
  );
}
