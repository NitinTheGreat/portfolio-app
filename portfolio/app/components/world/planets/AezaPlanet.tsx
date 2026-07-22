"use client"

import { useMemo, useRef } from "react"
import { Vector3, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { planetById } from "@/lib/planets"
import { noise3d } from "../shaders/noise"
import { SUN_POSITION } from "../Sun"
import { Atmosphere } from "../Atmosphere"

const POSITION = planetById.aeza.worldPosition
const RADIUS = 2.4

const vertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  void main() {
    vObjPos = position;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  uniform float uTime;
  uniform vec3 uSunDir;
  ${noise3d}
  void main() {
    vec3 N = normalize(vWorldNormal);
    float sun = dot(N, uSunDir);
    float day = clamp(sun, 0.0, 1.0);
    vec3 p = normalize(vObjPos);

    float lat = abs(p.y);
    vec3 teal = vec3(0.227, 0.420, 0.486);
    vec3 rose = vec3(0.847, 0.510, 0.620);
    vec3 base = mix(teal, rose, smoothstep(0.0, 1.0, lat));

    float caust = fbm(p * 9.0 + uTime * 0.05) * 0.5 + fbm(p * 18.0 - uTime * 0.03) * 0.5;
    caust = smoothstep(0.55, 0.8, caust) * day * 0.08;

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 H = normalize(uSunDir + V);
    float spec = pow(max(dot(N, H), 0.0), 140.0) * day;

    vec3 lit = base * (0.08 + 0.92 * day);
    lit += vec3(0.85, 0.95, 1.0) * caust;
    lit += vec3(1.0, 0.96, 0.88) * spec * 1.1;

    gl_FragColor = vec4(lit, 1.0);
  }
`

export function AezaPlanet() {
  const surface = useRef<ShaderMaterial>(null)

  const uniforms = useMemo(() => {
    const sunDir = new Vector3(...SUN_POSITION).sub(new Vector3(...POSITION)).normalize()
    return { uTime: { value: 0 }, uSunDir: { value: sunDir } }
  }, [])

  useAmbientFrame((elapsed) => {
    if (surface.current) surface.current.uniforms.uTime.value = elapsed
  })

  return (
    <group position={POSITION}>
      <mesh>
        <sphereGeometry args={[RADIUS, 48, 32]} />
        <shaderMaterial
          ref={surface}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <Atmosphere
        radius={RADIUS}
        planetPosition={POSITION}
        dayColor="#d8829e"
        terminatorColor="#f4c4d0"
        nightColor="#1a1a3a"
      />
    </group>
  )
}
