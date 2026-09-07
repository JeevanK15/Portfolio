import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jeevan K | AI & Data Science Student · Aspiring Full Stack Developer",
  description:
    "Portfolio of Jeevan K, a final-year B.Tech AI & Data Science student focused on full stack development, data analytics, and building thoughtful digital experiences.",
  keywords: [
    "Jeevan K",
    "Aspiring Full Stack Developer",
    "AI Data Science",
    "Portfolio",
    "Python",
    "Web Development",
  ],
  openGraph: {
    title: "Jeevan K | AI & Data Science Student · Aspiring Full Stack Developer",
    description:
      "Student developer building real-world web projects, data solutions, and polished full stack experiences.",
    type: "website",
    siteName: "Jeevan K Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeevan K | AI & Data Science Student · Aspiring Full Stack Developer",
    description:
      "Portfolio of Jeevan K, a final-year AI & Data Science student building with Python, web technologies, and analytics.",
  },
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
