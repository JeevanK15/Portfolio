"use client";

import Image from "next/image";
import { useState } from "react";

export function ProfilePortrait({ src = "/images/profile/jeevan.jpg" }: { src?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className="portrait-frame" aria-label="Jeevan K professional portrait">{src && !failed ? <a href={src} target="_blank" rel="noreferrer" className="portrait-image-link" aria-label="Open Jeevan K portrait in a new tab"><Image src={src} alt="Jeevan K" fill sizes="(max-width: 800px) 100vw, 35vw" className="object-cover object-[50%_35%]" onError={() => setFailed(true)} /></a> : <div className="portrait-fallback"><span>JEEVAN K / PROFILE</span></div>}<span className="absolute bottom-5 left-5 z-10 technical-label">JEEVAN K · PROFILE</span></div>;
}
