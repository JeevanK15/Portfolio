import type { Profile, SocialLink } from "@/types";

export const profile: Profile = {
  name: "Jeevan K",
  title: "AI & Data Science Student",
  tagline: "Aspiring Full Stack Developer",
  intro:
    "I’m a final-year B.Tech Artificial Intelligence and Data Science student who enjoys building practical web experiences, solving real problems, and continuously improving through projects and learning.",
  currentStatus: "Learning • Building • Experimenting",
  focus: "Full Stack Development",
  mindset: "Learn → Build → Improve",
  email: "jeevank1562006@gmail.com",
  phone: "+91 73390 33860",
  location: "Salem, Tamil Nadu, India",
  githubUrl: "https://github.com/jeevank15",
  linkedinUrl: "https://linkedin.com/in/jeevank15",
  instagramUrl: "",
  resumeUrl: "resume.pdf",
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: profile.githubUrl,
    ariaLabel: "Visit Jeevan's GitHub profile",
  },
  {
    label: "LinkedIn",
    href: profile.linkedinUrl,
    ariaLabel: "Visit Jeevan's LinkedIn profile",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    ariaLabel: "Email Jeevan",
  },
];
