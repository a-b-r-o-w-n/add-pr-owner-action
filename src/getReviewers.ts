import { Octokit } from "@octokit/rest";

import { commonOptions } from "./commonOptions";

async function getAuthor(octokit: Octokit) {
  const resp = await octokit.pulls.get(commonOptions());

  return resp.data.user?.login;
}

export async function getReviewers(octokit: Octokit) {
  const resp = await octokit.pulls.listReviews(commonOptions());
  const author = await getAuthor(octokit);

  const users = resp.data.reduce((all, review) => {
    const login = review.user?.login;

    if (login && login !== author) {
      all.add(login);
    }

    return all;
  }, new Set<string>());

  return [...users];
}
