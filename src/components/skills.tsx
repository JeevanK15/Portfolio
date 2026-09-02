import { skillGroups } from "@/data/skills";

const strongestSkills = new Set(["Python", "HTML", "CSS", "Figma"]);

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          02 / Skills · Tools I build with
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Practical skills built through problem solving and hands-on learning.
        </h2>
      </div>

      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.title} className="skill-group rounded-[1.5rem] border border-border bg-card/60 p-5 shadow-[var(--shadow)] backdrop-blur-sm sm:p-6">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-3">
              {group.items.map((item) => {
                const isStrong = strongestSkills.has(item);

                return (
                  <span
                    key={item}
                    className={[
                      "skill-chip rounded-full border px-3 py-2 text-sm font-medium transition duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:text-foreground",
                      isStrong
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border bg-background/30 text-muted-foreground",
                    ].join(" ")}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
