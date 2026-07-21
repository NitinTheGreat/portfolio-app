"use client"

import { useMemo, useRef } from "react"
import { AdditiveBlending, BackSide, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { noise3d } from "./shaders/noise"

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vDir;
  void main() {
    vUv = uv;
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vDir;
  uniform float uTime;
  ${noise3d}
  void main() {
    vec3 dir = normalize(vDir);

    float band = exp(-pow((vUv.y - 0.5) / 0.15, 2.0));
    float coreLon = exp(-pow((vUv.x - 0.3) / 0.2, 2.0));
    float coreBias = pow(1.0 - abs(vUv.y - 0.5) / 0.5, 2.0);

    float arms = fbm(dir * 4.0 + uTime * 0.004);
    float dust = fbm(dir * 8.0 + vec3(19.3, 7.7, 2.1));
    float dustMask = smoothstep(0.52, 0.74, dust);

    float brightness = band * coreBias * (0.35 + 0.65 * arms);
    brightness *= mix(1.0, 0.28, dustMask);
    brightness *= 1.0 + 1.5 * coreLon;

    vec3 coreCol = vec3(1.0, 0.85, 0.6);
    vec3 midCol = vec3(0.94, 0.93, 0.9);
    vec3 outerCol = vec3(0.78, 0.84, 1.0);
    vec3 col = mix(outerCol, midCol, band);
    col = mix(col, coreCol, coreLon * band);

    float starN = fbm(dir * 42.0);
    float stars = smoothstep(0.8, 0.84, starN) * band;

    float intensity = brightness * 0.6;
    vec3 outCol = col * intensity + midCol * stars * 0.9;
    gl_FragColor = vec4(outCol, clamp(intensity + stars * 0.9, 0.0, 1.0));
  }
`

export function MilkyWay() {
  const material = useRef<ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useAmbientFrame((elapsed) => {
    if (material.current) material.current.uniforms.uTime.value = elapsed
  })

  return (
    <mesh frustumCulled={false} rotation={[0.35, 0.6, 0.5]}>
      <sphereGeometry args={[480, 96, 48]} />
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
