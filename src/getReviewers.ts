import { Octokit } from "@octokit/rest";

export async function getReviewers(octokit: Octokit, owner: string, repo: string, prNumber: number) {
  const resp = await octokit.pulls.listReviews({
    owner,
    repo,
    pull_number: prNumber,
  });

  const users = resp.data.reduce((all, review) => {
    if (review.user) {
      all.add(review.user.login);
    }

    return all;
  }, new Set<string>());

  return [...users];
}
