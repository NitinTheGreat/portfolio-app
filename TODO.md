# Outstanding items

Assets and links Nitin will provide. Until each lands, the site uses a
placeholder and degrades gracefully (no broken states).

## Assets

- [ ] `portfolio/public/cv/nitin-pandey-cv.pdf` — final resume PDF (target under 1MB).
      The CV modal shows a friendly "being updated" message until this exists.
- [ ] `portfolio/public/projects/dealharbor/*.webp` — 3-5 screenshots (max 1200x800)
- [ ] `portfolio/public/projects/heatagent/*.webp` — screenshots or architecture diagrams
- [ ] `portfolio/public/projects/semstream/*.webp` — system diagrams
- [ ] `portfolio/public/projects/plugfit/*.webp` — screenshots or diagrams
- [ ] `portfolio/public/projects/riviera-25/*.webp` — fest site screenshots
- [ ] `portfolio/public/projects/gravitas-25/*.webp` — fest site screenshots

Each `public/projects/<slug>/README.md` lists the expected filenames and sizes.
Carousels show a "Preview coming soon" placeholder until the images arrive.

## Links to confirm

- [ ] LinkedIn URL (currently a placeholder in `lib/planets.ts` profile.linkedin)
- [ ] Cal.com / booking URL (omitted from the contact module until provided)
- [ ] Live and repo URLs per constellation project (see `lib/constellation` data;
      the "Live" button is omitted when no URL exists)

## Nice-to-have upgrades

- [ ] Real NASA ISS model (nasa3d) reduced to ~2k tris, replacing the primitive
      ISS in `ConjunctionTriagePlanet.tsx`
- [ ] Drishti boids flock reforming into wedge / line / spiral on snap
- [ ] NASA Blue Marble textures for the hero planet and Donna (procedural fallback in use)

## Notes

- ISS live position: CelesTrak CATNR 25544 via `/api/iss` (dynamic, upstream
  fetch cached 1h, 8s timeout, bundled fallback TLE). Verified returning live
  data. Uses satellite.js v5 (v7 pulls node built-ins that will not bundle).

## Perf gate

- [ ] Mobile Lighthouse on `/` and `/text` (FCP, TTI, LCP, CLS)
- [ ] Real-phone sustained scroll fps (target 30+ mobile, 60+ desktop)
- [ ] Sanity-check quality-tier auto-detect on real devices (headless fps is noisy)
