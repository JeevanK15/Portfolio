"use client";

import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const form = new FormData(event.currentTarget);
    try { const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) }); if (!response.ok) throw new Error(); setStatus("success"); event.currentTarget.reset(); } catch { setStatus("error"); }
  }
  async function copyEmail() { await navigator.clipboard.writeText(profile.email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  return <section id="contact" className="section-wrap"><div className="section-head"><span className="section-index">10</span><div><h2>Start with a good question.</h2><p>Contact / let&apos;s build something meaningful</p><div className="hairline mt-6" /></div></div><div className="contact-layout"><div><h3 className="contact-title">LET&apos;S BUILD<br /><span className="text-accent">SOMETHING</span><br />MEANINGFUL.</h3><div className="mt-10 grid gap-5 text-sm text-muted"><a className="inline-flex items-center gap-3 hover:text-foreground" href={`mailto:${profile.email}`}><Mail size={15} />{profile.email}</a><a className="inline-flex items-center gap-3 hover:text-foreground" href={`tel:${profile.phone}`}><Phone size={15} />{profile.phone}</a><span className="inline-flex items-center gap-3"><MapPin size={15} />{profile.location}</span><button type="button" onClick={copyEmail} className="inline-flex w-fit items-center gap-3 hover:text-foreground">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Email copied" : "Copy email"}</button></div></div><form onSubmit={submit} className="glass p-6 sm:p-9"><label className="field"><span>Name</span><input name="name" required maxLength={80} autoComplete="name" placeholder="Your name" /></label><label className="field"><span>Email</span><input name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@example.com" /></label><label className="field"><span>Message</span><textarea name="message" required maxLength={4000} rows={6} placeholder="Tell me about your project or opportunity..." /></label><div className="mt-7 flex flex-wrap items-center gap-4"><button disabled={status === "sending"} className="cta-button magnetic disabled:opacity-50" type="submit"><Send size={15} />{status === "sending" ? "Sending..." : "Send message"}</button>{status === "success" && <p role="status" className="text-sm text-secondary-accent">Message sent. I&apos;ll get back to you soon.</p>}{status === "error" && <p role="alert" className="text-sm text-rose-300">Couldn&apos;t send that message. Please try email instead.</p>}</div><p className="mt-6 text-xs text-muted">Prefer email? <a className="text-foreground underline decoration-border underline-offset-4" href={`mailto:${profile.email}`}>Send me a message directly.</a></p></form></div></section>;
}
