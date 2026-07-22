"use client"

import { useMemo, useRef } from "react"
import { Color, Vector3, type Mesh, type ShaderMaterial } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { usePortfolio } from "@/store/portfolio"
import { noise3d } from "./shaders/noise"
import { SUN_POSITION } from "./Sun"
import { Atmosphere } from "./Atmosphere"

const POSITION: [number, number, number] = [-3.5, -3, -9]
const RADIUS = 6

const surfaceVertex = /* glsl */ `
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

const surfaceFragment = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  uniform vec3 uSunDir;
  uniform float uNightLights;
  ${noise3d}
  void main() {
    vec3 N = normalize(vWorldNormal);
    float sun = dot(N, uSunDir);
    float day = clamp(sun, 0.0, 1.0);
    vec3 p = normalize(vObjPos);

    float land = fbm(p * 2.5);
    float continent = smoothstep(0.48, 0.53, land);
    vec3 ocean = vec3(0.03, 0.15, 0.32);
    vec3 landCol = mix(vec3(0.15, 0.32, 0.12), vec3(0.42, 0.36, 0.2), fbm(p * 8.0));
    vec3 albedo = mix(ocean, landCol, continent);

    float lat = abs(p.y);
    albedo = mix(albedo, vec3(0.9, 0.92, 0.95), smoothstep(0.82, 0.93, lat));

    vec3 lit = albedo * (0.04 + 0.96 * day);

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 H = normalize(uSunDir + V);
    float spec = pow(max(dot(N, H), 0.0), 60.0) * (1.0 - continent) * day;
    lit += vec3(1.0, 0.95, 0.8) * spec * 0.6;

    float night = clamp(-sun * 3.0, 0.0, 1.0);
    float cities = smoothstep(0.72, 0.78, fbm(p * 16.0)) * continent;
    lit += vec3(1.0, 0.8, 0.45) * cities * night * uNightLights;

    gl_FragColor = vec4(lit, 1.0);
  }
`

const cloudVertex = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vObjPos;
  void main() {
    vObjPos = position;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const cloudFragment = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vObjPos;
  uniform vec3 uSunDir;
  ${noise3d}
  void main() {
    vec3 N = normalize(vWorldNormal);
    float day = clamp(dot(N, uSunDir), 0.0, 1.0);
    vec3 p = normalize(vObjPos);
    float cloud = smoothstep(0.55, 0.75, fbm(p * 4.0));
    vec3 col = mix(vec3(0.4, 0.45, 0.55), vec3(1.0), day);
    gl_FragColor = vec4(col, cloud * (0.15 + 0.85 * day));
  }
`

export function HeroForeground() {
  const surface = useRef<ShaderMaterial>(null)
  const clouds = useRef<Mesh>(null)

  const sunDir = useMemo(
    () => new Vector3(...SUN_POSITION).sub(new Vector3(...POSITION)).normalize(),
    [],
  )

  const surfaceUniforms = useMemo(
    () => ({ uSunDir: { value: sunDir }, uNightLights: { value: 1 } }),
    [sunDir],
  )
  const cloudUniforms = useMemo(() => ({ uSunDir: { value: sunDir } }), [sunDir])

  useAmbientFrame((_, delta) => {
    if (clouds.current) clouds.current.rotation.y += 0.002 * delta * 60
    if (surface.current) {
      surface.current.uniforms.uNightLights.value =
        usePortfolio.getState().qualityTier === "high" ? 1 : 0
    }
  })

  return (
    <group position={POSITION}>
      <mesh renderOrder={0}>
        <sphereGeometry args={[RADIUS, 64, 48]} />
        <shaderMaterial
          ref={surface}
          vertexShader={surfaceVertex}
          fragmentShader={surfaceFragment}
          uniforms={surfaceUniforms}
        />
      </mesh>
      <mesh ref={clouds} renderOrder={1}>
        <sphereGeometry args={[RADIUS * 1.003, 48, 32]} />
        <shaderMaterial
          vertexShader={cloudVertex}
          fragmentShader={cloudFragment}
          uniforms={cloudUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      <Atmosphere
        radius={RADIUS}
        planetPosition={POSITION}
        dayColor="#4a8fb8"
        terminatorColor="#e88b60"
        nightColor="#1a2e4a"
      />
    </group>
  )
}
