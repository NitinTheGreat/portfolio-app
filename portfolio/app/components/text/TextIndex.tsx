import Link from "next/link"
import {
  profile,
  journeyPlanets,
  constellation,
  type Planet,
} from "@/lib/planets"

function PlanetEntry({ planet }: { planet: Planet }) {
  return (
    <article
      id={planet.id}
      className="border-t border-[#E8E4DC]/12 py-10 scroll-mt-24"
      style={{ ["--accent" as string]: planet.accent }}
    >
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
          {planet.name}
        </h3>
        {planet.caption ? (
          <span className="font-mono text-xs uppercase tracking-widest text-[#E8E4DC]/55">
            {planet.caption}
          </span>
        ) : null}
      </header>

      {planet.role || planet.period ? (
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[color:var(--accent)]">
          {[planet.role, planet.period].filter(Boolean).join("  ·  ")}
        </p>
      ) : null}

      <p className="mt-4 text-xl sm:text-2xl text-[#E8E4DC]/90">{planet.oneLiner}</p>

      {planet.metric ? (
        <p className="mt-2 font-mono text-sm text-[#E8E4DC]/65">{planet.metric}</p>
      ) : null}

      <p className="mt-4 max-w-2xl leading-relaxed text-[#E8E4DC]/75">{planet.summary}</p>

      {planet.chips.length ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {planet.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-[color:var(--accent)]/45 px-3 py-1 font-mono text-xs text-[#E8E4DC]/70"
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}

      {planet.links.length ? (
        <div className="mt-5 flex flex-wrap gap-4">
          {planet.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm underline underline-offset-4 hover:text-[color:var(--accent)]"
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export function TextIndex() {
  return (
    <main className="min-h-screen bg-[#04070E] text-[#E8E4DC]">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#E8E4DC] focus:px-4 focus:py-2 focus:text-[#0A0A0A]"
      >
        Skip to projects
      </a>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-[#4A8FB8]">
            Portfolio · text index
          </p>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-6 text-2xl text-[#E8E4DC]/90">{profile.pitch}</p>
          <p className="mt-2 text-lg text-[#E8E4DC]/65">{profile.status}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#E8E4DC]/70">
            {profile.education}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.cv}
              download
              className="rounded-full bg-[#E8E4DC] px-5 py-2.5 text-sm font-medium text-[#0A0A0A] hover:bg-[#4A8FB8] hover:text-[#04070E]"
            >
              Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-[#E8E4DC]/25 px-5 py-2.5 text-sm font-medium hover:border-[#4A8FB8]"
            >
              Email
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-[#E8E4DC]/25 px-5 py-2.5 text-sm font-medium hover:border-[#4A8FB8]"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-[#E8E4DC]/25 px-5 py-2.5 text-sm font-medium hover:border-[#4A8FB8]"
            >
              LinkedIn
            </a>
            <Link
              href="/"
              className="rounded-full border border-[#E8E4DC]/25 px-5 py-2.5 text-sm font-medium hover:border-[#4A8FB8]"
            >
              Take the journey ↗
            </Link>
          </div>
        </header>

        <section id="projects" className="mt-20 scroll-mt-24" aria-label="Projects">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#4A8FB8]">
            Six planets
          </h2>
          {journeyPlanets.map((planet) => (
            <PlanetEntry key={planet.id} planet={planet} />
          ))}
        </section>

        <section className="mt-20" aria-label="Other work">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#4A8FB8]">
            Constellation of other work
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {constellation.map((body) => (
              <li key={body.name} className="border-t border-[#E8E4DC]/12 pt-4">
                <h3 className="font-display text-2xl font-black tracking-tight">{body.name}</h3>
                <p className="mt-2 leading-relaxed text-[#E8E4DC]/75">{body.summary}</p>
                <p className="mt-2 font-mono text-xs text-[#E8E4DC]/50">
                  {body.tech.join(" · ")}
                </p>
                {body.live || body.code ? (
                  <div className="mt-3 flex gap-4 font-mono text-sm">
                    {body.live ? (
                      <a
                        href={body.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-4 hover:text-[#4A8FB8]"
                      >
                        Live ↗
                      </a>
                    ) : null}
                    {body.code ? (
                      <a
                        href={body.code}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-4 hover:text-[#4A8FB8]"
                      >
                        Code ↗
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-24 border-t border-[#E8E4DC]/12 pt-10">
          <h2 className="font-display text-3xl font-black tracking-tight">
            Let&apos;s build something.
          </h2>
          <p className="mt-3 text-[#E8E4DC]/70">{profile.closer}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[#E8E4DC]/65">
            <a href={`mailto:${profile.email}`} className="hover:text-[#4A8FB8]">
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-[#4A8FB8]">
              {profile.phone}
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}
