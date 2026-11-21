'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  RotateCw,
  Eye,
  Flame,
  ZoomIn,
  ZoomOut,
  Server,
  Database,
  Globe,
  Key,
  Layers,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause
} from 'lucide-react';

export interface SecurityNodeData {
  id: string;
  name: string;
  type: string;
  position: [number, number, number];
  color: string;
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  blastRadius: string;
  findings: string[];
  remediation: string;
  arn: string;
  isAttackPath: boolean;
  attackStep: number;
  attackDetail: string;
}

const NODES_DATA: SecurityNodeData[] = [
  {
    id: 'igw',
    name: 'Internet Gateway',
    type: 'AWS::EC2::InternetGateway',
    position: [-3.6, 0.3, 0.2],
    color: '#38bdf8', // Cyan
    risk: 'MEDIUM',
    blastRadius: 'Direct public ingress to VPC perimeter route table',
    findings: ['Default routing configured from 0.0.0.0/0 to public subnets'],
    remediation: 'Restrict default ingress routing and inspect perimeter flow logs.',
    arn: 'arn:aws:ec2:us-east-1:123456789012:internet-gateway/igw-08a9f23e',
    isAttackPath: true,
    attackStep: 1,
    attackDetail: 'Public ingress entrypoint exposing VPC route table to external reconnaissance.'
  },
  {
    id: 'sg',
    name: 'Security Group (sg-ingress)',
    type: 'AWS::EC2::SecurityGroup',
    position: [-2.1, 1.4, 0.1],
    color: '#f59e0b', // Amber
    risk: 'HIGH',
    blastRadius: 'Applied to 4 public compute instances and ingress route',
    findings: ['Inbound rule permits 0.0.0.0/0 on Port 22 (SSH) and Port 80 (HTTP)'],
    remediation: 'Remove 0.0.0.0/0 SSH rule; require Systems Manager Session Manager or bastion VPN.',
    arn: 'arn:aws:ec2:us-east-1:123456789012:security-group/sg-092bf88e1',
    isAttackPath: true,
    attackStep: 2,
    attackDetail: 'Overly permissive ingress allows unauthenticated network traffic on management ports.'
  },
  {
    id: 'vpc',
    name: 'Production VPC',
    type: 'AWS::EC2::VPC',
    position: [-0.6, -1.8, -0.6],
    color: '#0ea5e9', // Sky Blue
    risk: 'INFO',
    blastRadius: '10.0.0.0/16 address space across 3 Availability Zones',
    findings: ['VPC Flow Logs enabled and streaming to CloudWatch log groups'],
    remediation: 'Verify cross-account peering and private subnet segmentation.',
    arn: 'arn:aws:ec2:us-east-1:123456789012:vpc/vpc-0a89d1b4c',
    isAttackPath: false,
    attackStep: 0,
    attackDetail: 'Virtual network boundary containing compute, identity, and container workloads.'
  },
  {
    id: 'ec2',
    name: 'EC2 Compute (Web App)',
    type: 'AWS::EC2::Instance',
    position: [-0.6, 0.2, 0.6],
    color: '#6366f1', // Indigo
    risk: 'CRITICAL',
    blastRadius: 'Public web server with attached IAM instance profile role',
    findings: [
      'Unpatched web service vulnerable to remote code execution',
      'IMDSv1 enabled allowing metadata credential token harvesting'
    ],
    remediation: 'Enforce IMDSv2 only (HttpTokens=required); patch application container.',
    arn: 'arn:aws:ec2:us-east-1:123456789012:instance/i-098cf31be45a19',
    isAttackPath: true,
    attackStep: 3,
    attackDetail: 'Attacker executes exploit and queries metadata service to steal STS role token.'
  },
  {
    id: 'iam',
    name: 'IAM Instance Role',
    type: 'AWS::IAM::Role',
    position: [1.2, 1.4, -0.2],
    color: '#ec4899', // Magenta
    risk: 'CRITICAL',
    blastRadius: 'Full administrator-level access to S3 and EKS cluster APIs',
    findings: ['Overly broad policy: s3:* and eks:DescribeCluster, eks:AccessKubernetesApi granted'],
    remediation: 'Apply least privilege principle; restrict role scope to dedicated read-only prefix.',
    arn: 'arn:aws:iam::123456789012:role/ProductionWorkerInstanceRole',
    isAttackPath: true,
    attackStep: 4,
    attackDetail: 'Stolen credentials grant high-privilege cross-service access without MFA requirement.'
  },
  {
    id: 's3',
    name: 'S3 Data Lake (Vault)',
    type: 'AWS::S3::Bucket',
    position: [3.2, 1.1, 0.4],
    color: '#10b981', // Emerald
    risk: 'CRITICAL',
    blastRadius: 'Contains 1.4 TB of production database backups and customer records',
    findings: ['Bucket policy allows role access without IP or VPC endpoint condition'],
    remediation: 'Attach bucket policy restricting access exclusively via VPC Endpoint (aws:sourceVpce).',
    arn: 'arn:aws:s3:::sec-prod-audit-data-vault',
    isAttackPath: true,
    attackStep: 5,
    attackDetail: 'Target asset reached: confidential financial and compliance data exfiltration path.'
  },
  {
    id: 'eks',
    name: 'EKS Cluster (Production)',
    type: 'AWS::EKS::Cluster',
    position: [2.9, -1.2, -0.2],
    color: '#a855f7', // Purple
    risk: 'HIGH',
    blastRadius: 'Host to 48 containerized production microservices',
    findings: ['RBAC ConfigMap binds IAM role directly to cluster-admin ClusterRole'],
    remediation: 'Remove cluster-admin binding; scope role to specific namespace with read-only RBAC.',
    arn: 'arn:aws:eks:us-east-1:123456789012:cluster/eks-prod-services',
    isAttackPath: true,
    attackStep: 5,
    attackDetail: 'Privilege escalation into Kubernetes control plane allowing container pod takeover.'
  }
];

const CONNECTIONS = [
  { from: 'igw', to: 'sg', isAttack: true, step: 2 },
  { from: 'sg', to: 'ec2', isAttack: true, step: 3 },
  { from: 'ec2', to: 'iam', isAttack: true, step: 4 },
  { from: 'iam', to: 's3', isAttack: true, step: 5 },
  { from: 'iam', to: 'eks', isAttack: true, step: 5 },
  { from: 'vpc', to: 'sg', isAttack: false, step: 0 },
  { from: 'vpc', to: 'ec2', isAttack: false, step: 0 },
  { from: 'vpc', to: 'eks', isAttack: false, step: 0 }
];

// Directional connection link with animated data packet
function NetworkLink({
  start,
  end,
  isAttack,
  attackActive,
  currentStep
}: {
  start: [number, number, number];
  end: [number, number, number];
  isAttack: boolean;
  attackActive: boolean;
  currentStep: number;
}) {
  const isHopActive = attackActive && isAttack;
  const color = isHopActive ? '#f43f5e' : '#334155';

  const linePoints = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  const lineObject = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: isHopActive ? 0.9 : 0.25,
    });
    return new THREE.Line(geometry, mat);
  }, [geometry, color, isHopActive]);

  const packetRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!packetRef.current) return;
    const speed = isHopActive ? 1.0 : 0.4;
    const t = (state.clock.getElapsedTime() * speed) % 1;
    packetRef.current.position.lerpVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
      t
    );
  });

  return (
    <group>
      <primitive object={lineObject} />
      {/* Animated Data Pulse */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[isHopActive ? 0.06 : 0.035, 8, 8]} />
        <meshBasicMaterial
          color={isHopActive ? '#fb7185' : '#38bdf8'}
          transparent
          opacity={0.95}
        />
      </mesh>
    </group>
  );
}

// 3D Resource Node
function NetworkNode({
  data,
  isSelected,
  attackActive,
  currentStep,
  onClick
}: {
  data: SecurityNodeData;
  isSelected: boolean;
  attackActive: boolean;
  currentStep: number;
  onClick: () => void;
}) {
  const isAttackNode = attackActive && data.isAttackPath;
  const isStepFocused = attackActive && data.attackStep === currentStep;

  // Use consistent canonical service color, or pulse crimson if attack path is active
  const baseColor = data.color;
  const nodeColor = isAttackNode ? (isStepFocused ? '#f43f5e' : '#e11d48') : baseColor;

  return (
    <group position={data.position}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        {/* Clickable Sphere Mesh */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <sphereGeometry args={[isSelected ? 0.28 : 0.24, 24, 24]} />
          <meshStandardMaterial
            color={nodeColor}
            emissive={nodeColor}
            emissiveIntensity={isSelected ? 1.5 : isAttackNode ? 1.1 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Selection or Step Halo Ring */}
        {(isSelected || isStepFocused) && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.34, 0.42, 32]} />
            <meshBasicMaterial
              color={isStepFocused ? '#f43f5e' : '#38bdf8'}
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
            />
          </mesh>
        )}

        {/* High-Contrast, Clean Readable Label Chip */}
        <Html distanceFactor={10.5} position={[0, 0.44, 0]} center className="pointer-events-auto">
          <button
            type="button"
            onClick={onClick}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all shadow-xl backdrop-blur-md ${
              isSelected
                ? 'border border-primary bg-primary/25 text-white ring-2 ring-primary/50 scale-105'
                : isAttackNode
                ? 'border border-rose-500/70 bg-rose-950/85 text-rose-200'
                : 'border border-border/80 bg-slate-950/85 text-slate-200 hover:border-primary/50'
            }`}
          >
            <span
              className="mr-1.5 inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            {data.name}
            {isAttackNode && (
              <span className="ml-1.5 rounded bg-rose-600 px-1 py-0.2 text-[9px] font-bold text-white">
                Step {data.attackStep}
              </span>
            )}
          </button>
        </Html>
      </Float>
    </group>
  );
}

export default function AttackPath3D() {
  const [selectedId, setSelectedId] = useState<string>('ec2');
  const [attackActive, setAttackActive] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(3);
  const controlsRef = useRef<any>(null);

  const selectedNode = NODES_DATA.find((n) => n.id === selectedId) || NODES_DATA[3];

  const nodeMap = useMemo(() => {
    const map = new Map<string, [number, number, number]>();
    NODES_DATA.forEach((n) => map.set(n.id, n.position));
    return map;
  }, []);

  const handleResetCamera = () => {
    if (controlsRef.current) controlsRef.current.reset();
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
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + delta, 3.2, 9.5);
      controlsRef.current.update();
    }
  };

  const handleNextStep = () => {
    const next = currentStep >= 5 ? 1 : currentStep + 1;
    setCurrentStep(next);
    const nodeForStep = NODES_DATA.find((n) => n.attackStep === next);
    if (nodeForStep) setSelectedId(nodeForStep.id);
  };

  const handlePrevStep = () => {
    const prev = currentStep <= 1 ? 5 : currentStep - 1;
    setCurrentStep(prev);
    const nodeForStep = NODES_DATA.find((n) => n.attackStep === prev);
    if (nodeForStep) setSelectedId(nodeForStep.id);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[#070d18] shadow-2xl">
      {/* Top Interactive Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 bg-surface/70 px-3.5 py-3 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Cloud Attack Path Engine · 3D Topology
            </p>
          </div>
          <h4 className="mt-0.5 text-sm font-semibold text-white">
            AWS Multi-Stage Attack Path & Blast Radius Simulation
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Attack Path Toggle */}
          <button
            type="button"
            onClick={() => setAttackActive((p) => !p)}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold touch-manipulation transition ${
              attackActive
                ? 'border-rose-500/70 bg-rose-500/20 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'border-border bg-card text-slate-300 hover:border-primary/50 hover:text-white'
            }`}
          >
            <Flame size={14} className={attackActive ? 'text-rose-400' : 'text-slate-400'} />
            <span className="sm:hidden">{attackActive ? 'Path: Active' : 'Highlight Path'}</span>
            <span className="hidden sm:inline">{attackActive ? 'Attack Path: Active' : 'Highlight Attack Path'}</span>
          </button>

          {/* Step Navigation */}
          {attackActive && (
            <div className="flex min-h-[36px] items-center gap-1 rounded-lg border border-border bg-card p-0.5 text-xs">
              <button
                type="button"
                onClick={handlePrevStep}
                aria-label="Previous Attack Step"
                title="Previous Attack Step"
                className="rounded p-1.5 text-slate-400 hover:text-white touch-manipulation"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="px-1 font-mono text-[11px] font-bold text-rose-300">
                Step {currentStep}/5
              </span>
              <button
                type="button"
                onClick={handleNextStep}
                aria-label="Next Attack Step"
                title="Next Attack Step"
                className="rounded p-1.5 text-slate-400 hover:text-white touch-manipulation"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Camera Rotation & Zoom Controls */}
          <div className="flex min-h-[36px] items-center rounded-lg border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => handleRotate(-Math.PI / 8)}
              aria-label="Rotate camera left"
              title="Rotate Left"
              className="p-1.5 text-slate-400 hover:text-white touch-manipulation"
            >
              <RotateCcw size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleRotate(Math.PI / 8)}
              aria-label="Rotate camera right"
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
              aria-label="Reset 3D camera"
              title="Reset 3D camera"
              className="p-1.5 text-slate-400 hover:text-primary touch-manipulation"
            >
              <RotateCcw size={14} className="text-primary/70" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Viewport with generous height & non-trapping scroll */}
      <div className="relative h-[380px] w-full sm:h-[430px]" style={{ touchAction: 'pan-y' }}>
        <Canvas
          camera={{ position: [0, 1.4, 6.8], fov: 46 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing"
        >
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            minDistance={3.5}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2 + 0.15}
            touches={{
              ONE: undefined,
              TWO: THREE.TOUCH.DOLLY_ROTATE
            }}
          />
          <ambientLight intensity={0.5} color="#0c1e3a" />
          <directionalLight position={[6, 8, 5]} intensity={1.2} color="#38bdf8" />
          <directionalLight position={[-6, -4, -3]} intensity={0.6} color="#0284c7" />

          {/* Floor grid representing cloud boundary */}
          <gridHelper args={[10, 10, '#1e293b', '#0f172a']} position={[0, -2.2, 0]} />

          {/* Connecting Directional Links */}
          {CONNECTIONS.map((c, i) => {
            const start = nodeMap.get(c.from);
            const end = nodeMap.get(c.to);
            if (!start || !end) return null;
            return (
              <NetworkLink
                key={i}
                start={start}
                end={end}
                isAttack={c.isAttack}
                attackActive={attackActive}
                currentStep={currentStep}
              />
            );
          })}

          {/* Interactive Resource Nodes */}
          {NODES_DATA.map((node) => (
            <NetworkNode
              key={node.id}
              data={node}
              isSelected={selectedId === node.id}
              attackActive={attackActive}
              currentStep={currentStep}
              onClick={() => {
                setSelectedId(node.id);
                if (node.attackStep > 0) setCurrentStep(node.attackStep);
              }}
            />
          ))}
        </Canvas>

        {/* 3D Navigation Guide Pill */}
        <div className="pointer-events-none absolute bottom-3 left-3 sm:left-4 flex items-center gap-2 rounded-full border border-border/80 bg-slate-950/85 px-3 py-1 text-[11px] text-slate-400 backdrop-blur-md">
          <Eye size={12} className="text-primary shrink-0" />
          <span className="hidden sm:inline">Rotate: Drag &middot; Zoom: Scroll or +/- &middot; Select: Click any node</span>
          <span className="sm:hidden">Rotate: 2 fingers or ↺/↻ &middot; Tap node to inspect</span>
        </div>

        {/* Attack Path Story Overlay Banner */}
        {attackActive && (
          <div className="pointer-events-none absolute right-4 top-4 max-w-sm rounded-xl border border-rose-500/40 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-md sm:block hidden">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300">
              <ShieldAlert size={14} />
              <span>Multi-Stage Attack Path (Active)</span>
            </div>
            <p className="mt-1 text-[11px] leading-4 text-slate-300">
              IGW (0.0.0.0/0) &rarr; SG Port 22/80 &rarr; EC2 Web RCE &rarr; IMDSv1 Role Theft &rarr; S3 Data Exfiltration & EKS Takeover.
            </p>
          </div>
        )}
      </div>

      {/* Resource Details Inspector Panel */}
      <div className="border-t border-border bg-[#0a1220] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
              style={{
                borderColor: selectedNode.color + '55',
                backgroundColor: selectedNode.color + '15',
                color: selectedNode.color
              }}
            >
              {selectedNode.id === 's3' ? (
                <Database size={20} />
              ) : selectedNode.id === 'iam' ? (
                <Key size={20} />
              ) : selectedNode.id === 'igw' ? (
                <Globe size={20} />
              ) : (
                <Server size={20} />
              )}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h5 className="text-base font-bold text-white">{selectedNode.name}</h5>
                <span className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] text-slate-300">
                  {selectedNode.type}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    selectedNode.risk === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : selectedNode.risk === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-primary/20 text-primary border border-primary/30'
                  }`}
                >
                  {selectedNode.risk} RISK
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-slate-400 truncate max-w-xl">
                {selectedNode.arn}
              </p>
            </div>
          </div>

          {/* Quick Node Selector Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {NODES_DATA.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  setSelectedId(node.id);
                  if (node.attackStep > 0) setCurrentStep(node.attackStep);
                }}
                className={`inline-flex min-h-[34px] items-center rounded-lg px-2.5 py-1 text-xs font-medium touch-manipulation transition ${
                  selectedId === node.id
                    ? 'bg-primary text-slate-950 font-semibold shadow-sm'
                    : 'bg-card text-slate-400 hover:text-white hover:bg-surface'
                }`}
              >
                {node.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Diagnostic Details Grid */}
        <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
          <div className="rounded-xl border border-border/80 bg-card/60 p-3.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
              Blast Radius Context & Attack Story
            </span>
            <p className="mt-1.5 text-xs leading-5 text-slate-200">{selectedNode.blastRadius}</p>
            {selectedNode.isAttackPath && (
              <div className="mt-2.5 border-t border-border/60 pt-2 text-xs text-rose-300 leading-5">
                <span className="font-semibold text-rose-400">Step {selectedNode.attackStep}: </span>
                {selectedNode.attackDetail}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-3.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
              Security Remediation
            </span>
            <p className="mt-1.5 text-xs leading-5 text-emerald-300/90">{selectedNode.remediation}</p>
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-400 border-t border-border/60 pt-2">
              <ShieldCheck size={13} className="text-primary" />
              <span>Modeled via Apache AGE graph traversal queries & CloudTrail event correlation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
