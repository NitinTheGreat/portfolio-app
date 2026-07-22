# Credits and asset provenance

Every external asset used on this site is public domain or CC0. Sources are
listed here before use, per the project's asset policy.

## Milky Way panorama

ESO/S. Brunier — https://www.eso.org/public/images/eso0932a/
Licensed CC BY 4.0.
Downsampled to 4096x2048 and recompressed to JPG (~750KB), stored at
`portfolio/public/textures/milky-way.jpg`.

## Current state

Aside from the Milky Way panorama above, the 3D scene is procedural.

- Starfield: generated in-shader (spherical Fibonacci distribution, per-star
  colour and magnitude from a position hash). No texture.
- Sun, hero foreground planet and Aeza: procedural surface, atmosphere, and
  cloud shaders. Specced fallback for NASA Blue Marble textures.

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
