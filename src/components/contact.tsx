"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

import { profile } from "@/data/profile";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="section-kicker mb-4">10 / Contact · Let&apos;s connect</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Let&apos;s connect for projects, internships, and collaborative opportunities.
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.8rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm sm:p-8">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/40 text-accent">
                <Mail size={17} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                <a href={`mailto:${profile.email}`} className="mt-2 block text-base font-medium text-foreground hover:text-accent">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/40 text-accent">
                <Phone size={17} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
                <a href={`tel:${profile.phone}`} className="mt-2 block text-base font-medium text-foreground hover:text-accent">
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/40 text-accent">
                <MapPin size={17} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                <p className="mt-2 text-base font-medium text-foreground">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[1.8rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm text-muted-foreground">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</span>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background/30 px-3.5 py-3 text-foreground outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-ring/40"
              />
            </label>

            <label className="block text-sm text-muted-foreground">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background/30 px-3.5 py-3 text-foreground outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-ring/40"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm text-muted-foreground">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Message</span>
            <textarea
              rows={6}
              placeholder="Tell me about your project or opportunity..."
              className="w-full rounded-xl border border-border bg-background/30 px-3.5 py-3 text-foreground outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-ring/40"
            />
          </label>

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(124,106,240,0.35)] transition hover:-translate-y-0.5 hover:bg-accent-strong"
            >
              <Send size={16} />
              Send Message
            </button>

            {submitted && (
              <p className="text-sm font-medium text-secondary-accent">
                Thanks! Your message is ready to send.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
