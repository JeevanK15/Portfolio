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
	{ label: "Education", href: "#education" },
	{ label: "Contact", href: "#contact" },
];

export function Footer() {
	const [copied, setCopied] = useState(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	}

	return (
		<footer className="site-footer">
			<div className="footer-word" aria-hidden="true">JEEVAN K</div>
			<div className="section-wrap relative">
				<div className="footer-intro">
					<p className="technical-label">Open to meaningful work</p>
					<h2 className="mt-5 max-w-4xl text-5xl font-semibold leading-[.88] tracking-[-.08em] sm:text-8xl">
						LET&apos;S BUILD<br /><span className="text-accent">SOMETHING MEANINGFUL.</span>
					</h2>
					<p className="mt-7 max-w-xl leading-7 text-muted">Building today, learning for tomorrow, and creating thoughtful digital experiences along the way.</p>
					<p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-muted/80">Powered by Vesper — my everyday build companion.</p>
					<a href={`mailto:${profile.email}`} className="cta-button mt-8">Start a conversation <MoveUpRight size={15} /></a>
				</div>

				<div className="footer-directory">
					<div className="footer-identity">
						<p className="footer-heading">{profile.name}</p>
						<p className="mt-2 text-sm text-muted">{profile.tagline}</p>
						<p className="footer-location">{profile.location}</p>
					</div>
					<nav className="footer-column" aria-label="Footer navigation">
						<p className="footer-heading">Explore</p>
						{footerLinks.map((link) => <Link className="footer-link" href={link.href} key={link.label}>{link.label} <MoveUpRight size={13} /></Link>)}
					</nav>
					<div className="footer-column">
						<p className="footer-heading">Connect</p>
						<a className="footer-link" href={profile.githubUrl} target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub</a>
						<a className="footer-link" href={profile.linkedinUrl} target="_blank" rel="noreferrer"><Link2 size={15} /> LinkedIn</a>
						<a className="footer-link" href={`mailto:${profile.email}`}><Mail size={15} /> Email</a>
						<button className="footer-link footer-copy-button" type="button" onClick={copyEmail}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy email"}</button>
					</div>
				</div>

				<div className="footer-bottom">
					<p>© 2026 {profile.name}. Built with curiosity.</p>
					<a href="#top" className="footer-back-to-top">Back to top <MoveUpRight size={13} /></a>
				</div>
			</div>
		</footer>
	);
}
