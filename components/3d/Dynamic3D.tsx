'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Skeletons
const CanvasLoadingSkeleton = () => (
  <div className="flex h-[320px] w-full items-center justify-center rounded-2xl border border-border bg-[#070d18] p-6 text-slate-500">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
        Initializing 3D Interactive Topology...
      </span>
    </div>
  </div>
);

// Dynamic 3D Scene Components with SSR disabled
export const DynamicHero3DScene = dynamic(
  () => import('./Hero3DScene'),
  {
    ssr: false,
    loading: () => <div className="pointer-events-none absolute inset-0 -z-10" />
  }
);

export const DynamicAttackPath3D = dynamic(
  () => import('./AttackPath3D'),
  {
    ssr: false,
    loading: () => <CanvasLoadingSkeleton />
  }
);

export const DynamicEndpointFleet3D = dynamic(
  () => import('./EndpointFleet3D'),
  {
    ssr: false,
    loading: () => <CanvasLoadingSkeleton />
  }
);

export const DynamicJedaiMonitoring3D = dynamic(
  () => import('./JedaiMonitoring3D'),
  {
    ssr: false,
    loading: () => <CanvasLoadingSkeleton />
  }
);

export const DynamicSkillsConstellation3D = dynamic(
  () => import('./SkillsConstellation3D'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] w-full animate-pulse rounded-2xl border border-border bg-[#070d18]" />
    )
  }
);
