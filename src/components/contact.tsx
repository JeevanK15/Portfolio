"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { profile } from "@/data/profile";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Message could not be sent");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-wrap contact-section">
      <div className="section-head"><span className="section-index">10 / CONTACT</span><div><h2>Have a good question?</h2><p>Open channel / let&apos;s make something useful</p><div className="hairline mt-6" /></div></div>
      <div className="contact-layout">
        <div className="contact-intro"><span className="technical-label">Start a conversation</span><h3 className="contact-title mt-5">Let&apos;s build what comes next.</h3><p className="mt-7 max-w-md leading-7 text-muted">I&apos;m interested in thoughtful problems, new perspectives, and work that leaves things better than it found them.</p>
          <div className="contact-links mt-10"><a href={`mailto:${profile.email}`}><Mail size={16} />{profile.email}<ArrowUpRight size={14} /></a><a href={`tel:${profile.phone}`}><Phone size={16} />{profile.phone}<ArrowUpRight size={14} /></a><span><MapPin size={16} />{profile.location}</span><button type="button" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Email copied" : "Copy email"}</button></div>
          <nav className="contact-socials" aria-label="Contact links"><a href={profile.githubUrl} target="_blank" rel="noreferrer"><FaGithub size={16} />GitHub<ArrowUpRight size={14} /></a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><FaLinkedin size={16} />LinkedIn<ArrowUpRight size={14} /></a><a href={profile.resumeUrl} target="_blank" rel="noreferrer"><FileText size={16} />Resume<ArrowUpRight size={14} /></a></nav>
        </div>
        <form className="contact-form" onSubmit={submitMessage}><label className="field"><span>Name</span><input name="name" type="text" placeholder="Your name" required minLength={2} maxLength={80} /></label><label className="field"><span>Email</span><input name="email" type="email" placeholder="you@example.com" required /></label><label className="field"><span>What are you thinking about?</span><textarea name="message" placeholder="Tell me a little about the idea, project, or question." rows={5} required minLength={10} maxLength={4000} /></label><input name="website" tabIndex={-1} autoComplete="off" className="contact-honeypot" aria-hidden="true" /><div className="contact-form-footer"><span className={`contact-status contact-status-${status}`} aria-live="polite">{status === "success" ? "Message sent. I'll be in touch." : status === "error" ? "Something went wrong. Please email me directly." : status === "sending" ? "Sending message..." : ""}</span><div className="contact-actions"><a className="contact-direct-mail" href={`mailto:${profile.email}`}><Mail size={15} />Direct email</a><button className="cta-button" type="submit" disabled={status === "sending"}><Send size={15} />{status === "sending" ? "Sending" : "Send message"}</button></div></div></form>
      </div>
    </section>
  );
}