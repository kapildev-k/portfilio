'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Boxes,
  Cpu,
  FileSearch,
  ArrowRight,
  Database,
  Bell,
  MessageSquare,
  Flame,
  Shield,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Eye,
  X
} from 'lucide-react';

interface PipelineStage {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  color: string;
  position: [number, number, number];
  role: string;
  technicalDetails: string[];
  securityNote: string;
}

const STAGES: PipelineStage[] = [
  {
    id: 'containers',
    index: 1,
    name: 'Application Containers',
    subtitle: 'Microservices Fleet',
    color: '#38bdf8',
    position: [-3.6, 0.6, 0],
    role: 'Emits stdout/stderr logs from isolated application pods and services.',
    technicalDetails: [
      'Containerized backend services and workers',
      'JSON-formatted structured log streams',
      'Ephemeral container lifecycles'
    ],
    securityNote: 'Containers run with non-root UID; unprivileged user namespaces.'
  },
  {
    id: 'agent',
    index: 2,
    name: 'Monitoring Agent',
    subtitle: 'Read-Only Log Collector',
    color: '#0ea5e9',
    position: [-2.4, -0.6, 0.4],
    role: 'Collects container logs via read-only volume mounts without Docker socket exposure.',
    technicalDetails: [
      'Read-only mount access to /var/log/containers',
      'Zero root daemon socket vulnerability surface',
      'High efficiency file tailing with backpressure buffers'
    ],
    securityNote: 'Eliminates Docker socket privilege escalation risk entirely.'
  },
  {
    id: 'processing',
    index: 3,
    name: 'Log Processing',
    subtitle: 'Classify & Redact Engine',
    color: '#0284c7',
    position: [-1.2, 0.6, -0.3],
    role: 'Performs pattern matching, severity tagging (INFO/WARN/ERROR), and secret redaction.',
    technicalDetails: [
      'Regex redaction for bearer tokens, passwords, and AWS keys',
      'Aggregation of high-volume INFO events',
      'Extraction of trace IDs and error stack traces'
    ],
    securityNote: 'Guarantees sensitive credentials are scrubbed prior to network transit.'
  },
  {
    id: 'ingestion',
    index: 4,
    name: 'Ingestion API',
    subtitle: 'HTTPS Batch Gateway',
    color: '#38bdf8',
    position: [0.0, -0.6, 0.2],
    role: 'Receives and validates encrypted log batches over HTTPS with mutual auth.',
    technicalDetails: [
      'Batched payload transport for low network overhead',
      'mTLS authentication and token verification',
      'Asynchronous queue handoff for ingestion stability'
    ],
    securityNote: 'HTTPS transport encryption with strict request schema validation.'
  },
  {
    id: 'database',
    index: 5,
    name: 'PostgreSQL Store',
    subtitle: 'Time-Partitioned Storage',
    color: '#60a5fa',
    position: [1.2, 0.6, -0.2],
    role: 'Stores structured log events, aggregate counts, and incident histories.',
    technicalDetails: [
      'Partitioned tables by time range for fast indexing',
      'JSONB columns for flexible diagnostic context',
      'Optimized query indices for Grafana dashboards'
    ],
    securityNote: 'Encrypted at rest with strict role-based DB credentials.'
  },
  {
    id: 'alert',
    index: 6,
    name: 'Alert Service',
    subtitle: 'Threshold & Deduplication',
    color: '#f59e0b',
    position: [2.4, -0.6, 0.3],
    role: 'Correlates error spikes, deduplicates repeat alerts, and triggers dispatch workflows.',
    technicalDetails: [
      'Rolling error rate threshold monitoring',
      'Flap detection and alert deduplication window',
      'Severity level routing (P1 / P2 / P3)'
    ],
    securityNote: 'Audit logging for all alert state transitions and incident dispatches.'
  },
  {
    id: 'teams',
    index: 7,
    name: 'Microsoft Teams',
    subtitle: 'Incident Dispatch Channel',
    color: '#f43f5e',
    position: [3.6, 0.6, 0],
    role: 'Delivers real-time actionable incident cards with deep links to Grafana logs.',
    technicalDetails: [
      'Webhook integration with Adaptive Cards format',
      'Error stack summary and affected service tags',
      'Quick response buttons for on-call acknowledgment'
    ],
    securityNote: 'Secure webhook endpoints with signature validation.'
  }
];

// Single Packet traveling through the pipeline
function AnimatedPacket({
  startPos,
  endPos,
  color,
  offset,
  speed,
  isPlaying
}: {
  startPos: [number, number, number];
  endPos: [number, number, number];
  color: string;
  offset: number;
  speed: number;
  isPlaying: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    if (!isPlaying) return;
    const time = state.clock.getElapsedTime() * speed + offset;
    const t = (time % 1);
    meshRef.current.position.lerpVectors(
      new THREE.Vector3(...startPos),
      new THREE.Vector3(...endPos),
      t
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

// Stage Node
function StageNode({
  stage,
  isSelected,
  onClick
}: {
  stage: PipelineStage;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <group position={stage.position}>
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Node Box */}
        <mesh onClick={(e) => { e.stopPropagation(); onClick(); }}>
          <boxGeometry args={[0.54, 0.54, 0.54]} />
          <meshStandardMaterial
            color={stage.color}
            emissive={stage.color}
            emissiveIntensity={isSelected ? 1.3 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Selection Ring */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.42, 0.48, 32]} />
            <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.85} />
          </mesh>
        )}

        {/* 3D Label */}
        <Html distanceFactor={12} position={[0, 0.58, 0]} center pointerEvents="none">
          <div className={`whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-medium tracking-tight shadow-lg transition ${
            isSelected
              ? 'border border-primary bg-primary/25 text-white ring-2 ring-primary/40'
              : 'border border-border/80 bg-card/90 text-slate-300'
          }`}>
            <span className="font-semibold text-primary">0{stage.index}</span> {stage.name.split(' ')[0]}
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Pipeline Connecting Rail
function PipelineRail({ stages, isPlaying }: { stages: PipelineStage[]; isPlaying: boolean }) {
  const points = useMemo(() => {
    return stages.map((s) => new THREE.Vector3(...s.position));
  }, [stages]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.03, 8, false);
  }, [curve]);

  return (
    <group>
      {/* 3D Connecting Tube */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color="#1e293b"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Segments with continuous flow pulses */}
      {stages.slice(0, -1).map((s, i) => {
        const next = stages[i + 1];
        return (
          <React.Fragment key={s.id}>
            <AnimatedPacket
              startPos={s.position}
              endPos={next.position}
              color="#38bdf8"
              offset={0.1}
              speed={0.6}
              isPlaying={isPlaying}
            />
            <AnimatedPacket
              startPos={s.position}
              endPos={next.position}
              color={i >= 4 ? '#f43f5e' : '#7dd3fc'}
              offset={0.6}
              speed={0.6}
              isPlaying={isPlaying}
            />
          </React.Fragment>
        );
      })}
    </group>
  );
}

function PipelineScene({
  selectedId,
  isPlaying,
  onSelect
}: {
  selectedId: string;
  isPlaying: boolean;
  onSelect: (id: string) => void;
}) {
  const { size } = useThree();
  const stages = useMemo(() => {
    if (size.width >= 600) {
      return STAGES.map((stage) => {
        const position: PipelineStage['position'] = [
          stage.position[0] * 0.75,
          stage.position[1],
          stage.position[2]
        ];
        return { ...stage, position };
      });
    }

    return STAGES.map((stage, index) => {
      const position: PipelineStage['position'] = [
        index % 2 === 0 ? -0.32 : 0.32,
        1.4 - index * 0.47,
        stage.position[2]
      ];
      return { ...stage, position };
    });
  }, [size.width]);

  return (
    <>
      <ambientLight intensity={0.5} color="#0c1e3a" />
      <directionalLight position={[6, 8, 5]} intensity={1.2} color="#38bdf8" />
      <directionalLight position={[-6, -4, -3]} intensity={0.6} color="#0284c7" />
      <PipelineRail stages={stages} isPlaying={isPlaying} />
      {stages.map((stage) => (
        <StageNode
          key={stage.id}
          stage={stage}
          isSelected={selectedId === stage.id}
          onClick={() => onSelect(stage.id)}
        />
      ))}
    </>
  );
}

export default function JedaiMonitoring3D() {
  const [selectedId, setSelectedId] = useState<string>('agent');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [incidentTriggered, setIncidentTriggered] = useState<boolean>(false);
  const controlsRef = useRef<any>(null);

  const selectedStage = STAGES.find((s) => s.id === selectedId) || STAGES[1];

  const handleSimulateIncident = () => {
    setIncidentTriggered(true);
    setSelectedId('teams');
    setTimeout(() => {
      setIncidentTriggered(false);
    }, 6000);
  };

  const handleRotate = (angle: number) => {
    if (!controlsRef.current) return;
    const camera = controlsRef.current.object;
    if (camera) {
      const x = camera.position.x;
      const z = camera.position.z;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      camera.position.x = x * cos - z * sin;
      camera.position.z = x * sin + z * cos;
      camera.lookAt(0, 0, 0);
      controlsRef.current.update();
    }
  };

  const handleZoom = (delta: number) => {
    if (!controlsRef.current) return;
    const camera = controlsRef.current.object;
    if (camera) {
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + delta, 3.5, 11);
      controlsRef.current.update();
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) controlsRef.current.reset();
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[#070d18] shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 bg-surface/70 px-3.5 py-3 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              JEDAI Monitoring Module · 3D Pipeline
            </p>
          </div>
          <h4 className="mt-0.5 text-sm font-semibold text-white">
            Log Processing, Secret Redaction & Alerting Architecture
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Simulate Incident Trigger Button */}
          <button
            type="button"
            onClick={handleSimulateIncident}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-rose-500/60 bg-rose-500/15 px-3 py-1.5 text-xs font-semibold text-rose-300 touch-manipulation transition hover:bg-rose-500 hover:text-slate-950"
          >
            <AlertTriangle size={14} className="text-rose-400" />
            <span className="sm:hidden">{incidentTriggered ? 'Incident Active' : 'Simulate P1'}</span>
            <span className="hidden sm:inline">{incidentTriggered ? 'Incident Dispatched' : 'Simulate P1 Incident'}</span>
          </button>

          {/* Play/Pause Flow */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause packet stream' : 'Play packet stream'}
            title={isPlaying ? 'Pause stream' : 'Resume stream'}
            className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg border border-border bg-card p-1.5 text-slate-400 touch-manipulation transition hover:border-primary hover:text-primary"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>

          {/* Camera Rotation & Zoom Controls */}
          <div className="flex min-h-[36px] items-center rounded-lg border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => handleRotate(-Math.PI / 8)}
              aria-label="Rotate pipeline camera left"
              title="Rotate Left"
              className="p-1.5 text-slate-400 hover:text-white touch-manipulation"
            >
              <RotateCcw size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleRotate(Math.PI / 8)}
              aria-label="Rotate pipeline camera right"
              title="Rotate Right"
              className="p-1.5 text-slate-400 hover:text-white touch-manipulation"
            >
              <RotateCw size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-0.8)}
              aria-label="Zoom in"
              title="Zoom In"
              className="p-1.5 text-slate-400 hover:text-white touch-manipulation"
            >
              <ZoomIn size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(0.8)}
              aria-label="Zoom out"
              title="Zoom Out"
              className="p-1.5 text-slate-400 hover:text-white touch-manipulation"
            >
              <ZoomOut size={14} />
            </button>
            <button
              type="button"
              onClick={handleResetCamera}
              aria-label="Reset camera"
              title="Reset 3D camera"
              className="p-1.5 text-slate-400 hover:text-primary touch-manipulation"
            >
              <RotateCcw size={14} className="text-primary/70" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Flow Canvas with non-trapping scroll */}
      <div className="relative h-[340px] w-full sm:h-[390px]" style={{ touchAction: 'pan-y' }}>
        <Canvas
          camera={{ position: [0, 1.1, 5.8], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing"
        >
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            minDistance={3.5}
            maxDistance={11}
            maxPolarAngle={Math.PI / 2 + 0.1}
            touches={{
              ONE: undefined,
              TWO: THREE.TOUCH.DOLLY_ROTATE
            }}
          />
          <PipelineScene
            selectedId={selectedId}
            isPlaying={isPlaying}
            onSelect={setSelectedId}
          />
        </Canvas>

        {/* 3D Navigation Guide Pill */}
        <div className="pointer-events-none absolute bottom-3 left-3 sm:left-4 flex items-center gap-2 rounded-full border border-border/80 bg-slate-950/85 px-3 py-1 text-[11px] text-slate-400 backdrop-blur-md">
          <Eye size={12} className="text-primary shrink-0" />
          <span className="hidden sm:inline">Rotate: Drag &middot; Zoom: Scroll or +/- &middot; Select: Click stage</span>
          <span className="sm:hidden">Rotate: 2 fingers or ↺/↻ &middot; Tap stage to inspect</span>
        </div>

        {/* Simulated Incident Toast Overlay */}
        {incidentTriggered && (
          <div className="absolute right-3 top-3 max-w-sm rounded-xl border border-rose-500/80 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                <Bell size={14} />
                <span>Microsoft Teams Webhook Dispatched</span>
              </div>
              <button
                type="button"
                onClick={() => setIncidentTriggered(false)}
                className="rounded p-0.5 text-slate-400 hover:text-white touch-manipulation"
                aria-label="Dismiss incident toast"
              >
                <X size={14} />
              </button>
            </div>
            <p className="mt-1 text-[11px] leading-4 text-slate-200">
              P1 Alert: Connection pool timeout in production container. Redacted log ingested, threshold evaluated, notification posted to #oncall-ops channel.
            </p>
          </div>
        )}
      </div>

      {/* Stage Detail Inspector Panel */}
      <div className="border-t border-border bg-[#0a1220] p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              {selectedStage.id === 'containers' ? (
                <Boxes size={18} />
              ) : selectedStage.id === 'agent' ? (
                <Cpu size={18} />
              ) : selectedStage.id === 'processing' ? (
                <FileSearch size={18} />
              ) : selectedStage.id === 'database' ? (
                <Database size={18} />
              ) : selectedStage.id === 'teams' ? (
                <MessageSquare size={18} />
              ) : (
                <Bell size={18} />
              )}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                  STAGE 0{selectedStage.index}
                </span>
                <h5 className="text-sm font-semibold text-white">{selectedStage.name}</h5>
                <span className="text-[11px] text-slate-400">({selectedStage.subtitle})</span>
              </div>
              <p className="mt-1 text-xs text-slate-300">{selectedStage.role}</p>
            </div>
          </div>

          {/* Quick Stage Steps Navigation */}
          <div className="flex flex-wrap gap-1">
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedId(s.id)}
                className={`inline-flex min-h-[32px] items-center rounded px-2.5 py-1 text-[11px] font-medium touch-manipulation transition ${
                  selectedId === s.id
                    ? 'bg-primary text-slate-950 font-semibold shadow-sm'
                    : 'bg-surface text-slate-400 hover:text-white'
                }`}
              >
                0{s.index} {s.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Specifications & Security Design */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/80 bg-card/60 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Implementation Details
            </span>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
              {selectedStage.technicalDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Security & Reliability Design
            </span>
            <p className="mt-2 text-xs leading-5 text-slate-200">{selectedStage.securityNote}</p>
            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-emerald-400">
              <CheckCircle2 size={12} />
              Validated in production container logging pipeline
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
