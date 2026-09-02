import { Award, GraduationCap } from "lucide-react";

import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          05 / Education · The foundation
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Academic foundation in AI, data, and modern technology.
        </h2>
      </div>

      <div className="rounded-[1.8rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm sm:p-8">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40">
            <GraduationCap size={20} />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Degree</p>
            <p className="mt-1 text-sm font-medium text-foreground">{education.university}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {education.degree}
            </h3>
            <p className="mt-3 text-base text-muted-foreground">{education.institution}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {education.startYear} – {education.endYear}
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-border bg-background/30 p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Award size={14} />
              CGPA
            </div>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-foreground">
              {education.cgpa}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
