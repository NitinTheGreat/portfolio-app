# Credits and asset provenance

Every external asset used on this site is public domain or CC0. Sources are
listed here before use, per the project's asset policy.

## Current state

The 3D scene is fully procedural at this stage. No external image, texture,
model, or audio asset has been bundled yet.

- Starfield: generated in-shader (spherical Fibonacci distribution, per-star
  colour and magnitude from a position hash). No texture.
- Milky Way band: procedural noise band shader. This is the specced fallback
  for the ESA/Gaia or NASA/Goddard all-sky panorama, used because there is no
  KTX2 compression toolchain in the build environment. Intended upgrade below.
- Hero foreground planet and Aeza: procedural surface, atmosphere, and cloud
  shaders. Specced fallback for NASA Blue Marble textures.

## Intended texture and model upgrades (not yet bundled)

When these are added, downsample to the sizes noted, convert to KTX2, drop into
`portfolio/public/textures/`, and record the exact file and licence here.

- Milky Way panorama: ESA/Gaia DR2 all-sky, https://www.eso.org/public/images/eso1242a/
  or NASA/Goddard, https://svs.gsfc.nasa.gov/4851 (both public domain). Max 4096x2048.
- Blue Marble surface, clouds, night lights: NASA Visible Earth,
  https://visibleearth.nasa.gov/collection/1484/blue-marble (public domain). Max 2048x1024.
- ISS model: NASA 3D Resources, https://nasa3d.arc.nasa.gov/models (public domain).
  Reduce to ~2k triangles.

## Fonts

- Fraunces, Instrument Sans, Space Mono: served via next/font from Google Fonts,
  all under the SIL Open Font License.
