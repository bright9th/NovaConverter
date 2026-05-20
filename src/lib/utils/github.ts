export type RepoInfo = {
  owner: string;
  url: string;
};

export async function fetchRepoInfo() {
  try {
    const repoUrl = import.meta.env.VITE_REPO_URL;

    if (!repoUrl) {
      throw new Error("Missing repo URL");
    }

    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);

    if (!match) {
      throw new Error("Invalid repo URL");
    }

    const [, owner, repo] = match;

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
    );

    const data = await response.json();

    return {
      owner: data.owner.login,
      url: data.html_url,
    };
  } catch {
    return {
      owner: "The [ MAOU ]",
      url: "#",
    };
  }
}
