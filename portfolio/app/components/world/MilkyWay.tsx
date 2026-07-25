"use client"

import { useEffect, useRef, useState } from "react"
import {
  AdditiveBlending,
  BackSide,
  LinearFilter,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
  TextureLoader,
  type MeshBasicMaterial,
  type Texture,
} from "three"
import { useThree } from "@react-three/fiber"
import gsap from "gsap"

export function MilkyWay() {
  const gl = useThree((state) => state.gl)
  const material = useRef<MeshBasicMaterial>(null)
  const [texture, setTexture] = useState<Texture | null>(null)

  useEffect(() => {
    let cancelled = false
    new TextureLoader().load("/textures/milky-way.jpg", (tex) => {
      if (cancelled) return
      tex.colorSpace = SRGBColorSpace
      tex.magFilter = LinearFilter
      tex.minFilter = LinearMipmapLinearFilter
      tex.anisotropy = gl.capabilities.getMaxAnisotropy()
      setTexture(tex)
    })
    return () => {
      cancelled = true
    }
  }, [gl])

  useEffect(() => {
    if (!texture || !material.current) return
    const tween = gsap.to(material.current, { opacity: 1, duration: 0.8, ease: "power2.out" })
    return () => {
      tween.kill()
    }
  }, [texture])

  if (!texture) return null

  return (
    <mesh frustumCulled={false} rotation={[0.15, 1.3, 0.4]}>
      <sphereGeometry args={[480, 64, 32]} />
      <meshBasicMaterial
        ref={material}
        map={texture}
        color="#5a5c60"
        side={BackSide}
        transparent
        opacity={0}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  )
}
