"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { useState, type CSSProperties, type PointerEvent } from "react";

import { profile } from "@/data/profile";

export function Hero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <section
      id="top"
      className="hero-stage relative isolate overflow-hidden"
      onPointerMove={(event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
          y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="hero-grid">
        <div>
          <p className="technical-label animate-pulse">AVAILABLE FOR INTERNSHIPS &amp; PROJECT OPPORTUNITIES</p>
          <h1 className="hero-title">Jeevan <span className="text-accent">K</span></h1>
          <p className="hero-role">{profile.title}<br /><span className="text-foreground">{profile.tagline}</span></p>
          <p className="hero-copy">I build ideas into practical digital experiences, combining code, data, and a considered eye for the people using them.</p>
          <div className="hero-actions">
            <a href="#projects" className="cta-button magnetic">Explore the work <ArrowUpRight size={15} /></a>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="magnetic inline-flex items-center gap-2 border border-border px-4 py-3 text-sm text-foreground"><Download size={15} /> Resume</a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-xs text-muted">
            <span className="h-px w-10 bg-secondary-accent" /> Salem, Tamil Nadu · 2023—2027
          </div>
        </div>
        <div
          className="hero-core"
          aria-label="Interactive digital core representing Jeevan's creative development system"
          role="img"
          style={{ "--core-rotate-x": `${pointer.y * -3}deg`, "--core-rotate-y": `${pointer.x * 4}deg` } as CSSProperties}
        >
          <div className="core-glow" /><div className="core-plane" /><div className="core-plane" /><div className="core-plane" /><div className="core-orbit" />
          <div className="core-center"><span>BUILD</span></div>
          <span className="core-label one">SYSTEM / 01<br />FULL STACK</span>
          <span className="core-label two">PYTHON<br />DATA</span>
          <span className="core-label three">UI / UX</span>
        </div>
      </div>
      <a href="#about" className="scroll-cue inline-flex items-center gap-3" aria-label="Scroll to About"><span className="h-8 w-px bg-secondary-accent" /> Scroll to enter</a>
    </section>
  );
}
