'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface ProjectCard3DProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProjectCard3D({ children, className = '' }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse position normalized relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  // Glare / Sheen gradient position
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative transition-transform duration-200"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative transition-shadow duration-300 ${
          isHovered ? 'shadow-[0_24px_60px_-15px_rgba(56,189,248,0.18)]' : ''
        } ${className}`}
      >
        {/* Dynamic Specular Sheen Follower */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-60 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 360px at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, 0.12), transparent 75%)`,
            }}
          />
        )}

        {/* Card Content with subtle depth */}
        <div style={{ transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)', transition: 'transform 0.25s ease-out' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
