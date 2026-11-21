'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Hero3DProps {
  reducedMotion?: boolean;
}

// Refined Cloud Infrastructure Network
function CloudNetwork({ reducedMotion }: { reducedMotion?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // 16 gracefully positioned cloud infrastructure nodes framing the right portrait area
  const nodes = useMemo(() => {
    const list: { pos: [number, number, number]; size: number; color: string; speed: number }[] = [];
    const colors = ['#38bdf8', '#0ea5e9', '#0284c7', '#7dd3fc'];

    // Coordinated coordinates framing the portrait area with deep z-axis depth
    const positions: [number, number, number][] = [
      [1.4, 2.2, -1.4],
      [2.8, 1.6, -1.0],
      [3.2, 0.2, -1.6],
      [2.6, -1.4, -1.2],
      [1.6, -2.2, -1.5],
      [0.2, -2.4, -1.8],
      [-0.8, -1.8, -2.2],
      [-1.8, -0.8, -2.0],
      [-2.2, 0.8, -2.2],
      [-1.4, 2.0, -1.8],
      [0.0, 2.4, -1.6],
      [2.2, 2.4, -1.8],
      [3.4, -0.8, -1.8],
      [-2.4, -1.6, -2.4],
      [0.8, 0.8, -2.4],
      [-0.4, 1.2, -2.2]
    ];

    positions.forEach((pos, i) => {
      list.push({
        pos,
        size: 0.075 + (i % 3) * 0.025,
        color: colors[i % colors.length],
        speed: 0.7 + (i % 3) * 0.25,
      });
    });
    return list;
  }, []);

  // Compute connections between nearby nodes with optimized geometry
  const connectionGeometry = useMemo(() => {
    const points: number[] = [];
    const maxDist = 2.3;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const p1 = new THREE.Vector3(...nodes[i].pos);
        const p2 = new THREE.Vector3(...nodes[j].pos);
        if (p1.distanceTo(p2) < maxDist) {
          points.push(p1.x, p1.y, p1.z);
          points.push(p2.x, p2.y, p2.z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, [nodes]);

  const lineMesh = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    return new THREE.LineSegments(connectionGeometry, mat);
  }, [connectionGeometry]);

  // Tasteful, non-excessive ambient micro-particles (36 particles)
  const particlePositions = useMemo(() => {
    const coords = new Float32Array(36 * 3);
    for (let i = 0; i < 36; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 7;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 6;
      coords[i * 3 + 2] = -1.2 - Math.random() * 2.5; // Kept behind foreground content
    }
    return coords;
  }, []);

  // Gentle, non-jarring mouse parallax
  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.current.x = y * 0.08;
      targetRotation.current.y = x * 0.12;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [reducedMotion]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Natural slow yaw rotation
      groupRef.current.rotation.y += delta * 0.045;

      // Smooth parallax lerp
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.035
      );
      const targetY = groupRef.current.rotation.y + targetRotation.current.y * 0.03;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.035);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Connections */}
      <primitive object={lineMesh} />

      {/* Nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={node.pos}>
          <Float
            speed={reducedMotion ? 0 : node.speed}
            rotationIntensity={reducedMotion ? 0 : 0.15}
            floatIntensity={reducedMotion ? 0 : 0.35}
          >
            {/* Core Node */}
            <mesh>
              <sphereGeometry args={[node.size, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.8}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Subtle Glowing Halo Ring */}
            <mesh scale={1.7}>
              <sphereGeometry args={[node.size, 10, 10]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={0.14}
                blending={THREE.AdditiveBlending}
                wireframe
              />
            </mesh>
          </Float>
        </group>
      ))}

      {/* Subtle Floating Data Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function Hero3DScene({ reducedMotion = false }: Hero3DProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 48 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} color="#082f49" />
        <directionalLight position={[4, 5, 4]} intensity={1.1} color="#38bdf8" />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#0ea5e9" />
        <fog attach="fog" args={['#080D18', 4, 10.5]} />

        <CloudNetwork reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
