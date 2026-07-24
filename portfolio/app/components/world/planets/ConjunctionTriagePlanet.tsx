"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Html } from "@react-three/drei"
import * as satellite from "satellite.js"
import {
  Object3D,
  Vector3,
  type Group,
  type InstancedMesh,
  type ShaderMaterial,
} from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { planetById } from "@/lib/planets"
import { noise3d } from "../shaders/noise"
import { SUN_POSITION } from "../Sun"
import { Atmosphere } from "../Atmosphere"

const POSITION = planetById["conjunction-triage"].worldPosition
const RADIUS = 2.4
const DEBRIS = 200
const TIME_ACCEL = 50

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
    float craters = fbm(p * 6.0);
    float detail = fbm(p * 22.0);
    vec3 base = vec3(0.16, 0.18, 0.22) * (0.6 + 0.5 * craters);
    base *= (0.9 + 0.1 * detail);
    base *= (0.06 + 0.94 * day);
    gl_FragColor = vec4(base, 1.0);
  }
`

function DebrisRing() {
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const debris = useMemo(
    () =>
      Array.from({ length: DEBRIS }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: 3.2 + Math.random() * 1.3,
        height: (Math.random() - 0.5) * 0.5,
        spin: new Vector3().randomDirection().multiplyScalar(0.5 + Math.random()),
        scale: 0.02 + Math.random() * 0.03,
      })),
    [],
  )

  useAmbientFrame((elapsed, delta) => {
    const m = mesh.current
    if (!m) return
    for (let i = 0; i < DEBRIS; i++) {
      const d = debris[i]
      const a = d.angle + elapsed * 0.04
      dummy.position.set(Math.cos(a) * d.radius, d.height, Math.sin(a) * d.radius)
      dummy.rotation.set(
        d.spin.x * elapsed,
        d.spin.y * elapsed,
        d.spin.z * elapsed,
      )
      dummy.scale.setScalar(d.scale)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, DEBRIS]} rotation={[0.3, 0, 0.1]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#6b7480" metalness={0.4} roughness={0.6} />
    </instancedMesh>
  )
}

function ISS() {
  const group = useRef<Group>(null)
  const satrec = useRef<satellite.SatRec | null>(null)
  const label = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const dir = useMemo(() => new Vector3(), [])

  useEffect(() => {
    let cancelled = false
    fetch("/api/iss")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        try {
          satrec.current = satellite.twoline2satrec(d.line1, d.line2)
        } catch {
          satrec.current = null
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  useAmbientFrame((elapsed) => {
    const g = group.current
    if (!g || !satrec.current) return
    const date = new Date(Date.now() + elapsed * 1000 * TIME_ACCEL)
    const pv = satellite.propagate(satrec.current, date)
    const eci = pv.position
    if (!eci || typeof eci === "boolean") return
    dir.set(eci.x, eci.z, eci.y).normalize()
    g.position.copy(dir).multiplyScalar(3.5)
    g.lookAt(0, 0, 0)
    if (hovered && label.current) {
      const geo = satellite.eciToGeodetic(eci, satellite.gstime(date))
      label.current.textContent = `${satellite.degreesLat(geo.latitude).toFixed(1)}°, ${satellite.degreesLong(geo.longitude).toFixed(1)}°`
    }
  })

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = "auto"
      }}
    >
      <mesh>
        <boxGeometry args={[0.06, 0.05, 0.14]} />
        <meshStandardMaterial color="#ccd2d8" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.5, 0.015, 0.02]} />
        <meshStandardMaterial color="#aeb6be" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.16, 0.005, 0.11]} />
        <meshStandardMaterial color="#1a2340" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.16, 0.005, 0.11]} />
        <meshStandardMaterial color="#1a2340" metalness={0.3} roughness={0.5} />
      </mesh>
      {hovered ? (
        <Html position={[0, 0.18, 0]} center distanceFactor={12} zIndexRange={[8, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded bg-[#04070e]/70 px-2 py-1 font-mono text-[10px] text-[#7fd4e8]">
            ISS · <span ref={label}>—</span>
          </div>
        </Html>
      ) : null}
    </group>
  )
}

export function ConjunctionTriagePlanet() {
  const surface = useRef<ShaderMaterial>(null)
  const sunDir = useMemo(
    () => new Vector3(...SUN_POSITION).sub(new Vector3(...POSITION)).normalize(),
    [],
  )
  const uniforms = useMemo(() => ({ uSunDir: { value: sunDir } }), [sunDir])

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
        dayColor="#3ea6b8"
        terminatorColor="#4a8fb8"
        nightColor="#101b28"
        intensity={0.65}
      />
      <DebrisRing />
      <ISS />
    </group>
  )
}
