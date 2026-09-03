"use client";

import Link from "next/link";
import { Check, Code2, Copy, Link2, Mail, MoveUpRight } from "lucide-react";
import { useState } from "react";

import { profile } from "@/data/profile";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export function Footer() {
  const [isCopied, setIsCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  };

  return (
    <footer className="site-footer">
      <div className="footer-word" aria-hidden="true">JEEVAN K</div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="footer-intro reveal-on-view">
          <p className="section-kicker">Open to meaningful work</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl">
            Let&apos;s build something <span className="text-accent">meaningful.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Building today, learning for tomorrow, and creating thoughtful digital experiences along the way.
          </p>
          <a href={`mailto:${profile.email}`} className="cta-button group mt-8 inline-flex">
            Start a conversation
            <MoveUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div className="reveal-on-view">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold tracking-[-0.02em] text-foreground">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">{profile.title}</p>
          </div>

          <div className="reveal-on-view">
            <p className="footer-label">Explore</p>
            <nav className="mt-4 grid gap-3 text-sm" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  {link.label}
                  <MoveUpRight size={13} />
                </Link>
              ))}
            </nav>
          </div>

          <div className="reveal-on-view">
            <p className="footer-label">Connect</p>
            <div className="mt-4 grid gap-3 text-sm">
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="footer-link"><Code2 size={15} /> GitHub</a>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="footer-link"><Link2 size={15} /> LinkedIn</a>
              <a href={`mailto:${profile.email}`} className="footer-link"><Mail size={15} /> Email</a>
              <button type="button" onClick={copyEmail} className="footer-link w-fit">
                {isCopied ? <Check size={15} /> : <Copy size={15} />}
                {isCopied ? "Copied!" : "Copy email"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {profile.name}. Built with curiosity.</p>
          <p className="font-mono uppercase tracking-[0.18em]">Learn · Build · Improve</p>
        </div>
      </div>
    </footer>
  );
}
