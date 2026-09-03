export type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
};

export type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

const githubUsername = "jeevank15";

export async function getGithubProfile(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as GitHubUser;
  } catch {
    return null;
  }
}

export async function getGithubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=6&sort=updated`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const repositories = (await response.json()) as GitHubRepo[];
    return repositories.map((repository) => ({
      ...repository,
      html_url: repository.html_url.replace(
        /^https:\/\/github\.com\/[^/]+/i,
        `https://github.com/${githubUsername}`,
      ),
    }));
  } catch {
    return [];
  }
}
