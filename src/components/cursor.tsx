"use client";

import { useEffect, useState } from "react";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const move = (event: PointerEvent) => { setVisible(true); setPosition({ x: event.clientX, y: event.clientY }); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  if (!visible) return null;
  return <><span className="cursor-dot" style={{ left: position.x, top: position.y }} aria-hidden="true" /><span className="cursor-ring" style={{ left: position.x, top: position.y }} aria-hidden="true" /></>;
}
