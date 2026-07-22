"use client"

import { useMemo, useRef } from "react"
import { AdditiveBlending, BackSide, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
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
  ${noise3d}
  void main() {
    vec3 p = normalize(vPos) * 3.0;
    float n = fbm(p + uTime * 0.05);
    vec3 base = vec3(1.0, 0.95, 0.85);
    vec3 amber = vec3(1.0, 0.72, 0.42);
    vec3 col = mix(base, amber, (1.0 - n) * 0.15);
    col *= (0.92 + 0.08 * n) * 3.0;
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
    float fresnelInverse = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.5);
    vec3 coronaColour = mix(vec3(1.0, 0.7, 0.4), vec3(1.0, 0.9, 0.7), fresnelInverse);
    float alpha = fresnelInverse * 0.6;
    gl_FragColor = vec4(coronaColour, alpha);
  }
`

export function Sun() {
  const core = useRef<ShaderMaterial>(null)
  const coreUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useAmbientFrame((elapsed) => {
    if (core.current) core.current.uniforms.uTime.value = elapsed
  })

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
      <mesh renderOrder={1}>
        <sphereGeometry args={[8, 64, 48]} />
        <shaderMaterial
          ref={core}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={coreUniforms}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
