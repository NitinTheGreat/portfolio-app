"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { motion } from "framer-motion"
import { AdditiveBlending, BackSide, Vector3, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { usePortfolio } from "@/store/portfolio"
import { noise3d } from "./shaders/noise"

export const SUN_POSITION: [number, number, number] = [45, 12, -20]

const coreVertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const coreFragment = /* glsl */ `
  varying vec3 vPos;
  uniform float uTime;
  uniform float uHover;
  ${noise3d}
  void main() {
    vec3 p = normalize(vPos) * 3.0;
    float n = fbm(p + uTime * 0.05);
    vec3 base = vec3(1.0, 0.95, 0.85);
    vec3 amber = vec3(1.0, 0.72, 0.42);
    vec3 col = mix(base, amber, (1.0 - n) * 0.15);
    col *= (0.92 + 0.08 * n) * 3.0 * (1.0 + uHover * 0.15);
    gl_FragColor = vec4(col, 1.0);
  }
`

const coronaVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const coronaFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(vView)));
    float fresnelInverse = pow(max(1.0 - facing, 0.0), 2.5);
    vec3 coronaColour = mix(vec3(1.0, 0.7, 0.4), vec3(1.0, 0.9, 0.7), fresnelInverse);
    float alpha = fresnelInverse * 0.6;
    gl_FragColor = vec4(coronaColour, alpha);
  }
`

export function Sun() {
  const core = useRef<ShaderMaterial>(null)
  const coreUniforms = useMemo(() => ({ uTime: { value: 0 }, uHover: { value: 0 } }), [])
  const camera = useThree((state) => state.camera)
  const openModal = usePortfolio((state) => state.openModal)
  const [hovered, setHovered] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const bigEnough = useRef(false)
  const centre = useMemo(() => new Vector3(), [])
  const edge = useMemo(() => new Vector3(), [])

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches)
  }, [])

  useAmbientFrame((elapsed, delta) => {
    if (!core.current) return
    core.current.uniforms.uTime.value = elapsed
    const target = hovered ? 1 : 0
    core.current.uniforms.uHover.value +=
      (target - core.current.uniforms.uHover.value) * Math.min(1, delta * 8)

    centre.set(...SUN_POSITION).project(camera)
    edge.set(SUN_POSITION[0], SUN_POSITION[1] + 8, SUN_POSITION[2]).project(camera)
    bigEnough.current = Math.abs(edge.y - centre.y) > 0.12
  })

  const interactive = isDesktop
    ? {
        onPointerOver: () => {
          if (!bigEnough.current) return
          setHovered(true)
          document.body.style.cursor = "pointer"
        },
        onPointerOut: () => {
          setHovered(false)
          document.body.style.cursor = "auto"
        },
        onClick: () => {
          if (bigEnough.current) openModal("cv")
        },
      }
    : {}

  return (
    <group position={SUN_POSITION}>
      <directionalLight position={[0, 0, 0]} intensity={2.4} color="#ffd9a8" />
      <mesh renderOrder={2}>
        <sphereGeometry args={[12, 48, 32]} />
        <shaderMaterial
          vertexShader={coronaVertex}
          fragmentShader={coronaFragment}
          side={BackSide}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh renderOrder={1} {...interactive}>
        <sphereGeometry args={[8, 64, 48]} />
        <shaderMaterial
          ref={core}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={coreUniforms}
          toneMapped={false}
        />
      </mesh>
      {isDesktop && hovered ? (
        <Html position={[-9, -9, 0]} center distanceFactor={40} zIndexRange={[10, 0]}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap rounded-full border border-[#e8e4dc]/25 bg-[#04070e]/70 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-[#e8e4dc]/85 backdrop-blur-md"
          >
            Read the résumé →
          </motion.div>
        </Html>
      ) : null}
    </group>
  )
}
