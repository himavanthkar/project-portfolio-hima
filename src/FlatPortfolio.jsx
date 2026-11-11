import { content } from "./content.js";

const RESUME_PDF = `${import.meta.env.BASE_URL}Himavanth_Karpurapu_Resume.pdf`;
const RESUME_FILE = "Himavanth_Karpurapu_Resume.pdf";

// The "view everything at once" page - a classic scrollable résumé for anyone who'd
// This is the primary site, served at the root. The 3D "Roblox" world lives at #roblox.
export default function FlatPortfolio() {
  return (
    <div className="flat">
      <div className="flat-topbar">
        <a className="flat-back" href="#roblox">🎮 Go to a Roblox version of my résumé →</a>
        <a className="flat-download" href={RESUME_PDF} download={RESUME_FILE}>⬇ Download PDF</a>
      </div>

      <header className="flat-hero">
        <h1>{content.name}<span className="dot">.</span></h1>
        <div className="flat-role">{content.role}</div>
        <p className="flat-tagline">{content.tagline}</p>
        <div className="flat-links">
          <a className="btn" href={RESUME_PDF} download={RESUME_FILE}>⬇ Download résumé (PDF)</a>
          <a className="btn ghost" href={`mailto:${content.email}`}>{content.email}</a>
          {content.links.filter((l) => l.url && l.url !== "#").map((l) => (
            <a className="btn ghost" key={l.label} href={l.url} target="_blank" rel="noopener">{l.label}</a>
          ))}
        </div>
      </header>

      <section className="flat-sec">
        <h2>About</h2>
        <div className="flat-about">
          <div>{content.about.body.map((p, i) => <p key={i}>{p}</p>)}</div>
          <div className="flat-facts">
            {content.about.facts.map((f) => (
              <div className="fact" key={f.label}><div className="label">{f.label}</div><div className="value">{f.value}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="flat-sec">
        <h2>Recognition</h2>
        <div className="flat-awards">
          {content.awards.map((a) => (
            <div className="award" key={a.title}><span className="medal">★</span><div><b>{a.title}</b><div className="sub">{a.sub}</div></div></div>
          ))}
        </div>
      </section>

      <section className="flat-sec">
        <h2>Experience</h2>
        <div className="flat-exp">
          {content.experience.map((e) => (
            <div className="exp" key={e.org + e.role}>
              <div className="exp-head"><h3>{e.role} · {e.org}</h3><span>{e.period}</span></div>
              <div className="sub">{e.meta}</div>
              <ul>{e.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="flat-sec">
        <h2>Selected work</h2>
        <div className="flat-projects">
          {content.projects.map((p) => (
            <article className="project" key={p.title}>
              {p.award && <span className="pill">{p.award}</span>}
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <div className="chips">{p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              {p.url && p.url !== "#" && <a className="go" href={p.url} target="_blank" rel="noopener">View on GitHub →</a>}
            </article>
          ))}
        </div>
      </section>

      <section className="flat-sec">
        <h2>Toolbox</h2>
        <div className="flat-skills">
          {content.skills.map((g) => (
            <div className="skill-group" key={g.group}>
              <div className="skill-label">{g.group}</div>
              <div className="chips">{g.items.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="flat-sec flat-contact">
        <h2>Let's build something<span className="dot">.</span></h2>
        <p>Have a role, an idea, or just want to talk shop? My inbox is open.</p>
        <a className="mailto" href={`mailto:${content.email}`}>{content.email}</a>
        <div style={{ marginTop: "1rem" }}>
          <a className="btn ghost" href="#roblox">🎮 Explore it as a Roblox 3D world instead →</a>
        </div>
      </section>

      <footer className="flat-footer">© {new Date().getFullYear()} {content.name} · Built with React Three Fiber</footer>
    </div>
  );
}
