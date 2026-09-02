"use client";

import Link from "next/link";
import { ArrowDown, BriefcaseBusiness, Code2, Download } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";

import { profile } from "@/data/profile";

const rotatingWords = [
  "I build web experiences.",
  "I solve problems with Python.",
  "I turn ideas into projects.",
  "I learn. I build. I improve.",
];

export function Hero() {
  const [activeWord, setActiveWord] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveWord((current) => (current + 1) % rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="hero-stage relative isolate scroll-mt-28 overflow-hidden"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
          y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary-accent/10 blur-3xl" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-36">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-sm">
            Available for internship & project opportunities
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl lg:text-7xl">
            {profile.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:text-base">
            <span className="rounded-full border border-border bg-card/50 px-3 py-1.5">
              {profile.title}
            </span>
            <span className="rounded-full border border-border bg-card/50 px-3 py-1.5">
              {profile.tagline}
            </span>
          </div>

          <div className="mt-7 min-h-[4.5rem]">
            <p className="text-xl font-medium text-foreground sm:text-2xl lg:text-3xl">
              <span className="text-muted-foreground">{activeWord ? "" : ""}</span>
              <span className="inline-block min-h-[2.5rem] text-accent">
                {rotatingWords[activeWord]}
              </span>
            </p>
          </div>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            I&apos;m a final-year AI & Data Science student interested in Full Stack Development,
            Data Analytics, and UI/UX. I enjoy turning ideas into practical projects and
            building experiences that solve real problems.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(124,106,240,0.35)] transition hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View My Work
            </a>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Jeevan's GitHub profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Code2 size={18} />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Jeevan's LinkedIn profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <BriefcaseBusiness size={18} />
            </a>
            <Link
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {profile.email}
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div
            className="hero-visual-frame relative w-full max-w-md rounded-[2rem] border border-border bg-card/50 p-4 shadow-[var(--shadow)] backdrop-blur-md"
            style={{ "--pointer-x": `${pointer.x}deg`, "--pointer-y": `${pointer.y}deg` } as CSSProperties}
          >
            <div className="absolute -inset-4 rounded-[2.2rem] border border-accent/20 bg-accent/5 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-background/60 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Portfolio
                </span>
              </div>

              <div className="hero-visual-core relative flex min-h-[430px] items-end justify-center overflow-hidden rounded-[1.2rem] border border-border bg-[radial-gradient(circle_at_top,rgba(124,106,240,0.22),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.3),rgba(15,23,42,0.9))] p-4">
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

                <div className="relative z-10 flex h-60 w-48 items-end justify-center rounded-t-[7rem] border border-accent/20 bg-gradient-to-b from-accent/10 via-card/30 to-transparent shadow-[0_0_40px_rgba(124,106,240,0.18)]">
                  <div className="absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border border-accent/25 bg-gradient-to-b from-accent/15 to-transparent" />
                  <div className="absolute -top-6 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border border-border bg-[linear-gradient(180deg,#dfe9ff,#a6b7d7)] shadow-inner" />
                  <div className="absolute -bottom-4 left-1/2 h-16 w-40 -translate-x-1/2 rounded-full bg-accent/15 blur-xl" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="text-[10px] uppercase tracking-[0.18em]">Focus</div>
                  <div className="mt-2 font-medium text-foreground">Full Stack</div>
                </div>
                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="text-[10px] uppercase tracking-[0.18em]">Mindset</div>
                  <div className="mt-2 font-medium text-foreground">Build</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-10">
        <a
          href="#about"
          aria-label="Scroll to the next section"
          className="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>Scroll</span>
          <ArrowDown className="animate-bounce" size={18} />
        </a>
      </div>
    </section>
  );
}
