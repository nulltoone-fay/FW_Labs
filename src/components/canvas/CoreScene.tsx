'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

interface CoreSceneProps {
  isVisible?: boolean;
}

function CoreObject({ isMobile }: { isMobile: boolean }) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth subtle mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.04);

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.003;
      coreRef.current.rotation.z += 0.0015;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.003;
      wireframeRef.current.rotation.z += 0.0015;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= 0.004;
      innerCoreRef.current.rotation.y -= 0.004;
    }
  });

  // Calculate clean, collision-free responsive coordinates
  let positionX = 0;
  let positionY = 0;
  let scale = 0.75;

  if (viewport.width < 5.5) {
    // 1. Mobile viewports (stacked below text)
    positionX = 0;
    positionY = 0.1;
    scale = 0.44;
  } else if (viewport.width < 8.5) {
    // 2. Tablet viewports
    positionX = 0;
    positionY = 0.1;
    scale = 0.58;
  } else if (viewport.width < 12) {
    // 3. Small to Medium Desktops (shifted safely into center-right zone)
    positionX = viewport.width * 0.11;
    positionY = 0;
    scale = 0.7;
  } else {
    // 4. Large Desktops & Ultrawide (controlled bounding box, well clear of right HUD)
    positionX = viewport.width * 0.12;
    positionY = 0;
    scale = 0.78;
  }

  return (
    <group ref={groupRef} position={[positionX, positionY, 0]} scale={scale}>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
        
        {/* Crisp Luminous Crystalline Polyhedron */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.7, 0]} />
          <MeshTransmissionMaterial 
            backside 
            samples={isMobile ? 3 : 6} 
            resolution={isMobile ? 256 : 512}
            thickness={0.7}           
            roughness={0.08}          
            ior={1.55}                 
            chromaticAberration={0.08} 
            anisotropy={0.3} 
            distortion={0.15} 
            distortionScale={0.2} 
            temporalDistortion={0.05} 
            color="#d1d5db"
            transmission={0.96}
            reflectivity={0.95}
            transparent
            opacity={0.98}
          />
        </mesh>

        {/* Facet Edge Highlights for Razor-Sharp Geometric Definition */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[1.71, 0]} />
          <meshBasicMaterial 
            wireframe 
            color="#7dd3fc" 
            transparent 
            opacity={0.35} 
          />
        </mesh>

        {/* Internal Luminous Energy Core */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial 
            color="#4ade80" 
            emissive="#4ade80" 
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>

        {/* Inner Orbital Ring (Constrained radius: 2.1 to prevent HUD collision) */}
        <mesh rotation={[Math.PI / 2.6, 0, 0]}>
          <torusGeometry args={[2.1, 0.012, 16, 100]} />
          <meshBasicMaterial color="#e2e8f0" transparent opacity={0.45} />
        </mesh>

        {/* Outer Orbital Ring with Satellite Node (Constrained radius: 2.55) */}
        <mesh rotation={[0, Math.PI / 3.2, Math.PI / 6]}>
          <torusGeometry args={[2.55, 0.009, 16, 100]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.3} />
          
          {/* Glowing Satellite Beacon */}
          <mesh position={[2.55, 0, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial 
              color="#4ade80" 
              emissive="#4ade80" 
              emissiveIntensity={2.5} 
            />
          </mesh>
        </mesh>

      </Float>
    </group>
  );
}

export default function CoreScene({ isVisible = true }: CoreSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
      <Canvas 
        frameloop={isVisible ? 'always' : 'never'} 
        camera={{ position: [0, 0, 7.8], fov: 45 }} 
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} />
        
        {/* Multi-angle Rim Lights */}
        <pointLight position={[6, 4, 3]} intensity={4.5} color="#38bdf8" distance={20} />
        <pointLight position={[-6, -4, 2]} intensity={3.5} color="#4ade80" distance={20} />
        <pointLight position={[0, -5, -3]} intensity={2.5} color="#818cf8" distance={15} />
        <directionalLight position={[0, 8, 5]} intensity={2} color="#ffffff" />

        <CoreObject isMobile={isMobile} />

        <Environment resolution={isMobile ? 128 : 256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer form="rect" intensity={3.5} position={[0, 6, -8]} scale={[12, 12, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={2} position={[-5, 1, -1]} scale={[10, 3, 1]} rotation={[0, Math.PI / 2, 0]} color="#38bdf8" />
            <Lightformer form="rect" intensity={2} position={[10, 1, 0]} scale={[16, 3, 1]} rotation={[0, -Math.PI / 2, 0]} color="#ffffff" />
            <Lightformer form="circle" color="#4ade80" intensity={4} position={[0, -4, -2]} scale={[5, 5, 1]} />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}