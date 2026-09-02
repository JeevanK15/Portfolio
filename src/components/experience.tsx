import { ArrowUpRight, BriefcaseBusiness, CalendarRange, MapPin } from "lucide-react";

import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="section-kicker mb-4">03 / Experience · From classroom to real-world work</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Hands-on experience across data, frontend, and practical project work.
        </h2>
      </div>

      <div className="experience-timeline space-y-8">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.role}`}
            className={[
              "experience-card group relative rounded-[1.4rem] border border-border bg-card/70 p-5 shadow-[var(--shadow)] backdrop-blur-sm sm:p-7",
              index % 2 === 0 ? "md:mr-[50%] md:pr-10" : "md:ml-[50%] md:pl-10",
            ].join(" ")}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                <BriefcaseBusiness size={18} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Internship</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{experience.company}</p>
                </div>
              </div>
              <span className="experience-index font-mono text-xs text-muted-foreground">0{index + 1}</span>
            </div>

            <div className="experience-role border-y border-border py-5">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-[1.7rem]">
                {experience.role}
              </h3>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} />
                  {experience.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarRange size={14} />
                  {experience.startDate} – {experience.endDate}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-accent">
              <span className="h-px w-5 bg-secondary-accent/60" />
              Key experience
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
              {experience.description.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
              {experience.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-border bg-background/30 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition group-hover:border-accent/30 group-hover:text-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Role overview <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
