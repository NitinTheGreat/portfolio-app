"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

function AnimatedSpheres() {
  const sphere1 = useRef<THREE.Mesh>(null)
  const sphere2 = useRef<THREE.Mesh>(null)
  const sphere3 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (sphere1.current) {
      sphere1.current.position.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.5
      sphere1.current.position.y = Math.cos(clock.getElapsedTime() * 0.2) * 0.5
      sphere1.current.rotation.x = clock.getElapsedTime() * 0.2
      sphere1.current.rotation.y = clock.getElapsedTime() * 0.3
    }
    if (sphere2.current) {
      sphere2.current.position.x = Math.sin(clock.getElapsedTime() * 0.4 + 2) * 0.5
      sphere2.current.position.y = Math.cos(clock.getElapsedTime() * 0.3 + 2) * 0.5
      sphere2.current.rotation.x = clock.getElapsedTime() * 0.3
      sphere2.current.rotation.y = clock.getElapsedTime() * 0.2
    }
    if (sphere3.current) {
      sphere3.current.position.x = Math.sin(clock.getElapsedTime() * 0.2 + 4) * 0.5
      sphere3.current.position.y = Math.cos(clock.getElapsedTime() * 0.4 + 4) * 0.5
      sphere3.current.rotation.x = clock.getElapsedTime() * 0.1
      sphere3.current.rotation.y = clock.getElapsedTime() * 0.4
    }
  })

  return (
    <group position={[3, 0, 0]}>
      <mesh ref={sphere1} position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.2} metalness={0.8} />
      </mesh>

      <mesh ref={sphere2} position={[1, 0.5, -1]}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
      </mesh>

      <mesh ref={sphere3} position={[-1, -0.5, -0.5]}>
        <sphereGeometry args={[0.3, 64, 64]} />
        <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  )
}

function Scene() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <mesh ref={textRef} position={[-3.5, 0, 0]}>
        <boxGeometry args={[5, 1, 0.5]} />
        <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.8} />
      </mesh>

      <AnimatedSpheres />

      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
