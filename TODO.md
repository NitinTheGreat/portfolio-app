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

## Perf gate

- [ ] Mobile Lighthouse on `/` and `/text` (FCP, TTI, LCP, CLS)
- [ ] Real-phone sustained scroll fps (target 30+ mobile, 60+ desktop)
