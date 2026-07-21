import { planetById } from "@/lib/planets"

export function HomePlanet() {
  const home = planetById.home
  return (
    <mesh position={home.worldPosition}>
      <sphereGeometry args={[4, 48, 48]} />
      <meshToonMaterial color="#e6a15e" />
    </mesh>
  )
}
