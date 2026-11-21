'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  ShieldCheck,
  Server,
  Laptop,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Lock,
  RotateCcw,
  RotateCw,
  Cpu,
  Eye,
  ZoomIn,
  ZoomOut,
  Radio,
  Sparkles
} from 'lucide-react';

export interface EndpointDevice {
  id: string;
  name: string;
  os: 'Windows' | 'Linux' | 'macOS';
  sector: string;
  osVersion: string;
  status: 'COMPLIANT' | 'NEEDS_UPDATE';
  score: number;
  position: [number, number, number];
  color: string;
  checks: {
    firewall: boolean;
    diskEncryption: string;
    antivirus: string;
    osUpdates: string;
    secureBoot: boolean;
    tpm: boolean;
    usbPolicy: string;
    tamperProtection: boolean;
  };
}

const FLEET_DEVICES: EndpointDevice[] = [
  // WINDOWS SECTOR (LEFT)
  {
    id: 'win-1',
    name: 'WKS-CORP-ENG-042',
    os: 'Windows',
    sector: 'Windows Sector',
    osVersion: 'Windows 11 Enterprise (23H2)',
    status: 'COMPLIANT',
    score: 100,
    position: [-3.4, 0.7, 0.3],
    color: '#38bdf8',
    checks: {
      firewall: true,
      diskEncryption: 'BitLocker AES-256 (Enforced)',
      antivirus: 'Defender ATP (Definitions: Current)',
      osUpdates: 'Patched to KB5034441',
      secureBoot: true,
      tpm: true,
      usbPolicy: 'Mass Storage Blocked',
      tamperProtection: true
    }
  },
  {
    id: 'win-2',
    name: 'VDI-FINANCE-08',
    os: 'Windows',
    sector: 'Windows Sector',
    osVersion: 'Windows 11 Pro VDI',
    status: 'NEEDS_UPDATE',
    score: 87,
    position: [-3.0, -1.3, -0.3],
    color: '#f59e0b',
    checks: {
      firewall: true,
      diskEncryption: 'BitLocker Active',
      antivirus: 'Definitions Current',
      osUpdates: 'Security update pending restart',
      secureBoot: true,
      tpm: true,
      usbPolicy: 'Policy Enforced',
      tamperProtection: true
    }
  },

  // LINUX SECTOR (TOP / CENTER-BACK)
  {
    id: 'linux-1',
    name: 'srv-prod-bastion-01',
    os: 'Linux',
    sector: 'Linux Sector',
    osVersion: 'Ubuntu 24.04 LTS (Kernel 6.8)',
    status: 'COMPLIANT',
    score: 100,
    position: [-1.1, 2.2, -0.6],
    color: '#0ea5e9',
    checks: {
      firewall: true,
      diskEncryption: 'LUKS2 Full Volume Encryption',
      antivirus: 'ClamAV + OSquery Daemon Active',
      osUpdates: 'Unattended Security Upgrades Active',
      secureBoot: true,
      tpm: true,
      usbPolicy: 'Kernel USB Storage Module Blacklisted',
      tamperProtection: true
    }
  },
  {
    id: 'linux-2',
    name: 'k8s-node-infra-04',
    os: 'Linux',
    sector: 'Linux Sector',
    osVersion: 'Debian 12 Bookworm',
    status: 'COMPLIANT',
    score: 100,
    position: [1.1, 2.2, -0.6],
    color: '#0284c7',
    checks: {
      firewall: true,
      diskEncryption: 'Encrypted LVM Root',
      antivirus: 'Host Integrity Verification Active',
      osUpdates: 'Latest Stable Patchset',
      secureBoot: true,
      tpm: true,
      usbPolicy: 'Disabled in BIOS & Kernel',
      tamperProtection: true
    }
  },

  // macOS SECTOR (RIGHT)
  {
    id: 'mac-1',
    name: 'mbp-eng-dev-018',
    os: 'macOS',
    sector: 'macOS Sector',
    osVersion: 'macOS 14.6 Sonoma',
    status: 'COMPLIANT',
    score: 100,
    position: [3.4, 0.7, 0.3],
    color: '#818cf8',
    checks: {
      firewall: true,
      diskEncryption: 'FileVault 2 APFS Encrypted',
      antivirus: 'XProtect + MRT Current',
      osUpdates: 'Rapid Security Response Active',
      secureBoot: true,
      tpm: true,
      usbPolicy: 'Restricted Peripheral Policy',
      tamperProtection: true
    }
  },
  {
    id: 'mac-2',
    name: 'mac-lead-arch-003',
    os: 'macOS',
    sector: 'macOS Sector',
    osVersion: 'macOS 15.0 Sequoia',
    status: 'COMPLIANT',
    score: 100,
    position: [3.0, -1.3, -0.3],
    color: '#a855f7',
    checks: {
      firewall: true,
      diskEncryption: 'FileVault 2 Enforced',
      antivirus: 'XProtect v5262 Current',
      osUpdates: 'Auto Update Enforced',
      secureBoot: true,
      tpm: true,
      usbPolicy: 'Restricted',
      tamperProtection: true
    }
  }
];

// Multi-Tiered Central Nethra Platform Hub
function CentralNethraHub() {
  const innerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (innerRingRef.current) innerRingRef.current.rotation.z += delta * 0.45;
    if (midRingRef.current) midRingRef.current.rotation.z -= delta * 0.28;
    if (outerRingRef.current) outerRingRef.current.rotation.z += delta * 0.15;
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* Central Cyber Tower Core */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.7, 24]} />
        <meshStandardMaterial
          color="#0c253d"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Glowing Core Sphere */}
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Rotating Radar Sweep Rings */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2.6, 0, 0]}>
        <ringGeometry args={[0.65, 0.74, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>

      <mesh ref={midRingRef} rotation={[-Math.PI / 3, 0, 0]}>
        <ringGeometry args={[0.95, 1.02, 32]} />
        <meshBasicMaterial
          color="#0ea5e9"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Ground Telemetry Radar Base */}
      <mesh ref={outerRingRef} position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.35, 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Central Hub Label */}
      <Html distanceFactor={10} position={[0, 0.85, 0]} center pointerEvents="none">
        <div className="whitespace-nowrap rounded-full border border-primary/70 bg-slate-950/90 px-3 py-1 text-[11px] font-bold text-primary shadow-xl backdrop-blur-md">
          NETHRA CORE HUB
        </div>
      </Html>
    </group>
  );
}

// Encrypted communication stream with animated data packets
function AgentStreamLine({
  position,
  status
}: {
  position: [number, number, number];
  status: 'COMPLIANT' | 'NEEDS_UPDATE';
}) {
  const linePoints = useMemo(() => {
    return [new THREE.Vector3(...position), new THREE.Vector3(0, 0.2, 0)];
  }, [position]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  const color = status === 'COMPLIANT' ? '#38bdf8' : '#f59e0b';

  const lineObject = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.35,
    });
    return new THREE.Line(geometry, mat);
  }, [geometry, color]);

  const packetRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!packetRef.current) return;
    const t = (state.clock.getElapsedTime() * 0.75 + position[0]) % 1;
    packetRef.current.position.lerpVectors(
      new THREE.Vector3(...position),
      new THREE.Vector3(0, 0.2, 0),
      t
    );
  });

  return (
    <group>
      <primitive object={lineObject} />
      {/* Animated Telemetry Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

// 3D Endpoint Device Node
function DeviceNode({
  device,
  isSelected,
  onClick
}: {
  device: EndpointDevice;
  isSelected: boolean;
  onClick: () => void;
}) {
  const isCompliant = device.status === 'COMPLIANT';
  const nodeColor = isCompliant ? device.color : '#f59e0b';

  return (
    <group position={device.position}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.25}>
        {/* Device 3D Chassis */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <boxGeometry args={[0.48, 0.38, 0.48]} />
          <meshStandardMaterial
            color={nodeColor}
            emissive={nodeColor}
            emissiveIntensity={isSelected ? 1.4 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Compliance Status Beacon Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.49, 32]} />
          <meshBasicMaterial
            color={isSelected ? '#38bdf8' : isCompliant ? '#10b981' : '#f59e0b'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Clean, Readable Label Chip */}
        <Html distanceFactor={10.5} position={[0, 0.52, 0]} center className="pointer-events-auto">
          <button
            type="button"
            onClick={onClick}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all shadow-xl backdrop-blur-md ${
              isSelected
                ? 'border border-primary bg-primary/25 text-white ring-2 ring-primary/50 scale-105'
                : 'border border-border/80 bg-slate-950/85 text-slate-200 hover:border-primary/50'
            }`}
          >
            <span
              className="mr-1.5 inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: isCompliant ? '#10b981' : '#f59e0b' }}
            />
            <span className="font-bold text-primary">{device.os}</span> &middot; {device.name.split('-')[0]}
          </button>
        </Html>
      </Float>
    </group>
  );
}

export default function EndpointFleet3D() {
  const [selectedId, setSelectedId] = useState<string>('win-1');
  const [filterOs, setFilterOs] = useState<'All' | 'Windows' | 'Linux' | 'macOS'>('All');
  const controlsRef = useRef<any>(null);

  const filteredDevices = useMemo(() => {
    if (filterOs === 'All') return FLEET_DEVICES;
    return FLEET_DEVICES.filter((d) => d.os === filterOs);
  }, [filterOs]);

  const selectedDevice = FLEET_DEVICES.find((d) => d.id === selectedId) || FLEET_DEVICES[0];

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
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + delta, 3.5, 10.5);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[#070d18] shadow-2xl">
      {/* Top Header & Sector Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 bg-surface/70 px-3.5 py-3 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Nethra Endpoint Fleet Visualizer
            </p>
          </div>
          <h4 className="mt-0.5 text-sm font-semibold text-white">
            Cross-Platform Compliance Telemetry · Windows, Linux & macOS
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* OS Sector Filter Tabs */}
          <div className="flex min-h-[36px] items-center rounded-lg border border-border bg-card p-0.5 text-xs">
            {(['All', 'Windows', 'Linux', 'macOS'] as const).map((os) => (
              <button
                key={os}
                type="button"
                onClick={() => setFilterOs(os)}
                className={`min-h-[32px] rounded-md px-2.5 py-1 font-medium touch-manipulation transition ${
                  filterOs === os
                    ? 'bg-primary text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {os}
              </button>
            ))}
          </div>

          {/* Camera Rotation & Zoom Controls */}
          <div className="flex min-h-[36px] items-center rounded-lg border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => handleRotate(-Math.PI / 8)}
              aria-label="Rotate fleet camera left"
              title="Rotate Left"
              className="p-1.5 text-slate-400 hover:text-white touch-manipulation"
            >
              <RotateCcw size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleRotate(Math.PI / 8)}
              aria-label="Rotate fleet camera right"
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

      {/* Enlarged 3D Viewport with non-trapping scroll */}
      <div className="relative h-[400px] w-full sm:h-[460px]" style={{ touchAction: 'pan-y' }}>
        <Canvas
          camera={{ position: [0, 2.6, 7.2], fov: 46 }}
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
            maxPolarAngle={Math.PI / 2 + 0.15}
            touches={{
              ONE: undefined,
              TWO: THREE.TOUCH.DOLLY_ROTATE
            }}
          />
          <ambientLight intensity={0.5} color="#0c1e3a" />
          <directionalLight position={[6, 8, 5]} intensity={1.2} color="#38bdf8" />
          <directionalLight position={[-6, -4, -3]} intensity={0.6} color="#0284c7" />

          {/* 3D Sector Floor Grid */}
          <gridHelper args={[10, 10, '#1e293b', '#0f172a']} position={[0, -2.0, 0]} />

          {/* Central Nethra Platform Hub */}
          <CentralNethraHub />

          {/* Active Telemetry Stream Conduits */}
          {filteredDevices.map((device) => (
            <AgentStreamLine
              key={`stream-${device.id}`}
              position={device.position}
              status={device.status}
            />
          ))}

          {/* Fleet Device Nodes in Separated Sectors */}
          {filteredDevices.map((device) => (
            <DeviceNode
              key={device.id}
              device={device}
              isSelected={selectedId === device.id}
              onClick={() => setSelectedId(device.id)}
            />
          ))}
        </Canvas>

        {/* 3D Sector Badges in Viewport */}
        <div className="pointer-events-none absolute left-4 top-4 hidden sm:flex flex-col gap-1.5 text-[11px] font-semibold text-slate-400">
          <span className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-slate-950/80 px-2.5 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-sky-400" /> Windows Sector (Left)
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-slate-950/80 px-2.5 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400" /> Linux Servers (Center)
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-slate-950/80 px-2.5 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-purple-400" /> macOS Laptops (Right)
          </span>
        </div>

        {/* Legend */}
        <div className="pointer-events-none absolute bottom-3 left-3 sm:left-4 flex items-center gap-2 rounded-full border border-border/80 bg-slate-950/85 px-3 py-1 text-[11px] text-slate-400 backdrop-blur-md">
          <Eye size={12} className="text-primary shrink-0" />
          <span className="hidden sm:inline">Rotate: Drag &middot; Zoom: Scroll or +/- &middot; Select: Click device</span>
          <span className="sm:hidden">Rotate: 2 fingers or ↺/↻ &middot; Tap device to inspect</span>
        </div>

        {/* Live Fleet Compliance Stats */}
        <div className="pointer-events-none absolute right-4 top-4 hidden sm:flex items-center gap-3.5 rounded-xl border border-border bg-slate-950/85 px-3.5 py-2 text-xs text-slate-300 backdrop-blur-md">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Fleet Compliance</span>
            <span className="font-bold text-emerald-400 text-sm">96.8% Compliant</span>
          </div>
          <div className="h-7 w-px bg-border" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Agent Lifecycle</span>
            <span className="font-bold text-primary text-sm">GPG Verified</span>
          </div>
        </div>
      </div>

      {/* Selected Device Live Compliance Details Panel */}
      <div className="border-t border-border bg-[#0a1220] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              {selectedDevice.os === 'Windows' ? (
                <Monitor size={20} />
              ) : selectedDevice.os === 'macOS' ? (
                <Laptop size={20} />
              ) : (
                <Server size={20} />
              )}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h5 className="text-base font-bold text-white">{selectedDevice.name}</h5>
                <span className="rounded bg-surface px-2 py-0.5 text-xs font-medium text-slate-300">
                  {selectedDevice.osVersion}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    selectedDevice.status === 'COMPLIANT'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {selectedDevice.status === 'COMPLIANT' ? '100% Compliant' : 'Audit Required'}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {selectedDevice.sector} &middot; Native Go Agent v2.4 &middot; Tamper-proof daemon &middot; Rollback protected
              </p>
            </div>
          </div>

          {/* Quick Device Selector */}
          <div className="flex flex-wrap gap-1.5">
            {FLEET_DEVICES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedId(d.id)}
                className={`inline-flex min-h-[34px] items-center rounded-lg px-2.5 py-1 text-xs font-medium touch-manipulation transition ${
                  selectedId === d.id
                    ? 'bg-primary text-slate-950 font-semibold shadow-sm'
                    : 'bg-card text-slate-400 hover:text-white hover:bg-surface'
                }`}
              >
                {d.name.split('-')[0]} ({d.os[0]})
              </button>
            ))}
          </div>
        </div>

        {/* 8 Compliance Checks Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Firewall</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <CheckCircle2 size={13} /> Active & Enforcing
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Disk Encryption</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-200">
              <Lock size={12} className="text-primary" /> {selectedDevice.checks.diskEncryption.split(' ')[0]}
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Antivirus / EDR</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <ShieldCheck size={13} /> Current Definitions
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">OS Updates</span>
            <span className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${
              selectedDevice.status === 'COMPLIANT' ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {selectedDevice.status === 'COMPLIANT' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              {selectedDevice.status === 'COMPLIANT' ? 'Up to date' : 'Update pending'}
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Secure Boot</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <CheckCircle2 size={13} /> Hardware Verified
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">TPM 2.0 Chip</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <Cpu size={13} /> Active & Attested
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">USB Storage Policy</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-200">
              <Lock size={12} className="text-primary" /> {selectedDevice.checks.usbPolicy}
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/60 p-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Tamper Protection</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <ShieldCheck size={13} /> GPG Verified Daemon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
