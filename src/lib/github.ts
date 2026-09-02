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

export async function getGithubProfile(): Promise<GitHubUser | null> {
  try {
    const response = await fetch("https://api.github.com/users/jeevank15", {
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
    const response = await fetch("https://api.github.com/users/jeevank15/repos?per_page=6&sort=updated", {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as GitHubRepo[];
  } catch {
    return [];
  }
}
