import { ArrowUpRight, Code2, Sparkles } from "lucide-react";
import Image from "next/image";

import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          04 / Projects · Things I&apos;ve built
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Iterative projects that combine real-world problem solving with practical building.
        </h2>
      </div>

      <div className="space-y-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-card overflow-hidden rounded-[1.8rem] border border-border bg-card/70 shadow-[var(--shadow)] backdrop-blur-sm"
          >
            <div className="grid gap-8 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-7">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Sparkles size={12} />
                    Project
                  </span>
                  <span className="text-xs text-muted-foreground">{project.status}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary-accent">
                      Project {String(projects.indexOf(project) + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
                      {project.name}
                    </h3>
                  </div>
                  <span className="hidden rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                    CASE STUDY
                  </span>
                </div>
                <p className="mt-2 text-lg font-medium text-accent">{project.tagline}</p>

                <p className="mt-5 text-base leading-7 text-muted-foreground">{project.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-border bg-background/30 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Problem</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.problem}</p>
                  </div>
                  <div className="rounded-[1.2rem] border border-border bg-background/30 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Solution</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.solution}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={`${project.id}-${technology}`}
                      className="rounded-full border border-border bg-background/30 px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                  {project.features.map((feature) => (
                    <li key={`${project.id}-${feature}`} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-3.5 py-2 text-sm font-medium text-foreground transition hover:border-accent/50 hover:text-accent"
                    >
                      <Code2 size={15} />
                      GitHub
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-3.5 py-2 text-sm font-medium text-muted-foreground">
                      <Code2 size={15} />
                      Private repo
                    </span>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-2 text-sm font-medium text-foreground transition hover:border-accent/60 hover:bg-accent/15"
                    >
                      Live Demo
                      <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-3.5 py-2 text-sm font-medium text-muted-foreground">
                      Demo pending
                    </span>
                  )}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.45rem] border border-border bg-background/30 p-3">
                <div className="mb-3 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>Preview gallery</span>
                  <span>{project.isPublic ? "Public" : "Private"}</span>
                </div>
                <div className="grid gap-3">
                  {project.gallery.map((image, index) => (
                    <Image
                      key={`${project.id}-${image}`}
                      src={image}
                      alt={`${project.name} project screenshot ${index + 1}`}
                      width={1200}
                      height={720}
                      className="project-image h-[290px] w-full rounded-[1rem] border border-border object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
