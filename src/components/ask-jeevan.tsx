"use client";

import { Bot, Send } from "lucide-react";
import { useState } from "react";

import { getAskJeevanAnswer } from "@/lib/ask-jeevan";

export function AskJeevan() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask a question about Jeevan’s portfolio, skills, projects, education, experience, or contact details.");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAnswer(getAskJeevanAnswer(question));
  };

  return (
    <section id="ask-jeevan" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="section-kicker mb-4">11 / Ask Jeevan · Explore the work</p>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Quick answers about his work, profile, and background.
        </h2>
      </div>

      <div className="rounded-[1.8rem] border border-border bg-card/70 p-6 shadow-[var(--shadow)] backdrop-blur-sm sm:p-8">
        <div className="mb-5 flex items-center gap-3 text-muted-foreground">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 text-accent">
            <Bot size={18} />
          </span>
          <p className="text-sm font-medium text-foreground">Portfolio assistant</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm text-muted-foreground">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Question</span>
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Example: What projects has Jeevan worked on?"
              className="w-full rounded-xl border border-border bg-background/30 px-3.5 py-3 text-foreground outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-ring/40"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(124,106,240,0.35)] transition hover:-translate-y-0.5 hover:bg-accent-strong"
          >
            <Send size={16} />
            Ask
          </button>
        </form>

        <div className="mt-8 rounded-[1.25rem] border border-border bg-background/25 p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Answer</p>
          <p className="mt-3 text-base leading-7 text-foreground">{answer}</p>
        </div>
      </div>
    </section>
  );
}
