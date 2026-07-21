"use client"

import { useMemo, useRef } from "react"
import { AdditiveBlending, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { noise3d } from "./shaders/noise"

export const SUN_POSITION: [number, number, number] = [45, 12, -20]

const surfaceVertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const surfaceFragment = /* glsl */ `
  varying vec3 vPos;
  uniform float uTime;
  ${noise3d}
  void main() {
    vec3 p = normalize(vPos) * 3.0;
    vec3 warp = vec3(
      fbm(p + uTime * 0.05),
      fbm(p + vec3(5.2, 1.3, 2.7) + uTime * 0.04),
      fbm(p + vec3(1.7, 9.2, 3.1))
    );
    float f = fbm(p + warp * 2.2 + uTime * 0.03);
    vec3 cool = vec3(0.85, 0.35, 0.12);
    vec3 mid = vec3(1.0, 0.72, 0.30);
    vec3 hot = vec3(1.0, 0.95, 0.75);
    vec3 col = mix(cool, mid, smoothstep(0.2, 0.5, f));
    col = mix(col, hot, smoothstep(0.5, 0.9, f));
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
    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.5);
    gl_FragColor = vec4(vec3(1.0, 0.85, 0.66) * fres, fres * 0.7);
  }
`

export function Sun() {
  const surface = useRef<ShaderMaterial>(null)
  const surfaceUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useAmbientFrame((elapsed) => {
    if (surface.current) surface.current.uniforms.uTime.value = elapsed
  })

  return (
    <group position={SUN_POSITION}>
      <directionalLight position={[0, 0, 0]} intensity={2.4} color="#ffd9a8" />
      <mesh>
        <sphereGeometry args={[8, 64, 48]} />
        <shaderMaterial
          ref={surface}
          vertexShader={surfaceVertex}
          fragmentShader={surfaceFragment}
          uniforms={surfaceUniforms}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[11, 48, 32]} />
        <shaderMaterial
          vertexShader={coronaVertex}
          fragmentShader={coronaFragment}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
