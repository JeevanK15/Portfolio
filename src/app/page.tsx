import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { AskJeevan } from "@/components/ask-jeevan";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { GitHubSection } from "@/components/github";
import { Hero } from "@/components/hero";
import { Leadership } from "@/components/leadership";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Preloader } from "@/components/preloader";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { Skills } from "@/components/skills";
import { Vesper } from "@/components/vesper";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main id="top">
        <Hero />
        <Reveal><About /></Reveal>
        <Reveal><Vesper /></Reveal>
        <Reveal><Skills /></Reveal>
        <Reveal><Experience /></Reveal>
        <Reveal><Projects /></Reveal>
        <Reveal><Education /></Reveal>
        <Reveal><Certifications /></Reveal>
        <Reveal><Achievements /></Reveal>
        <Reveal><Leadership /></Reveal>
        <Reveal><GitHubSection /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <AskJeevan />
      <Footer />
    </>
  );
}
