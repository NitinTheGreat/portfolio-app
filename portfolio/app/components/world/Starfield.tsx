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
  attribute float aSpike;
  uniform float uTime;
  uniform float uTwinkle;
  varying vec3 vColor;
  varying float vSpike;
  varying float vBright;
  void main() {
    vColor = aColor;
    vSpike = aSpike;
    vBright = aMagnitude;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float tw = 1.0 + uTwinkle * 0.12 * step(0.45, aMagnitude) * sin(uTime * 2.0 + aPhase);
    gl_PointSize = (0.6 + aMagnitude * 5.0) * tw * (800.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vSpike;
  varying float vBright;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float disc = smoothstep(0.5, 0.0, length(c));
    float alpha = disc;
    if (vSpike > 0.5) {
      float sh = smoothstep(0.5, 0.0, abs(c.x)) * smoothstep(0.06, 0.0, abs(c.y));
      float sv = smoothstep(0.5, 0.0, abs(c.y)) * smoothstep(0.06, 0.0, abs(c.x));
      alpha += (sh + sv) * 0.5;
    }
    alpha *= vBright;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`

const WHITE: [number, number, number] = [1, 1, 1]
const BLUE: [number, number, number] = [0.72, 0.8, 1]
const YELLOW: [number, number, number] = [1, 0.92, 0.72]
const RED: [number, number, number] = [1, 0.68, 0.55]

function dimColor(): [number, number, number] {
  const r = Math.random()
  if (r < 0.7) return WHITE
  if (r < 0.9) return BLUE
  if (r < 0.98) return YELLOW
  return RED
}

function brightColor(): [number, number, number] {
  const r = Math.random()
  if (r < 0.4) return BLUE
  if (r < 0.7) return YELLOW
  if (r < 0.95) return RED
  return WHITE
}

export function Starfield() {
  const material = useRef<ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const magnitudes = new Float32Array(COUNT)
    const phases = new Float32Array(COUNT)
    const spikes = new Float32Array(COUNT)
    const golden = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      positions[i * 3] = Math.cos(theta) * r * RADIUS
      positions[i * 3 + 1] = y * RADIUS
      positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS

      const roll = Math.random()
      let magnitude: number
      let colour: [number, number, number]
      let spike = 0
      if (roll > 0.9975) {
        magnitude = 0.9 + Math.random() * 0.1
        colour = brightColor()
        spike = 1
      } else if (roll > 0.975) {
        magnitude = 0.55 + Math.random() * 0.3
        colour = brightColor()
      } else {
        const u = Math.random()
        magnitude = u * u * u * 0.5
        colour = dimColor()
      }

      colors[i * 3] = colour[0]
      colors[i * 3 + 1] = colour[1]
      colors[i * 3 + 2] = colour[2]
      magnitudes[i] = magnitude
      phases[i] = Math.random() * Math.PI * 2
      spikes[i] = spike
    }

    return { positions, colors, magnitudes, phases, spikes }
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
        <bufferAttribute attach="attributes-aSpike" args={[geometry.spikes, 1]} />
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
