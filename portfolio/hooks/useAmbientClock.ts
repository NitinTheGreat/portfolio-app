import { useEffect, useRef } from "react"
import { useFrame, type RootState } from "@react-three/fiber"

export type AmbientCallback = (elapsed: number, delta: number, state: RootState) => void

const subscribers = new Set<AmbientCallback>()

export function useAmbientFrame(callback: AmbientCallback) {
  const ref = useRef(callback)
  ref.current = callback

  useEffect(() => {
    const wrapper: AmbientCallback = (elapsed, delta, state) => ref.current(elapsed, delta, state)
    subscribers.add(wrapper)
    return () => {
      subscribers.delete(wrapper)
    }
  }, [])
}

export function AmbientClock() {
  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime
    for (const subscriber of subscribers) {
      subscriber(elapsed, delta, state)
    }
  })
  return null
}
