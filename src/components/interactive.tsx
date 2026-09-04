"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useState } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
};

export function TiltCard({ children, className = "", intensity = 10, style }: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, pointerX: 50, pointerY: 50 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * intensity * 2;
    const rotateX = (0.5 - y) * intensity * 2;

    setTilt({
      x: rotateX,
      y: rotateY,
      pointerX: x * 100,
      pointerY: y * 100,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0, pointerX: 50, pointerY: 50 });
  };

  return (
    <div
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        "--tilt-x": `${tilt.x}deg`,
        "--tilt-y": `${tilt.y}deg`,
        "--pointer-x": `${tilt.pointerX}%`,
        "--pointer-y": `${tilt.pointerY}%`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className = "",
  href,
  target,
  rel,
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0, pointerX: 50, pointerY: 50 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;

    setOffset({
      x: x * 0.18,
      y: y * 0.18,
      pointerX,
      pointerY,
    });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0, pointerX: 50, pointerY: 50 });
  };

  const commonProps = {
    className: `magnetic ${className}`.trim(),
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    style: {
      "--mx": `${offset.x}px`,
      "--my": `${offset.y}px`,
      "--glow-x": `${offset.pointerX}%`,
      "--glow-y": `${offset.pointerY}%`,
    } as CSSProperties,
    onClick,
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} {...commonProps}>
      {children}
    </button>
  );
}
