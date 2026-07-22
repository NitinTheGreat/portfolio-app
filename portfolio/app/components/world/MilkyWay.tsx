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
    float coreDist = distance(vUv, vec2(0.3, 0.5));
    float coreKnot = exp(-pow(coreDist / 0.12, 2.0));

    float arms = fbm(dir * 4.0 + uTime * 0.004);
    float L = band * (0.35 + 0.65 * arms);

    float starN = fbm(dir * 200.0);
    float starPin = smoothstep(0.85, 0.9, starN) * band;
    L += starPin * 4.0;

    float dust = fbm(vec3(vUv.x * 8.0, vUv.y * 60.0, 5.0));
    float dustMask = smoothstep(0.5, 0.75, dust);
    L *= mix(1.0, 0.5, dustMask);

    L *= 1.0 + 2.5 * coreKnot;

    vec3 coreCol = vec3(1.0, 0.82, 0.55);
    vec3 midCol = vec3(0.95, 0.88, 0.72);
    vec3 outerCol = vec3(0.75, 0.82, 1.0);
    float cd = clamp(coreDist / 0.6, 0.0, 1.0);
    vec3 col = mix(coreCol, midCol, smoothstep(0.0, 0.5, cd));
    col = mix(col, outerCol, smoothstep(0.5, 1.0, cd));

    vec3 outCol = col * L + vec3(1.0, 0.96, 0.9) * starPin * 2.0;
    outCol *= 0.6;
    gl_FragColor = vec4(outCol, 1.0);
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
