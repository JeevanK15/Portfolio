import { UsersRound } from "lucide-react";

import { leadership } from "@/data/leadership";

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="section-kicker mb-4">08 / Leadership · Initiative in action</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Contributing through initiative and departmental leadership.
        </h2>
      </div>

      <div className="rounded-[1.8rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm sm:p-8">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 text-accent">
            <UsersRound size={20} />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Leadership</p>
            <p className="mt-1 text-sm font-medium text-foreground">Department Association</p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Role</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {leadership.role}
            </h3>
          </div>
          <div className="rounded-full border border-border bg-background/30 px-3 py-1.5 text-sm font-medium text-foreground">
            {leadership.organization}
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          {leadership.description}
        </p>
      </div>
    </section>
  );
}
