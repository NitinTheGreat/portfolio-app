"use client"

import { useMemo, useRef } from "react"
import { AdditiveBlending, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { usePortfolio } from "@/store/portfolio"

const COUNT = 8000
const RADIUS = 500

const vertexShader = /* glsl */ `
  attribute float aMagnitude;
  attribute vec3 aColor;
  attribute float aPhase;
  uniform float uTime;
  uniform float uTwinkle;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 1.0 + uTwinkle * 0.15 * sin(uTime * 2.0 + aPhase);
    gl_PointSize = aMagnitude * twinkle * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, alpha);
  }
`

function hashColor(index: number): [number, number, number] {
  const r = Math.abs(Math.sin(index * 12.9898) * 43758.5453) % 1
  if (r < 0.7) return [1, 1, 1]
  if (r < 0.9) return [0.78, 0.85, 1]
  if (r < 0.98) return [1, 0.95, 0.8]
  return [1, 0.72, 0.6]
}

export function Starfield() {
  const material = useRef<ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const magnitudes = new Float32Array(COUNT)
    const phases = new Float32Array(COUNT)
    const golden = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      positions[i * 3] = Math.cos(theta) * r * RADIUS
      positions[i * 3 + 1] = y * RADIUS
      positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS

      const [cr, cg, cb] = hashColor(i)
      colors[i * 3] = cr
      colors[i * 3 + 1] = cg
      colors[i * 3 + 2] = cb

      const bias = Math.random()
      magnitudes[i] = 0.6 + bias * bias * 2.6
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, colors, magnitudes, phases }
  }, [])

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uTwinkle: { value: 1 } }),
    [],
  )

  useAmbientFrame((elapsed) => {
    if (!material.current) return
    material.current.uniforms.uTime.value = elapsed
    material.current.uniforms.uTwinkle.value =
      usePortfolio.getState().qualityTier === "high" ? 1 : 0
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[geometry.colors, 3]} />
        <bufferAttribute attach="attributes-aMagnitude" args={[geometry.magnitudes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[geometry.phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}
