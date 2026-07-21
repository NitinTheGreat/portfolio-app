"use client"

import { useMemo, useRef } from "react"
import { AdditiveBlending, BackSide, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { noise3d } from "./shaders/noise"

const vertexShader = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vDir;
  uniform float uTime;
  ${noise3d}
  void main() {
    vec3 dir = normalize(vDir);
    vec3 planeNormal = normalize(vec3(0.0, 0.87, 0.5));
    float lat = dot(dir, planeNormal);
    float band = exp(-lat * lat * 20.0);
    float clouds = fbm(dir * 6.0 + uTime * 0.005);
    float dust = fbm(dir * 15.0);
    float intensity = band * (0.3 + 0.7 * clouds) * smoothstep(0.15, 0.85, dust);
    vec3 core = vec3(1.0, 0.95, 0.86);
    vec3 edge = vec3(0.46, 0.6, 0.86);
    vec3 col = mix(edge, core, band);
    gl_FragColor = vec4(col * intensity, intensity * 0.9);
  }
`

export function MilkyWay() {
  const material = useRef<ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useAmbientFrame((elapsed) => {
    if (material.current) material.current.uniforms.uTime.value = elapsed
  })

  return (
    <mesh frustumCulled={false}>
      <sphereGeometry args={[480, 64, 32]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={BackSide}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  )
}
