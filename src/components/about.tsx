import { profile } from "@/data/profile";
import { education } from "@/data/education";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="section-kicker mb-4">01 / About · The person behind the projects</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Building thoughtful digital experiences with a developer mindset.
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm sm:p-8">
          <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              I&apos;m a final-year B.Tech Artificial Intelligence and Data Science student focused on
              Full Stack Development, while also staying curious about Data Analytics and UI/UX
              Design.
            </p>
            <p>
              I enjoy turning ideas into practical projects, learning by building, and continuously
              improving through each iteration. I like working on problems that combine technical
              thinking, user experience, and measurable outcomes.
            </p>
            <p>
              I&apos;m a fast learner who prefers learning in action, which has helped me grow through
              projects, internships, and hands-on experimentation. Long-term, I hope to build
              something of my own and grow toward creating a meaningful technology venture.
            </p>
          </div>
        </div>

        <aside className="about-status-panel rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm sm:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-border pb-5">
            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-accent">
              <span className="status-pulse h-2 w-2 rounded-full bg-secondary-accent" />
              Digital status
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">01 / BUILDER</span>
          </div>
          <div className="mb-7 grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/30 p-3 text-xs">
            <span className="text-muted-foreground">{profile.name.toUpperCase()}</span>
            <span className="text-right text-muted-foreground">{education.startYear} — {education.endYear}</span>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Currently
              </p>
              <p className="mt-2 text-lg font-medium text-foreground">{profile.currentStatus}</p>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Focus
              </p>
              <p className="mt-2 text-lg font-medium text-foreground">{profile.focus}</p>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Mindset
              </p>
              <p className="mt-2 text-lg font-medium text-foreground">{profile.mindset}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
