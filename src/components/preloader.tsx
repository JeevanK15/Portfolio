"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const phase = progress < 34 ? "Mapping ideas" : progress < 68 ? "Building experience" : "Ready to explore";

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (navigationEntry?.type === "reload") {
      const dismissTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(dismissTimer);
    }

    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 1, 100));
    }, 48);
    const timeout = window.setTimeout(() => setVisible(false), reducedMotion ? 0 : 5000);
    document.body.classList.add("preloader-active");

    return () => {
      window.clearTimeout(showTimer);
      window.clearInterval(progressTimer);
      window.clearTimeout(timeout);
      document.body.classList.remove("preloader-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="preloader" role="status" aria-label="Loading Jeevan's portfolio">
      <div className="preloader-grid" aria-hidden="true" />
      <div className="preloader-topline" aria-hidden="true"><span>JK / 001</span><span>Portfolio / 2026</span></div>
      <div className="preloader-watermark" aria-hidden="true">J</div>
      <div className="preloader-center">
        <div className="preloader-mark" aria-hidden="true">
          <span>J</span>
          <i />
        </div>
        <div className="preloader-copy" aria-hidden="true">
          <span className="preloader-kicker">A portfolio by Jeevan K</span>
          <strong><i>Build.</i><i>Learn.</i><i>Create.</i></strong>
          <span className="preloader-caption">AI &amp; Data Science / Full Stack</span>
        </div>
      </div>
      <div className="preloader-status" aria-hidden="true">
        <div className="preloader-status-heading"><span>Opening portfolio</span><strong>{progress}%</strong></div>
        <div className="preloader-steps"><span className={progress >= 1 ? "is-active" : ""}>01 / Ideas</span><span className={progress >= 34 ? "is-active" : ""}>02 / Interface</span><span className={progress >= 68 ? "is-active" : ""}>03 / Experience</span></div>
        <span className="preloader-phase">{phase}</span>
      </div>
      <div className="preloader-meta">
        <span>Available for meaningful work</span>
        <span>Scroll to begin</span>
      </div>
      <div className="preloader-line" aria-hidden="true"><i /></div>
      <div className="preloader-coordinates" aria-hidden="true">11.6643° N / 78.1460° E</div>
    </div>
  );
}
