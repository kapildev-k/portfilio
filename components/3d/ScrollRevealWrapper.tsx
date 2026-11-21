'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

/**
 * Wraps heavy 3D canvases to only mount and render when in or near the browser viewport.
 * Saves GPU and CPU overhead when scrolled away.
 */
export default function ScrollRevealWrapper({
  children,
  fallback,
  className = ''
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      setHasBeenInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenInView(true);
        }
      },
      {
        rootMargin: '180px 0px 180px 0px', // Preload slightly before scrolling into view
        threshold: 0.05
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {hasBeenInView ? children : fallback || <div className="min-h-[300px] w-full animate-pulse rounded-2xl bg-card/40" />}
    </div>
  );
}
