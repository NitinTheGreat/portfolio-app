"use client"

import { useMemo } from "react"
import { Color, Vector3 } from "three"
import { SUN_POSITION } from "./Sun"

const vertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  uniform vec3 uSunDir;
  uniform vec3 uDayColor;
  uniform vec3 uTermColor;
  uniform vec3 uNightColor;
  uniform float uIntensity;
  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    float sun = dot(N, uSunDir);
    float day = smoothstep(0.1, 0.6, sun);
    vec3 col = mix(uNightColor, uTermColor, smoothstep(-0.25, 0.12, sun));
    col = mix(col, uDayColor, day);
    float alpha = fres * mix(0.15, 1.0, day) * uIntensity;
    gl_FragColor = vec4(col, alpha);
  }
`

type AtmosphereProps = {
  radius: number
  planetPosition: [number, number, number]
  dayColor: string
  terminatorColor: string
  nightColor: string
  intensity?: number
}

export function Atmosphere({
  radius,
  planetPosition,
  dayColor,
  terminatorColor,
  nightColor,
  intensity = 1,
}: AtmosphereProps) {
  const uniforms = useMemo(() => {
    const sunDir = new Vector3(...SUN_POSITION).sub(new Vector3(...planetPosition)).normalize()
    return {
      uSunDir: { value: sunDir },
      uDayColor: { value: new Color(dayColor) },
      uTermColor: { value: new Color(terminatorColor) },
      uNightColor: { value: new Color(nightColor) },
      uIntensity: { value: intensity },
    }
  }, [planetPosition, dayColor, terminatorColor, nightColor, intensity])

  return (
    <mesh renderOrder={2}>
      <sphereGeometry args={[radius * 1.03, 48, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
