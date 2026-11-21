'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Eye, Code2, Shield, Layers, ExternalLink, Sparkles } from 'lucide-react';

export interface TechNode {
  id: string;
  name: string;
  category: string;
  angle: number;
  color: string;
  context: string;
  role: string;
  projectAssociation: string;
}

const TECH_NODES: TechNode[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Backend & Security Analytics',
    angle: 0,
    color: '#38bdf8',
    role: 'Primary language for attack path analysis, automation pipelines, and backend APIs.',
    context: 'Graph analysis with Apache AGE, AWS resource inventory collection, and FastAPI microservices.',
    projectAssociation: 'Cloud Attack Path Engine / Private RAG / Retail'
  },
  {
    id: 'go',
    name: 'Go',
    category: 'Systems & Endpoint Agents',
    angle: (1 * Math.PI * 2) / 9,
    color: '#0ea5e9',
    role: 'Cross-platform native endpoint compliance agent engineering.',
    context: 'Lightweight daemon for Windows, Linux, and macOS with GPG verification, tamper protection, and self-update.',
    projectAssociation: 'Nethra Endpoint Compliance'
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud Infrastructure & Security',
    angle: (2 * Math.PI * 2) / 9,
    color: '#f59e0b',
    role: 'Multi-account infrastructure modeling and security perimeter analysis.',
    context: 'VPC, EC2, IAM policies, S3 data vaults, EKS, CloudTrail events, and VPC Flow Logs enrichment.',
    projectAssociation: 'Cloud Attack Path Engine / CNAPP'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Containers & Runtime Isolation',
    angle: (3 * Math.PI * 2) / 9,
    color: '#38bdf8',
    role: 'Containerized workloads and secure non-root logging agents.',
    context: 'Read-only volume mount log collection without Docker socket daemon vulnerability surface.',
    projectAssociation: 'JEDAI Monitoring Module'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'Orchestration & RBAC Security',
    angle: (4 * Math.PI * 2) / 9,
    color: '#818cf8',
    role: 'Container orchestration, RBAC security, and cluster posture auditing.',
    context: 'EKS cluster access analysis, IAM Roles for Service Accounts (IRSA), and namespace boundary analysis.',
    projectAssociation: 'Agentless Kubernetes Security'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Databases & Graph Modelling',
    angle: (5 * Math.PI * 2) / 9,
    color: '#0284c7',
    role: 'Core relational data store, time-partitioned metrics, and graph database.',
    context: 'Relational data modeling, partitioned monitoring store, and Apache AGE multi-stage graph traversal.',
    projectAssociation: 'Cloud Attack Path / Nethra / JEDAI'
  },
  {
    id: 'grafana',
    name: 'Grafana',
    category: 'Observability & Telemetry',
    angle: (6 * Math.PI * 2) / 9,
    color: '#f97316',
    role: 'Operational visibility and real-time security telemetry dashboards.',
    context: 'Custom dashboards for cloud posture, endpoint fleet compliance, and application log metrics.',
    projectAssociation: 'Cloud Attack Path Engine / JEDAI'
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend & UI Engineering',
    angle: (7 * Math.PI * 2) / 9,
    color: '#7dd3fc',
    role: 'Modern user interfaces, Next.js engineering portals, and telemetry dashboards.',
    context: 'Component architecture, responsive state management, and Capacitor cross-platform deployment.',
    projectAssociation: 'Portfolio / Retail Management / RAG UI'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend Architecture & APIs',
    angle: (8 * Math.PI * 2) / 9,
    color: '#10b981',
    role: 'High-throughput asynchronous REST APIs and HTTPS ingestion endpoints.',
    context: 'Asynchronous route handlers, JWT authentication, schema validation, and database connection pooling.',
    projectAssociation: 'Retail Backend / Ingestion API / RAG Service'
  }
];

// 3D Orbital ring with well-spaced technology nodes
function OrbitalTechRing({
  selectedId,
  onSelect
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2.4;

  // Calculate distinct coordinates on an elliptical orbital plane
  const nodesWithPositions = useMemo(() => {
    return TECH_NODES.map((t) => {
      const x = Math.cos(t.angle) * radius;
      const y = Math.sin(t.angle) * (radius * 0.55); // Elliptical for natural perspective
      const z = Math.sin(t.angle) * 0.4;
      return {
        ...t,
        position: [x, y, z] as [number, number, number]
      };
    });
  }, [radius]);

  // Connecting orbital line geometry
  const orbitMesh = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.55, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(64).map((p) => new THREE.Vector3(p.x, p.y, 0));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0.28
    });
    return new THREE.Line(geo, mat);
  }, [radius]);

  // Inter-node network lines
  const networkLines = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < nodesWithPositions.length; i++) {
      const next = nodesWithPositions[(i + 1) % nodesWithPositions.length];
      points.push(...nodesWithPositions[i].position);
      points.push(...next.position);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const mat = new THREE.LineBasicMaterial({
      color: '#0ea5e9',
      transparent: true,
      opacity: 0.2
    });
    return new THREE.LineSegments(geo, mat);
  }, [nodesWithPositions]);

  // Gentle, subtle oscillation without wild label rotation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Orbital Guides */}
      <primitive object={orbitMesh} />
      <primitive object={networkLines} />

      {/* Central Cyber Core Badge */}
      <mesh position={[0, 0, -0.2]}>
        <ringGeometry args={[0.45, 0.52, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.2]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#0c243c" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* 9 Non-overlapping Technology Nodes */}
      {nodesWithPositions.map((node) => {
        const isSelected = selectedId === node.id;
        // Direction from center for collision-free label positioning
        const angle = node.angle;
        const labelOffsetX = Math.cos(angle) * 0.42;
        const labelOffsetY = Math.sin(angle) * 0.38;

        return (
          <group key={node.id} position={node.position}>
            <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
              {/* Clickable 3D Sphere */}
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(node.id);
                }}
              >
                <sphereGeometry args={[isSelected ? 0.24 : 0.18, 20, 20]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 1.4 : 0.6}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>

              {/* Glowing Halo on Selection */}
              {isSelected && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.28, 0.35, 24]} />
                  <meshBasicMaterial
                    color="#38bdf8"
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.85}
                  />
                </mesh>
              )}

              {/* Readable, Non-overlapping HTML Label */}
              <Html
                distanceFactor={11}
                position={[labelOffsetX, labelOffsetY, 0]}
                center
                className="pointer-events-auto cursor-pointer"
              >
                <button
                  type="button"
                  onClick={() => onSelect(node.id)}
                  className={`whitespace-nowrap rounded-lg px-2 py-1 text-[11px] font-semibold tracking-wide touch-manipulation transition-all shadow-md ${
                    isSelected
                      ? 'border border-primary bg-primary/25 text-white ring-2 ring-primary/50 scale-105'
                      : 'border border-border/80 bg-slate-950/85 text-slate-300 hover:border-primary/50 hover:text-white'
                  }`}
                >
                  <span
                    className="mr-1.5 inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                  {node.name}
                </button>
              </Html>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillsConstellation3D() {
  const [selectedId, setSelectedId] = useState<string>('python');
  const selectedNode = TECH_NODES.find((n) => n.id === selectedId) || TECH_NODES[0];

  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-[#070d18] shadow-2xl">
      {/* Top Category Filter / Technology Navigation Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 bg-surface/70 px-3.5 py-3 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Core Engineering Stack
            </span>
          </div>
          <h4 className="mt-0.5 text-sm font-semibold text-white">
            Interactive 3D Technology Matrix · 9 Core Technologies
          </h4>
        </div>

        {/* Quick Technology Chips for immediate 1-click access */}
        <div className="flex flex-wrap gap-1.5">
          {TECH_NODES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedId(t.id)}
              className={`inline-flex min-h-[34px] items-center rounded-lg px-2.5 py-1 text-xs font-medium touch-manipulation transition ${
                selectedId === t.id
                  ? 'bg-primary text-slate-950 font-semibold shadow-sm'
                  : 'bg-card text-slate-400 hover:bg-surface hover:text-white'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_0.9fr] items-center">
        {/* 3D Canvas with generous viewport */}
        <div className="relative h-[290px] w-full sm:h-[330px]" style={{ touchAction: 'pan-y' }}>
          <Canvas
            camera={{ position: [0, 0, 5.2], fov: 46 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            className="cursor-pointer"
          >
            <ambientLight intensity={0.5} color="#0c1e3a" />
            <directionalLight position={[4, 5, 4]} intensity={1.2} color="#38bdf8" />
            <directionalLight position={[-4, -3, -3]} intensity={0.6} color="#0284c7" />

            <OrbitalTechRing
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          </Canvas>

          <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full border border-border/80 bg-slate-950/80 px-2.5 py-1 text-[11px] text-slate-400 backdrop-blur-md">
            <Eye size={12} className="text-primary" />
            <span>Click any 3D node or technology button to inspect context</span>
          </div>
        </div>

        {/* Detailed Technology Architecture Description */}
        <div className="border-t border-border/80 p-5 lg:border-l lg:border-t-0 bg-[#0a1220]/70">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                style={{ backgroundColor: selectedNode.color }}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {selectedNode.category}
              </span>
            </div>
            <span className="rounded-full border border-border bg-card px-2.5 py-0.5 font-mono text-[10px] text-slate-400">
              Active Focus
            </span>
          </div>

          <h5 className="mt-2 text-xl font-bold tracking-tight text-white">{selectedNode.name}</h5>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            {selectedNode.role}
          </p>

          <div className="mt-3.5 rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
              System Context & Applied Engineering
            </span>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              {selectedNode.context}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/60 pt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-sky-300 font-medium text-[11px]">
              <Layers size={13} className="text-primary" />
              {selectedNode.projectAssociation}
            </span>
            <span className="text-[10px] text-slate-500">Verified scope</span>
          </div>
        </div>
      </div>
    </div>
  );
}
