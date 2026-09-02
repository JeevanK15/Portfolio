"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Link2, Menu, Moon, Sun, X } from "lucide-react";

import { profile, socialLinks } from "@/data/profile";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = window.localStorage.getItem("theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : preferredDark
        ? "dark"
        : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="icon-button"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-22% 0px -62%", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 ease-out sm:px-6 sm:pt-5",
        isScrolled
          ? "navbar-shell navbar-shell-scrolled"
          : "navbar-shell",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-3 py-2.5 sm:px-4" aria-label="Main navigation">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="monogram-mark">JK</span>
          <span className="hidden text-sm font-semibold tracking-[-0.02em] sm:inline">Jeevan K</span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-link ${activeSection === item.href.slice(1) ? "nav-link-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />

          {socialLinks
            .filter((item) => item.label !== "Email")
            .map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={item.ariaLabel}
                className="icon-button"
              >
                {item.label === "GitHub" ? <Code2 size={16} /> : <Link2 size={16} />}
              </Link>
            ))}

          <Link
            href={`mailto:${profile.email}`}
            className="cta-button"
          >
            Let&apos;s Talk
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="icon-button h-10 w-10"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={[
          "mobile-navigation lg:hidden",
          isMenuOpen ? "mobile-navigation-open" : "mobile-navigation-closed",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-3 pb-4 pt-2 sm:px-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className={`mobile-nav-link ${activeSection === item.href.slice(1) ? "mobile-nav-link-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
            {socialLinks
              .filter((item) => item.label !== "Email")
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={item.ariaLabel}
                  onClick={closeMenu}
                  className="mobile-social-link"
                >
                  {item.label === "GitHub" ? <Code2 size={15} /> : <Link2 size={15} />}
                </Link>
              ))}

            <Link
              href={`mailto:${profile.email}`}
              onClick={closeMenu}
              className="cta-button ml-auto"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
