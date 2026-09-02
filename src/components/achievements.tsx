import { Medal } from "lucide-react";

import { achievements } from "@/data/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="section-kicker mb-4">07 / Achievements · Milestones</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Recognition for consistency, innovation, and academic performance.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {achievements.map((achievement) => (
          <article
            key={achievement.title}
            className="rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 text-accent">
                <Medal size={18} />
              </span>
              <span className="rounded-full border border-border bg-background/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {achievement.subtitle}
              </span>
            </div>

            <h3 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
              {achievement.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {achievement.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
