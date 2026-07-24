"use client"

import { useEffect, useMemo, useRef } from "react"
import {
  Object3D,
  Quaternion,
  Vector3,
  type InstancedMesh,
  type ShaderMaterial,
} from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { planetById } from "@/lib/planets"
import { noise3d } from "../shaders/noise"
import { SUN_POSITION } from "../Sun"
import { Atmosphere } from "../Atmosphere"

const POSITION = planetById.drishti.worldPosition
const RADIUS = 2.2
const FLOCK = 40

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
  ${noise3d}
  void main() {
    vec3 N = normalize(vWorldNormal);
    float day = clamp(dot(N, uSunDir), 0.0, 1.0);
    vec3 p = normalize(vObjPos);

    vec3 ice = vec3(0.62, 0.68, 0.74);
    vec3 shadow = vec3(0.26, 0.32, 0.4);
    vec3 base = mix(shadow, ice, 0.15 + 0.85 * day);

    float n = fbm(p * 7.0);
    float crack = 1.0 - smoothstep(0.0, 0.03, abs(n - 0.5));
    base *= (1.0 - crack * 0.45);

    float polar = smoothstep(0.86, 1.0, p.y);
    base = mix(base, vec3(0.92, 0.55, 0.3), polar * 0.5 * (0.3 + 0.7 * day));

    gl_FragColor = vec4(base, 1.0);
  }
`

const beamVertex = /* glsl */ `
  varying float vH;
  uniform float uHeight;
  void main() {
    vH = (position.y + uHeight * 0.5) / uHeight;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const beamFragment = /* glsl */ `
  varying float vH;
  void main() {
    float a = (1.0 - vH) * 0.4;
    gl_FragColor = vec4(0.9, 0.55, 0.23, a);
  }
`

function SatelliteFlock() {
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const agents = useMemo(
    () =>
      Array.from({ length: FLOCK }, () => {
        const dir = new Vector3().randomDirection()
        return {
          pos: dir.clone().multiplyScalar(3.4 + Math.random() * 1.4),
          vel: new Vector3().randomDirection().multiplyScalar(0.6),
        }
      }),
    [],
  )
  const sep = useMemo(() => new Vector3(), [])
  const ali = useMemo(() => new Vector3(), [])
  const coh = useMemo(() => new Vector3(), [])
  const tmp = useMemo(() => new Vector3(), [])

  useAmbientFrame((_, deltaRaw) => {
    const m = mesh.current
    if (!m) return
    const delta = Math.min(deltaRaw, 0.05)
    for (let i = 0; i < FLOCK; i++) {
      const a = agents[i]
      sep.set(0, 0, 0)
      ali.set(0, 0, 0)
      coh.set(0, 0, 0)
      let count = 0
      for (let j = 0; j < FLOCK; j++) {
        if (i === j) continue
        tmp.subVectors(a.pos, agents[j].pos)
        const d = tmp.length()
        if (d > 0 && d < 1.2) sep.addScaledVector(tmp, 1 / (d * d))
        if (d < 2.6) {
          ali.add(agents[j].vel)
          coh.add(agents[j].pos)
          count++
        }
      }
      if (count > 0) {
        ali.divideScalar(count)
        coh.divideScalar(count).sub(a.pos)
      }
      const r = a.pos.length()
      tmp.copy(a.pos).normalize()
      const contain = r > 5 ? -(r - 5) : r < 3.2 ? 3.2 - r : 0
      a.vel.addScaledVector(sep, 1.6 * delta)
      a.vel.addScaledVector(ali, 0.5 * delta)
      a.vel.addScaledVector(coh, 0.5 * delta)
      a.vel.addScaledVector(tmp, contain * 2.2 * delta)
      const sp = a.vel.length()
      if (sp > 1.2) a.vel.multiplyScalar(1.2 / sp)
      else if (sp > 0 && sp < 0.45) a.vel.multiplyScalar(0.45 / sp)
      a.pos.addScaledVector(a.vel, delta)

      dummy.position.copy(a.pos)
      dummy.lookAt(tmp.copy(a.pos).add(a.vel))
      dummy.scale.setScalar(0.09)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, FLOCK]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#b8c4cc" metalness={0.4} roughness={0.5} />
    </instancedMesh>
  )
}

function WatchTower() {
  const beamHeight = 2.4
  const { position, quaternion } = useMemo(() => {
    const normal = new Vector3(0.4, 0.35, 0.85).normalize()
    return {
      position: normal.clone().multiplyScalar(RADIUS),
      quaternion: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), normal),
    }
  }, [])
  const uniforms = useMemo(() => ({ uHeight: { value: beamHeight } }), [])

  return (
    <group position={position} quaternion={quaternion}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.4, 6]} />
        <meshStandardMaterial color="#d0d6da" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color="#ffb066" toneMapped={false} />
      </mesh>
      <mesh position={[0, beamHeight * 0.5 + 0.35, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, beamHeight, 20, 1, true]} />
        <shaderMaterial
          vertexShader={beamVertex}
          fragmentShader={beamFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export function DrishtiPlanet() {
  const surface = useRef<ShaderMaterial>(null)
  const sunDir = useMemo(
    () => new Vector3(...SUN_POSITION).sub(new Vector3(...POSITION)).normalize(),
    [],
  )
  const uniforms = useMemo(() => ({ uSunDir: { value: sunDir } }), [sunDir])

  useEffect(() => {
    if (surface.current) surface.current.uniforms.uSunDir.value = sunDir
  }, [sunDir])

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
      <Atmosphere
        radius={RADIUS}
        planetPosition={POSITION}
        dayColor="#8aa5b0"
        terminatorColor="#9fb0b8"
        nightColor="#20303a"
        intensity={0.7}
      />
      <SatelliteFlock />
      <WatchTower />
    </group>
  )
}
