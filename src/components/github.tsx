import { Code2, ExternalLink, GitFork, Star } from "lucide-react";
import Image from "next/image";

import { profile } from "@/data/profile";
import { getGithubProfile, getGithubRepos } from "@/lib/github";

export async function GitHubSection() {
  const githubProfile = (await getGithubProfile()) ?? {
    login: "jeevank15",
    name: "Jeevan K",
    bio: "AI & Data Science student exploring full-stack and practical project building.",
    public_repos: 2,
    followers: 0,
    following: 0,
    html_url: profile.githubUrl,
    avatar_url: "/images/profile/profile-placeholder.svg",
  };

  const repos = (await getGithubRepos()).slice(0, 3);

  return (
    <section id="github" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="section-kicker mb-4">09 / GitHub · Coding in the open</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Coding activity, learning momentum, and project exploration.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[1.8rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Image
              src={githubProfile.avatar_url}
              alt="GitHub profile avatar"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border border-border object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                {githubProfile.name ?? "Jeevan K"}
              </h3>
              <p className="text-sm text-muted-foreground">@{githubProfile.login}</p>
            </div>
          </div>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {githubProfile.bio ?? "Building practical projects and learning by solving real problems."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1rem] border border-border bg-background/30 p-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Repos</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{githubProfile.public_repos}</p>
            </div>
            <div className="rounded-[1rem] border border-border bg-background/30 p-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Followers</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{githubProfile.followers}</p>
            </div>
            <div className="rounded-[1rem] border border-border bg-background/30 p-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Following</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{githubProfile.following}</p>
            </div>
          </div>

          <a
            href={githubProfile.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent/60 hover:bg-accent/15"
          >
            <Code2 size={16} />
            Visit GitHub
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="space-y-4">
          {repos.length > 0 ? (
            repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.5rem] border border-border bg-card/70 p-5 shadow-[var(--shadow)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">
                      {repo.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {repo.description ?? "Project repository with ongoing development."}
                    </p>
                  </div>
                  <span className="rounded-full border border-border bg-background/30 p-2 text-muted-foreground">
                    <ExternalLink size={15} />
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={12} />
                    {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitFork size={12} />
                    {repo.forks_count}
                  </span>
                  <span>{repo.language ?? "Code"}</span>
                </div>
              </a>
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-border bg-card/70 p-5 text-sm text-muted-foreground">
              Recent repository data is temporarily unavailable, but the portfolio remains actively updated.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
