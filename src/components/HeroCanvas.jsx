import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interactive torch that follows the cursor
function MouseTorch() {
  const lightRef = useRef();

  useFrame((state) => {
    if (!lightRef.current) return;
    // Track cursor and translate to R3F coords
    const x = state.pointer.x * 6;
    const y = state.pointer.y * 4;
    // Gently lerp the light position for fluid movement
    lightRef.current.position.x += (x - lightRef.current.position.x) * 0.1;
    lightRef.current.position.y += (y - lightRef.current.position.y) * 0.1;
  });

  return (
    <spotLight
      ref={lightRef}
      color="#D46A43" // Terracotta Burnt Orange
      intensity={12}
      distance={12}
      angle={0.6}
      penumbra={0.8}
      position={[0, 0, 5]}
      castShadow
      shadow-mapSize-width={512}
      shadow-mapSize-height={512}
    />
  );
}

// Coffee Mug Mesh
function CoffeeMug({ color }) {
  return (
    <group>
      {/* Mug Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.7, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Mug Handle */}
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.18, 0.06, 12, 24, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Monitor Frame Mesh
function MonitorFrame({ color }) {
  return (
    <group>
      {/* Screen Outline */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.9, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Screen Inner Display */}
      <mesh position={[0, 0, 0.031]}>
        <boxGeometry args={[1.4, 0.8, 0.01]} />
        <meshStandardMaterial color="#1E1E1E" roughness={0.9} emissive="#4A5D4E" emissiveIntensity={0.05} />
      </mesh>
      {/* Monitor Stand */}
      <mesh position={[0, -0.6, -0.05]} castShadow>
        <boxGeometry args={[0.12, 0.4, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Monitor Base */}
      <mesh position={[0, -0.8, -0.05]} castShadow>
        <boxGeometry args={[0.5, 0.02, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Individual Floating Keyboard Key
function Keycap({ label, color, textColor }) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.18, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  );
}

// A single floating container applying asymmetric drift and mouse gravity pull
function AntigravityObject({ children, basePosition, speed = 1, amplitude = 0.3, mouseSensitivity = 0.8 }) {
  const groupRef = useRef();
  const initialPos = useRef([...basePosition]);
  const initialRot = useRef([
    Math.random() * 0.4 - 0.2,
    Math.random() * 0.4 - 0.2,
    Math.random() * 0.4 - 0.2
  ]);
  const phaseOffset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Asymmetric drift equations
    const driftY = Math.sin(time * 0.7 * speed + phaseOffset.current) * amplitude;
    const driftX = Math.cos(time * 0.5 * speed + phaseOffset.current) * (amplitude * 0.6);
    const driftZ = Math.sin(time * 0.4 * speed + phaseOffset.current) * (amplitude * 0.4);

    // Mouse coordinates (-1 to 1) influencing "gravity vectors"
    const targetMouseX = state.pointer.x * mouseSensitivity * 1.5;
    const targetMouseY = state.pointer.y * mouseSensitivity * 1.5;

    // Direct positions
    const targetX = initialPos.current[0] + driftX + targetMouseX;
    const targetY = initialPos.current[1] + driftY + targetMouseY;
    const targetZ = initialPos.current[2] + driftZ;

    // Springy lerping
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.03;

    // Small rotational drift
    groupRef.current.rotation.x = initialRot.current[0] + Math.sin(time * 0.3 * speed) * 0.08;
    groupRef.current.rotation.y = initialRot.current[1] + Math.cos(time * 0.25 * speed) * 0.08;
    groupRef.current.rotation.z = initialRot.current[2] + Math.sin(time * 0.15 * speed) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}

// Scene setup containing all items
function Scene() {
  const dispersionGroupRef = useRef();

  useEffect(() => {
    if (!dispersionGroupRef.current) return;

    // Animate the dispersion/scatter of the objects when user scrolls
    gsap.to(dispersionGroupRef.current.position, {
      z: -6, // Push back
      y: 4,  // Move up out of the way
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });

    gsap.to(dispersionGroupRef.current.rotation, {
      y: Math.PI * 0.35,
      x: Math.PI * 0.05,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });
  }, []);

  return (
    <group ref={dispersionGroupRef}>
      {/* Monitor - center left */}
      <AntigravityObject basePosition={[-2, 0.5, -1]} speed={0.9} amplitude={0.25} mouseSensitivity={0.5}>
        <MonitorFrame color="#F4F1EA" />
      </AntigravityObject>

      {/* Coffee Mug - bottom right */}
      <AntigravityObject basePosition={[2.2, -1.2, 0.5]} speed={1.2} amplitude={0.35} mouseSensitivity={1.1}>
        <CoffeeMug color="#D46A43" />
      </AntigravityObject>

      {/* Keyboard Keycaps floating around */}
      <AntigravityObject basePosition={[-1.2, -1, 1]} speed={1.4} amplitude={0.4} mouseSensitivity={1}>
        <Keycap label="Esc" color="#D46A43" />
      </AntigravityObject>

      <AntigravityObject basePosition={[-0.6, -1.3, 0.8]} speed={1.1} amplitude={0.3} mouseSensitivity={0.9}>
        <Keycap label="Alt" color="#F4F1EA" />
      </AntigravityObject>

      <AntigravityObject basePosition={[-0.8, -0.8, 1.2]} speed={1.3} amplitude={0.35} mouseSensitivity={1.2}>
        <Keycap label="Cmd" color="#1E1E1E" />
      </AntigravityObject>

      <AntigravityObject basePosition={[1.8, 0.8, -0.8]} speed={0.8} amplitude={0.2} mouseSensitivity={0.6}>
        <Keycap label="Enter" color="#F4F1EA" />
      </AntigravityObject>

      {/* Background ambient floating dots */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 8;
        const y = (Math.random() - 0.5) * 6;
        const z = (Math.random() - 0.5) * 4 - 2;
        return (
          <AntigravityObject key={i} basePosition={[x, y, z]} speed={0.6 + Math.random() * 0.8} amplitude={0.15 + Math.random() * 0.2} mouseSensitivity={0.4}>
            <mesh>
              <sphereGeometry args={[0.04 + Math.random() * 0.05, 8, 8]} />
              <meshStandardMaterial 
                color={Math.random() > 0.7 ? "#D46A43" : "#F4F1EA"} 
                roughness={0.8} 
              />
            </mesh>
          </AntigravityObject>
        );
      })}
    </group>
  );
}

export function HeroCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true }}
      >
        {/* Soft Warm Oatmeal Ambient lighting */}
        <ambientLight color="#F4F1EA" intensity={0.4} />

        {/* Dynamic spotLight torch following the cursor */}
        <MouseTorch />

        {/* Soft global pointLight for base visibility */}
        <pointLight position={[-4, 4, 2]} color="#F4F1EA" intensity={0.5} castShadow />

        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
