import { profile } from "@/data/profile";
import { ProfilePortrait } from "@/components/profile-portrait";
import { TiltCard } from "@/components/interactive";

const identityFragments = [
  "BUILDER",
  "LEARNER",
  "DESIGNER",
  "PROBLEM SOLVER",
  "EXPERIMENTER",
];

export function About() {
  return (
    <section id="about" className="section-wrap">
      <div className="section-head">
        <span className="section-index">01</span>
        <div>
          <h2>The person behind the system.</h2>
          <p>About / a builder in progress</p>
          <div className="hairline mt-6" />
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div className="about-visual">
          <TiltCard className="about-visual-card" intensity={10}>
            <ProfilePortrait />
          </TiltCard>
        </div>

        <div>
          <div className="mb-8 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            {identityFragments.map((fragment) => (
              <span key={fragment} className="border border-border px-2.5 py-1.5">
                {fragment}
              </span>
            ))}
          </div>

          <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground sm:text-3xl">
            Jeevan is a B.Tech Artificial Intelligence &amp; Data Science student focused on Full Stack Development.
          </p>

          <p className="mt-7 max-w-xl leading-8 text-muted">
            He learns by building practical products and experiments across software development, data, and user experience — turning ideas into working digital systems instead of polishing only the concept.
          </p>

          <p className="mt-5 max-w-xl leading-8 text-muted">
            The goal is simple: build thoughtfully, iterate quickly, and grow through each project into a more capable engineer and product thinker.
          </p>

          <dl className="data-list mt-10">
            <div className="data-row"><dt>Currently</dt><dd>{profile.currentStatus}</dd></div>
            <div className="data-row"><dt>Focus</dt><dd>{profile.focus}</dd></div>
            <div className="data-row"><dt>Mindset</dt><dd>{profile.mindset}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
