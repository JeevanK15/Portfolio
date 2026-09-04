"use client";

import { Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { MagneticButton, TiltCard } from "@/components/interactive";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <section id="contact" className="section-wrap"><div className="section-head"><span className="section-index">10</span><div><h2>Start with a good question.</h2><p>Contact / let&apos;s build something meaningful</p><div className="hairline mt-6" /></div></div><div className="contact-layout"><TiltCard className="glass mx-auto w-full max-w-4xl p-6 sm:p-8 lg:col-span-2" intensity={8}><span className="technical-label">Contact details</span><h3 className="mt-3 text-2xl font-semibold tracking-[-.04em]">Let&apos;s start a conversation.</h3><p className="mt-4 max-w-lg leading-7 text-muted">Email is the best way to reach me. I&apos;ll get back to you as soon as I can.</p><MagneticButton href={`mailto:${profile.email}`} className="cta-button mt-8"><Mail size={15} /> Email Jeevan</MagneticButton><div className="mt-7 grid gap-4 border-y border-border py-5 text-sm text-muted sm:grid-cols-2"><a className="inline-flex items-center gap-3 break-words hover:text-foreground" href={`mailto:${profile.email}`}><Mail size={15} />{profile.email}</a><a className="inline-flex items-center gap-3 hover:text-foreground" href={`tel:${profile.phone}`}><Phone size={15} />{profile.phone}</a><span className="inline-flex items-center gap-3"><MapPin size={15} />{profile.location}</span><button type="button" onClick={copyEmail} className="inline-flex w-fit items-center gap-3 hover:text-foreground">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Email copied" : "Copy email"}</button></div></TiltCard></div></section>;
}
