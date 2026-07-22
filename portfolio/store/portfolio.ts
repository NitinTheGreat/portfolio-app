import { create } from "zustand"
import type { PlanetId } from "@/lib/planets"

export type QualityTier = "high" | "medium" | "low"
export type ModalId = "cv" | "contact" | "project"

type Cursor = { x: number; y: number }

export type PortfolioState = {
  currentPlanet: PlanetId
  scrollProgress: number
  soundEnabled: boolean
  reducedMotion: boolean
  qualityTier: QualityTier
  qualityOverridden: boolean
  cursor: Cursor
  activeModal: ModalId | null
  activeProjectSlug: string | null
  setPlanet: (id: PlanetId) => void
  setScrollProgress: (value: number) => void
  setSound: (enabled: boolean) => void
  setReducedMotion: (value: boolean) => void
  setQuality: (tier: QualityTier, overridden?: boolean) => void
  setCursor: (cursor: Cursor) => void
  openModal: (id: ModalId, projectSlug?: string | null) => void
  closeModal: () => void
}

export const usePortfolio = create<PortfolioState>((set) => ({
  currentPlanet: "home",
  scrollProgress: 0,
  soundEnabled: false,
  reducedMotion: false,
  qualityTier: "high",
  qualityOverridden: false,
  cursor: { x: 0, y: 0 },
  activeModal: null,
  activeProjectSlug: null,
  setPlanet: (id) => set({ currentPlanet: id }),
  setScrollProgress: (value) => set({ scrollProgress: value }),
  setSound: (enabled) => set({ soundEnabled: enabled }),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setQuality: (tier, overridden = true) => set({ qualityTier: tier, qualityOverridden: overridden }),
  setCursor: (cursor) => set({ cursor }),
  openModal: (id, projectSlug = null) => set({ activeModal: id, activeProjectSlug: projectSlug }),
  closeModal: () => set({ activeModal: null, activeProjectSlug: null }),
}))
