import { BadgeCheck } from "lucide-react";

import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="section-kicker mb-4">06 / Certifications · Recognized learning</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Recognized learning milestones in web, agile delivery, and development workflows.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((certification) => (
          <article
            key={`${certification.title}-${certification.issuer}`}
            className="rounded-[1.5rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 text-accent">
              <BadgeCheck size={18} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {certification.year}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-foreground">
              {certification.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{certification.issuer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
