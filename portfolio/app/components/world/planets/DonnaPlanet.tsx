"use client"

import { useMemo, useRef } from "react"
import { Quaternion, Vector3, type Mesh, type MeshBasicMaterial, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { usePortfolio } from "@/store/portfolio"
import { planetById } from "@/lib/planets"
import { noise3d } from "../shaders/noise"
import { SUN_POSITION } from "../Sun"
import { Atmosphere } from "../Atmosphere"

const POSITION = planetById.donna.worldPosition
const RADIUS = 2.6

const vertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vObjPos;
  void main() {
    vObjPos = position;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vObjPos;
  uniform vec3 uSunDir;
  uniform float uNightLights;
  ${noise3d}
  void main() {
    vec3 N = normalize(vWorldNormal);
    float sun = dot(N, uSunDir);
    float day = clamp(sun, 0.0, 1.0);
    vec3 p = normalize(vObjPos);

    float land = fbm(p * 2.8);
    float continent = smoothstep(0.44, 0.5, land);
    vec3 ocean = vec3(0.02, 0.04, 0.08);
    vec3 landCol = mix(vec3(0.1, 0.09, 0.07), vec3(0.18, 0.14, 0.1), fbm(p * 7.0));
    vec3 albedo = mix(ocean, landCol, continent);

    vec3 lit = albedo * (0.05 + 0.5 * day);

    float night = clamp(-sun * 3.0 + 0.3, 0.0, 1.0);
    float cities = smoothstep(0.6, 0.67, fbm(p * 24.0)) * continent;
    lit += vec3(1.0, 0.74, 0.38) * cities * night * 2.0 * uNightLights;

    gl_FragColor = vec4(lit, 1.0);
  }
`

function RadioPulse() {
  const ring = useRef<Mesh>(null)
  const material = useRef<MeshBasicMaterial>(null)
  const { position, quaternion } = useMemo(() => {
    const normal = new Vector3(
      Math.cos(0.52) * Math.cos(1.0),
      Math.sin(0.52),
      Math.cos(0.52) * Math.sin(1.0),
    ).normalize()
    return {
      position: normal.clone().multiplyScalar(RADIUS * 1.01),
      quaternion: new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal),
    }
  }, [])

  useAmbientFrame((elapsed) => {
    const phase = (elapsed % 4) / 4
    if (ring.current) ring.current.scale.setScalar(0.1 + phase * 1.3)
    if (material.current) material.current.opacity = (1 - phase) * 0.7
  })

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ff9d5c" toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.5, 0.62, 40]} />
        <meshBasicMaterial ref={material} color="#e8734a" transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  )
}

export function DonnaPlanet() {
  const sunDir = useMemo(
    () => new Vector3(...SUN_POSITION).sub(new Vector3(...POSITION)).normalize(),
    [],
  )
  const uniforms = useMemo(
    () => ({ uSunDir: { value: sunDir }, uNightLights: { value: 1 } }),
    [sunDir],
  )
  const surface = useRef<ShaderMaterial>(null)

  useAmbientFrame(() => {
    if (surface.current) {
      surface.current.uniforms.uNightLights.value =
        usePortfolio.getState().qualityTier === "low" ? 0 : 1
    }
  })

  return (
    <group position={POSITION}>
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 48]} />
        <shaderMaterial
          ref={surface}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <RadioPulse />
      <Atmosphere
        radius={RADIUS}
        planetPosition={POSITION}
        dayColor="#e8a15e"
        terminatorColor="#c25b4f"
        nightColor="#2a2030"
        intensity={1.1}
      />
    </group>
  )
}
