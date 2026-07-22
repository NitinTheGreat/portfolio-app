"use client"

import { useEffect, useMemo, useRef } from "react"
import {
  Object3D,
  Vector3,
  type Group,
  type InstancedMesh,
  type MeshBasicMaterial,
  type ShaderMaterial,
} from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { planetById } from "@/lib/planets"
import { noise3d } from "../shaders/noise"
import { SUN_POSITION } from "../Sun"

const POSITION = planetById.iivy.worldPosition
const RADIUS = 3.2

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
  uniform float uTime;
  uniform vec3 uSunDir;
  ${noise3d}
  void main() {
    vec3 N = normalize(vWorldNormal);
    float day = clamp(dot(N, uSunDir), 0.0, 1.0);
    vec3 p = normalize(vObjPos);

    float turb = fbm(vec3(p.x * 2.5 + uTime * 0.03, p.y * 7.0, p.z * 2.5)) - 0.5;
    float v = p.y * 5.5 + turb * 1.1;
    float band = sin(v * 3.14159) * 0.5 + 0.5;

    vec3 slate = vec3(0.29, 0.37, 0.48);
    vec3 kraft = vec3(0.545, 0.435, 0.278);
    vec3 cream = vec3(0.769, 0.722, 0.588);
    vec3 col = mix(slate, kraft, band);
    float creamMask = smoothstep(0.6, 1.0, band) * fbm(vec3(p.x * 8.0 + uTime * 0.05, p.y * 24.0, p.z * 8.0));
    col = mix(col, cream, creamMask * 0.7);

    col *= (0.14 + 0.86 * day);
    gl_FragColor = vec4(col, 1.0);
  }
`

function IivyRing() {
  const ring = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const particles = useMemo(
    () =>
      Array.from({ length: 800 }, () => {
        const angle = Math.random() * Math.PI * 2
        return { angle, radius: 4.2 + Math.random() * 0.7, y: (Math.random() - 0.5) * 0.06 }
      }),
    [],
  )

  useEffect(() => {
    const mesh = ring.current
    if (!mesh) return
    particles.forEach((p, i) => {
      dummy.position.set(Math.cos(p.angle) * p.radius, p.y, Math.sin(p.angle) * p.radius)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [particles, dummy])

  useAmbientFrame((_, delta) => {
    if (ring.current) ring.current.rotation.y += delta * 0.03
  })

  return (
    <instancedMesh ref={ring} args={[undefined, undefined, 800]} rotation={[0.09, 0, 0]}>
      <sphereGeometry args={[0.02, 5, 5]} />
      <meshBasicMaterial color="#b7a98a" toneMapped={false} transparent opacity={0.8} />
    </instancedMesh>
  )
}

function IivyScaffold() {
  const orbit = useRef<Group>(null)
  const material = useRef<MeshBasicMaterial>(null)

  useAmbientFrame((elapsed, delta) => {
    const o = orbit.current
    if (o) {
      const a = elapsed * 0.15
      o.position.set(Math.cos(a) * 4.3, 0, Math.sin(a) * 4.3)
      o.rotation.y += delta * 0.4
    }
    if (material.current) {
      material.current.opacity = 0.55 + 0.4 * (0.5 + 0.5 * Math.sin(elapsed * Math.PI * 0.6))
    }
  })

  return (
    <group rotation={[0.1, 0, 0.08]}>
      <group ref={orbit}>
        <mesh>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshBasicMaterial ref={material} color="#7fd4e8" wireframe transparent toneMapped={false} />
        </mesh>
        <mesh rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshBasicMaterial color="#7fd4e8" wireframe transparent opacity={0.5} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

export function IivyPlanet() {
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
        <sphereGeometry args={[RADIUS, 64, 48]} />
        <shaderMaterial
          ref={surface}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <IivyRing />
      <IivyScaffold />
    </group>
  )
}
