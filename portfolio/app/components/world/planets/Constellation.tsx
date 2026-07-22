"use client"

import { useMemo, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import {
  AdditiveBlending,
  BackSide,
  Vector3,
  type Group,
  type Mesh,
} from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { usePortfolio } from "@/store/portfolio"
import { constellation, type ConstellationBody } from "@/lib/planets"

const haloVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const haloFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  uniform float uOpacity;
  void main() {
    float fres = pow(max(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 0.0), 1.5);
    gl_FragColor = vec4(0.42, 0.68, 0.85, fres * uOpacity);
  }
`

function hash(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 1000
  return h / 1000
}

function Asteroid({ body, near, forced }: { body: ConstellationBody; near: boolean; forced: boolean }) {
  const group = useRef<Group>(null)
  const halo = useRef<Mesh>(null)
  const camera = useThree((state) => state.camera)
  const openModal = usePortfolio((state) => state.openModal)
  const [hovered, setHovered] = useState(false)
  const active = hovered || forced
  const scale = useRef(1)
  const radius = useMemo(() => 0.45 + hash(body.slug) * 0.32, [body.slug])
  const haloUniforms = useMemo(() => ({ uOpacity: { value: 0 } }), [])
  const spin = useMemo(() => 0.12 + hash(body.slug) * 0.18, [body.slug])

  useAmbientFrame((_, delta) => {
    const g = group.current
    if (!g) return
    g.rotation.y += delta * spin
    const target = active ? 1.14 : 1
    scale.current += (target - scale.current) * Math.min(1, delta * 8)
    g.scale.setScalar(scale.current)
    const haloTarget = active ? 0.9 : 0
    haloUniforms.uOpacity.value += (haloTarget - haloUniforms.uOpacity.value) * Math.min(1, delta * 8)
    if (halo.current) halo.current.quaternion.copy(camera.quaternion)
  })

  return (
    <group
      ref={group}
      position={body.worldPosition}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = "auto"
      }}
      onClick={(e) => {
        e.stopPropagation()
        openModal("project", body.slug)
      }}
    >
      <mesh>
        <icosahedronGeometry args={[radius, 1]} />
        <meshStandardMaterial color={body.tint} flatShading roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh ref={halo} scale={1.26}>
        <sphereGeometry args={[radius, 24, 16]} />
        <shaderMaterial
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          uniforms={haloUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          side={BackSide}
          toneMapped={false}
        />
      </mesh>
      {near ? (
        <Html position={[0, radius * 2, 0]} center distanceFactor={16} zIndexRange={[8, 0]}>
          <div className="pointer-events-none select-none text-center">
            <div
              className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity duration-200 ${
                active ? "text-[#e8e4dc]" : "text-[#e8e4dc]/60"
              }`}
            >
              {body.name}
            </div>
            {active ? (
              <div className="mt-1 flex flex-wrap justify-center gap-1">
                {body.tech.slice(0, 3).map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#e8e4dc]/25 px-1.5 py-0.5 font-mono text-[9px] text-[#e8e4dc]/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </Html>
      ) : null}
    </group>
  )
}

export function Constellation({ forcedHover }: { forcedHover?: string }) {
  const camera = useThree((state) => state.camera)
  const [near, setNear] = useState(false)
  const nearRef = useRef(false)
  const centre = useMemo(() => {
    const v = new Vector3()
    constellation.forEach((b) => v.add(new Vector3(...b.worldPosition)))
    return v.multiplyScalar(1 / constellation.length)
  }, [])

  useAmbientFrame(() => {
    const isNear = camera.position.distanceTo(centre) < 52
    if (isNear !== nearRef.current) {
      nearRef.current = isNear
      setNear(isNear)
    }
  })

  return (
    <group>
      {constellation.map((body) => (
        <Asteroid
          key={body.slug}
          body={body}
          near={near || forcedHover === body.slug}
          forced={forcedHover === body.slug}
        />
      ))}
    </group>
  )
}
