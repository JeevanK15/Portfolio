"use client";

import { Binary, Code2, Cpu, Database, FolderKanban, Gauge, Keyboard, Laptop, MousePointer2, Power, RotateCcw, Sparkles, Terminal } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { projects } from "@/data/projects";

type AppKey = "terminal" | "code" | "projects" | "data" | "system";
const apps: { id: AppKey; label: string; icon: typeof Terminal }[] = [
  { id: "terminal", label: "Terminal", icon: Terminal },
  { id: "code", label: "Code", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "data", label: "Data", icon: Database },
  { id: "system", label: "System", icon: Cpu },
];
const technologies = ["Python", "JavaScript", "React", "Next.js", "Flask", "SQLAlchemy", "HTML", "CSS", "Git", "Figma"];

function VesperTerminal() {
  const lines = ["$ whoami", "jeevan", "$ current_mode", "building", "$ focus", "full-stack + ai + data", "$ vesper", "online / listening"];
  return <div className="vesper-terminal-content">{lines.map((line, index) => <p key={`${line}-${index}`} className={line.startsWith("$") ? "vesper-terminal-prompt" : "vesper-terminal-output"}>{line}</p>)}<p className="vesper-terminal-prompt">$ <i className="vesper-caret" aria-hidden="true" /></p></div>;
}

function VesperCode() {
  return <pre className="vesper-code" aria-label="Decorative Vesper interface code"><code><span className="vesper-code-comment"># build with intent</span>{"\n"}<span className="vesper-code-keyword">const</span> <span className="vesper-code-name">vesper</span> = {"{"}{"\n"}{"  "}<span className="vesper-code-key">mode</span>: <span className="vesper-code-string">&quot;curious&quot;</span>,{"\n"}{"  "}<span className="vesper-code-key">tools</span>: [<span className="vesper-code-string">&quot;code&quot;</span>, <span className="vesper-code-string">&quot;data&quot;</span>],{"\n"}{"  "}<span className="vesper-code-key">ship</span>: <span className="vesper-code-function">() =&gt; learn</span>,{"\n"}{"  "}<span className="vesper-code-key">status</span>: <span className="vesper-code-string">&quot;in progress&quot;</span>{"\n"}{"}"};</code></pre>;
}

function VesperProjects() {
  return <div className="vesper-project-list">{projects.map((project) => {
    const content = <><span className="vesper-project-number">/{project.id}</span><strong>{project.name}</strong><span>{project.tagline}</span><span className="vesper-project-arrow" aria-hidden="true">{project.githubUrl ? "↗" : "—"}</span></>;
    return project.githubUrl
      ? <a key={project.id} href={project.githubUrl} target="_blank" rel="noreferrer" className="vesper-project-item">{content}</a>
      : <div key={project.id} className="vesper-project-item vesper-project-item-static" aria-label={`${project.name} is not publicly linked`}>{content}</div>;
  })}</div>;
}

function VesperData() {
  const bars = [34, 56, 42, 68, 51, 78, 63, 88, 72, 94, 76, 84];
  return <div className="vesper-data-content"><div className="vesper-data-heading"><span>signal / atmosphere</span><strong>VISUAL ONLY</strong></div><div className="vesper-bars" aria-label="Abstract data visualization">{bars.map((height, index) => <i key={`${height}-${index}`} style={{ "--bar-height": `${height}%` } as CSSProperties} />)}</div><div className="vesper-data-foot"><span>curiosity</span><span>iteration</span><span>clarity</span></div></div>;
}

function VesperSystem() {
  return <div className="vesper-system-content"><div className="vesper-system-status"><span className="vesper-status-dot" /> SYSTEM ONLINE <span>VESPER / 01</span></div><div className="vesper-tech-grid">{technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="vesper-system-note"><Binary size={14} /> No fake percentages. Just tools in motion.</div></div>;
}

function VesperScreen({ activeApp }: { activeApp: AppKey }) {
  return <div className="vesper-screen-content"><div className="vesper-os-bar"><span className="vesper-os-brand"><span className="vesper-os-mark">V</span> VESPER OS</span><span className="vesper-os-clock">21:47 / SYSTEM READY</span></div><div className="vesper-os-body"><aside className="vesper-app-rail" aria-label="Vesper applications">{apps.map(({ id, label, icon: Icon }) => <span key={id} className={`vesper-app-icon ${activeApp === id ? "is-active" : ""}`} title={label}><Icon size={14} /></span>)}</aside><div id="vesper-panel" className="vesper-window" role="tabpanel" aria-labelledby={`vesper-tab-${activeApp}`}><div className="vesper-window-header"><span>{activeApp.toUpperCase()} / VESPER WORKSPACE</span><span className="vesper-window-live"><span /> live</span></div>{activeApp === "terminal" && <VesperTerminal />}{activeApp === "code" && <VesperCode />}{activeApp === "projects" && <VesperProjects />}{activeApp === "data" && <VesperData />}{activeApp === "system" && <VesperSystem />}</div></div></div>;
}
export function Vesper() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeApp, setActiveApp] = useState<AppKey>("terminal");
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isAwake, setIsAwake] = useState(false);
  const [secretRevealed, setSecretRevealed] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateScene = () => {
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, -bounds.top / travel));
      setProgress(nextProgress);
      setIsAwake(nextProgress > 0.16);
    };

    updateScene();
    window.addEventListener("scroll", updateScene, { passive: true });
    window.addEventListener("resize", updateScene);
    return () => {
      window.removeEventListener("scroll", updateScene);
      window.removeEventListener("resize", updateScene);
    };
  }, []);

  const stage = progress < 0.2 ? "ENTRY" : progress < 0.42 ? "APPROACH" : progress < 0.68 ? "AWAKEN" : progress < 0.9 ? "EXPLORE" : "EXIT";
  const sceneStyle = {
    "--vesper-progress": progress,
    "--scene-x": `${pointer.x * 2.8}deg`,
    "--scene-y": `${pointer.y * -2.2}deg`,
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    });
  };

  const handleLogoClick = () => {
    const nextClicks = logoClicks + 1;
    setLogoClicks(nextClicks);
    if (nextClicks >= 3) setSecretRevealed(true);
  };

  return (
    <section ref={sectionRef} id="vesper" className="vesper-section" style={sceneStyle} onPointerMove={handlePointerMove} onPointerLeave={() => setPointer({ x: 0, y: 0 })}>
      <div className="vesper-sticky-stage">
        <div className="vesper-atmosphere" aria-hidden="true"><span /><span /><span /></div>
        <div className="vesper-intro-copy">
          <span className="technical-label">02 / signature experience</span>
          <p className="vesper-stage-label">{stage} <span>/{String(Math.round(progress * 100)).padStart(2, "0")}</span></p>
          <h2>Vesper<span>.</span></h2>
          <p className="vesper-intro-description">A small digital universe where ideas become real.</p>
        </div>

        <div className={`vesper-scene ${isAwake ? "is-awake" : ""}`}>
          <div className="vesper-desk-light" aria-hidden="true" />
          <div className="vesper-laptop-wrap">
            <div className="vesper-laptop" onMouseEnter={() => setIsAwake(true)}>
              <div className="vesper-display-lid">
                <div className="vesper-screen-glass">
                  <div className="vesper-boot-screen"><span>VESPER</span><small>DIGITAL WORKSPACE / SYSTEM READY</small></div>
                  <VesperScreen activeApp={activeApp} />
                </div>
              </div>
              <div className="vesper-base"><div className="vesper-keyboard"><Keyboard size={18} /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="vesper-trackpad" /></div>
            </div>
          </div>
          <div className="vesper-desk-object vesper-notebook" aria-hidden="true"><span>field notes</span><i /></div>
          <div className="vesper-desk-object vesper-mouse" aria-hidden="true"><MousePointer2 size={15} /></div>
          <div className="vesper-desk-line" aria-hidden="true" />
        </div>

        <div className="vesper-control-panel">
          <div className="vesper-control-topline"><span><span className="vesper-status-dot" /> VESPER ONLINE</span><span>ASUS TUF A15 / PERSONAL WORKSTATION</span></div>
          <div className="vesper-app-controls" role="tablist" aria-label="Explore Vesper OS">
            {apps.map(({ id, label, icon: Icon }) => (
              <button key={id} id={`vesper-tab-${id}`} type="button" role="tab" aria-controls="vesper-panel" aria-selected={activeApp === id} tabIndex={activeApp === id ? 0 : -1} className={activeApp === id ? "is-active" : ""} onClick={() => { setActiveApp(id); setIsAwake(true); }}>
                <Icon size={15} /> <span>{label}</span>
              </button>
            ))}
            <button type="button" className="vesper-reset-button" onClick={() => { setActiveApp("terminal"); setSecretRevealed(false); setLogoClicks(0); }} aria-label="Reset Vesper workspace"><RotateCcw size={14} /></button>
          </div>
          <p className="vesper-control-caption"><Gauge size={13} /> Move through the workspace. The screen follows your curiosity.</p>
        </div>

        <button type="button" className="vesper-logo-trigger" onClick={handleLogoClick} aria-label="Vesper system logo">
          <Power size={13} /> VESPER / {secretRevealed ? "BUILT BY JEEVAN K" : "01"}
        </button>
        {secretRevealed && <div className="vesper-secret"><Sparkles size={14} /> AI &amp; Data Science / building the future, one project at a time.</div>}
        <div className="vesper-accessible-note"><Laptop size={14} /><span>Vesper is a fictional digital workstation representing the tools, projects, and learning behind this portfolio.</span></div>
      </div>
    </section>
  );
}
