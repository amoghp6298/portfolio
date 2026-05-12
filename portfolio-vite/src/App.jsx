import { useState, useEffect, useRef } from "react";
import { PHOTO } from "./photo.js";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#career", label: "Career" },
  { href: "#education", label: "Education" },
  { href: "#side-projects", label: "Side projects" },
  { href: "#personal", label: "Outside work" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 60,
        background: "rgba(250,249,247,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(28,25,23,0.1)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem",
      }}>
        <a href="#hero" style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", fontWeight: 600, color: "#1c1917", textDecoration: "none" }}>
          Amogh Pachpor
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "1.75rem", listStyle: "none" }} className="desk-nav">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{ fontSize: "0.85rem", fontWeight: 500, color: "#78716c", textDecoration: "none" }}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)} className="ham-btn" aria-label="Menu"
          style={{ display: "none", flexDirection: "column", justifyContent: "center", gap: 5, width: 28, height: 28, cursor: "pointer", background: "none", border: "none", padding: 0 }}>
          <span style={{ display: "block", width: 22, height: 2, background: "#1c1917", borderRadius: 2, transition: "transform 0.25s, opacity 0.25s", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#1c1917", borderRadius: 2, transition: "opacity 0.25s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#1c1917", borderRadius: 2, transition: "transform 0.25s", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul style={{
          position: "fixed", top: 60, left: 0, right: 0, bottom: 0,
          background: "#faf9f7", zIndex: 999,
          display: "flex", flexDirection: "column",
          listStyle: "none", padding: "1rem 2rem", overflowY: "auto",
        }}>
          {NAV_LINKS.map(l => (
            <li key={l.href} style={{ borderBottom: "1px solid rgba(28,25,23,0.1)" }}>
              <a href={l.href} onClick={close} style={{ display: "block", padding: "1rem 0", fontSize: "1.1rem", fontWeight: 500, color: "#1c1917", textDecoration: "none" }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @media (max-width: 600px) {
          .desk-nav { display: none !important; }
          .ham-btn { display: flex !important; }
          .wrap { padding: 0 1.25rem !important; }
          .career-header { flex-direction: column !important; gap: 0.1rem !important; }
          .also-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const c = {
  bg: "#faf9f7", text: "#1c1917", muted: "#78716c", dim: "#a8a29e",
  accent: "#1e3050", border: "rgba(28,25,23,0.1)", border2: "rgba(28,25,23,0.18)",
  live: "#2d6a4f", wip: "#92400e", shipped: "#44403c",
};

const section = { padding: "5rem 0", borderTop: `1px solid ${c.border}` };
const wrap = { maxWidth: 740, margin: "0 auto", padding: "0 2rem" };
const secTitle = { fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: c.text, marginBottom: "2rem" };
const coLink = { color: "inherit", textDecoration: "none", borderBottom: `1px solid ${c.border2}` };

function Status({ s }) {
  const col = s === "Live" ? c.live : s === "Building" ? c.wip : c.shipped;
  return <span style={{ fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: col }}>{s}</span>;
}

function Case({ name, status, meta, blocks, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : "3.5rem", paddingBottom: last ? 0 : "3.5rem", borderBottom: last ? "none" : `1px solid ${c.border}` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.875rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.45rem", fontWeight: 600, letterSpacing: "-0.02em" }}>{name}</span>
        <Status s={status} />
      </div>
      <div style={{ fontSize: "0.82rem", color: c.dim, marginBottom: "1.5rem", fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: meta }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {blocks.map((b, i) => (
          <div key={i} style={{ paddingLeft: "1.25rem", borderLeft: `2px solid ${c.border2}` }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: c.dim, marginBottom: "0.3rem" }}>{b.label}</div>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.72, margin: 0 }} dangerouslySetInnerHTML={{ __html: b.text }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: c.bg, color: c.text, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 17, lineHeight: 1.75, WebkitFontSmoothing: "antialiased" }}>
      <Nav />

      {/* HERO */}
      <section id="hero" style={{ padding: "calc(60px + 5rem) 0 5rem" }}>
        <div className="wrap" style={wrap}>
          <FadeIn>
            <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", marginBottom: "2rem", border: `2px solid ${c.border2}` }}>
              <img src={PHOTO} alt="Amogh Pachpor" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
          </FadeIn>
          <FadeIn delay={55}><h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>Amogh Pachpor</h1></FadeIn>
          <FadeIn delay={110}><p style={{ fontSize: "1rem", color: c.muted, marginBottom: "0.75rem" }}>Product Manager at <a href="https://hyperface.co" target="_blank" style={coLink}>Hyperface</a> · 5+ years · Bengaluru</p></FadeIn>
          <FadeIn delay={165}><p style={{ fontSize: "1.05rem", maxWidth: 500, lineHeight: 1.72, marginBottom: "1.5rem" }}>I want to build the right things and be genuinely useful — across product, strategy, or wherever the work needs me. I learn fast and I always show up.</p></FadeIn>
          <FadeIn delay={220}><p style={{ fontSize: "0.82rem", color: c.dim, marginBottom: "2rem", fontWeight: 500 }}>Open to: <span style={{ color: c.accent, fontWeight: 600 }}>PM (AI / Fintech)</span> &nbsp;·&nbsp; <span style={{ color: c.accent, fontWeight: 600 }}>Founder's Office</span> &nbsp;·&nbsp; <span style={{ color: c.accent, fontWeight: 600 }}>Chief of Staff</span></p></FadeIn>
          <FadeIn delay={275}>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              {[["mailto:amoghp6298@gmail.com","Email →"],["https://linkedin.com/in/amogh-pachpor","LinkedIn →"],["tel:+918296774472","+91 82967 74472"]].map(([href,label]) => (
                <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} style={{ color: c.accent, textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>{label}</a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={section}>
        <div className="wrap" style={wrap}>
          <FadeIn><h2 style={secTitle}>About</h2></FadeIn>
          {[
            `I started my career in <strong><a href="https://sprinklr.com" target="_blank" style="color:inherit;border-bottom:1px solid rgba(28,25,23,0.18)">machine learning at Sprinklr</a></strong> — training AI chatbots for Microsoft and Lenovo, owning the full lifecycle from data collection to production go-live. That grounding gave me something most PMs don't have: a real understanding of what's under the hood.`,
            `From there I moved into product at <strong><a href="https://masaischool.com" target="_blank" style="color:inherit;border-bottom:1px solid rgba(28,25,23,0.18)">Masai School</a></strong>, where I learned to move fast and own outcomes end-to-end. I shipped tools that cut assessment costs by 70%, took interview attendance from 6% to 52%, and saved over 200 person-hours a month.`,
            `Today I lead the AI Labs front at <strong><a href="https://hyperface.co" target="_blank" style="color:inherit;border-bottom:1px solid rgba(28,25,23,0.18)">Hyperface</a></strong> — building voice agents, multi-agent campaign systems, and fintech SaaS products live with PSU banks, co-brands, and startups across India.`,
            `I'm built for environments that move fast and reward people who show up and figure things out. Whether that's owning a product, running a cross-functional initiative, or being the person a founder trusts to get things done — <strong>I want to be in the room where it matters.</strong>`,
          ].map((p, i) => <FadeIn key={i} delay={i * 55}><p style={{ fontSize: "1.025rem", lineHeight: 1.82, marginBottom: "1.4rem" }} dangerouslySetInnerHTML={{ __html: p }} /></FadeIn>)}
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={section}>
        <div className="wrap" style={wrap}>
          <FadeIn><h2 style={secTitle}>Work I'm proud of</h2></FadeIn>
          <FadeIn delay={55}><Case name="HyperAgent" status="Live" meta={`<a href="https://hyperface.co" target="_blank" style="color:inherit;border-bottom:1px solid rgba(28,25,23,0.18)">Hyperface</a> · AI Labs · 2024–Present`} blocks={[
            { label: "The Problem", text: "Fintechs and banks want to build AI agents — for customer conversations, decision workflows, lead qualification, collections — but engineering these from scratch is expensive and slow." },
            { label: "What I Built", text: "A DIY AI agent builder purpose-built for fintech — partners configure and deploy agents for any use case, embedding them across any surface: a chatbot, a decision agent, an IVR, a PWA, or a CRM workflow. Each agent gets a role, tools, a knowledge base, guardrails, and a prompt — no code required." },
            { label: "Where It Is", text: "Voice AI is live with a fintech client in Hindi, with issuers in active discussion across multiple use cases." },
          ]} /></FadeIn>
          <FadeIn delay={110}><Case name="Campaign Co-Pilot" status="Building" meta={`<a href="https://hyperface.co" target="_blank" style="color:inherit;border-bottom:1px solid rgba(28,25,23,0.18)">Hyperface</a> · AI Labs · 2025–Present`} blocks={[
            { label: "The Problem", text: "Banks run campaigns on fixed calendars. Strategies don't adapt; new banks lack historical data; there's no feedback loop making each campaign smarter than the last." },
            { label: "The Architecture", text: "Five layers: common fintech knowledge base, issuer context, campaign learning, behavioural profile (90-day decay), and live data. Key insight: <strong>generate intelligent strategy without relying on historical bank data</strong>. A chat co-pilot lets campaign heads refine in real time." },
            { label: "The Bet", text: "Every campaign feeds a compounding intelligence layer — making the next strategy incrementally better." },
          ]} /></FadeIn>
          <FadeIn delay={165}><Case name="LevelUp" status="Shipped" meta={`<a href="https://masaischool.com" target="_blank" style="color:inherit;border-bottom:1px solid rgba(28,25,23,0.18)">Masai School</a> · Product · 2022–2024`} blocks={[
            { label: "The Problem", text: "Interview attendance sat at 6%. Recruiter visibility was low, scheduling was chaotic, and students weren't showing up." },
            { label: "What I Did", text: "Rebuilt onboarding, introduced mock interview sessions, redesigned scheduling. Launched with <strong>500+ job seekers and 30+ hiring partners</strong> at an offline event." },
            { label: "What Changed", text: "Interview attendance went from <strong>6% to 52%</strong>. Scheduling efficiency improved by 22%." },
          ]} last /></FadeIn>

          <FadeIn delay={220}>
            <div style={{ marginTop: "3.5rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: c.dim, marginBottom: "1.25rem" }}>More things I've shipped</div>
              {[
                { name: "Smart Nudges", co: "Hyperface", desc: "Personalised campaign engine · Live with 4+ banks including PSU banks", metric: "5M+ customers" },
                { name: "OnboardIQ", co: "Hyperface", desc: "No-code credit card onboarding configurator · TAT reduced from 5–6 months to 4–6 weeks", metric: "7+ issuers" },
                { name: "Assess", co: "Masai School", desc: "In-house assessment tool · Replaced costly third-party tools", metric: "70% cost cut" },
                { name: "Upwards", co: "Masai School", desc: "Internal placement tracker with recommendation engine", metric: "200+ hrs/mo saved" },
              ].map((item, i) => (
                <div key={i} className="also-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "baseline", padding: "0.875rem 0", borderBottom: i < 3 ? `1px solid ${c.border}` : "none" }}>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.1rem" }}>{item.name}</div>
                    <div style={{ fontSize: "0.78rem", color: c.dim, fontWeight: 500, marginBottom: "0.15rem" }}>{item.co}</div>
                    <div style={{ fontSize: "0.85rem", color: c.muted, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: c.accent, whiteSpace: "nowrap" }}>{item.metric}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CAREER */}
      <section id="career" style={section}>
        <div className="wrap" style={wrap}>
          <FadeIn><h2 style={secTitle}>Career</h2></FadeIn>
          {[
            { co: "Hyperface", url: "https://hyperface.co", dates: "Apr 2024 – Present", role: "Product Manager, AI Labs", desc: "Leading AI Labs — building HyperAgent and a multi-agent campaign co-pilot, alongside SaaS platform products live with PSU banks and co-brands. Recognised as <strong>Hyperface Hero, Q3 FY25</strong> — Aiming Big." },
            { co: "Masai School", url: "https://masaischool.com", dates: "Jan 2022 – Mar 2024", role: "Product Manager", desc: "Owned product across the full student lifecycle. Shipped LevelUp, Assess, and Upwards. Recognised as <strong>Top Performer, H1 FY22</strong> and <strong>Cultural Ambassador</strong>." },
            { co: "Sprinklr", url: "https://sprinklr.com", dates: "Sep 2020 – Dec 2021", role: "Senior Associate, ML Services", desc: "End-to-end AI chatbot implementations for Microsoft and Lenovo. 87% avg model accuracy. Reduced time-to-market by 30%." },
          ].map((j, i) => (
            <FadeIn key={i} delay={i * 55}>
              <div style={{ marginBottom: i < 2 ? "2.5rem" : 0 }}>
                <div className="career-header" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.1rem", fontWeight: 600 }}><a href={j.url} target="_blank" style={coLink}>{j.co}</a></span>
                  <span style={{ fontSize: "0.82rem", color: c.dim, fontWeight: 500 }}>{j.dates}</span>
                </div>
                <div style={{ fontSize: "0.875rem", color: c.muted, fontWeight: 500, marginBottom: "0.5rem" }}>{j.role}</div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.72, margin: 0 }} dangerouslySetInnerHTML={{ __html: j.desc }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={section}>
        <div className="wrap" style={wrap}>
          <FadeIn><h2 style={secTitle}>Education</h2></FadeIn>
          {[
            { co: "PES University", dates: "2016 – 2020", role: "B.Tech, ECE · GPA 7.7/10", desc: "Best Project Award, Centre for Innovation & Entrepreneurship. CSR Club, Photography Club (Pixels), Literature Club (Write Angle)." },
            { co: "Stoa School", dates: "2021", role: "MBA Bootcamp", desc: "1st place, Uber India Strategic Expansion case study competition." },
          ].map((e, i) => (
            <FadeIn key={i} delay={i * 55}>
              <div style={{ marginBottom: i < 1 ? "2.5rem" : 0 }}>
                <div className="career-header" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.1rem", fontWeight: 600 }}>{e.co}</span>
                  <span style={{ fontSize: "0.82rem", color: c.dim, fontWeight: 500 }}>{e.dates}</span>
                </div>
                <div style={{ fontSize: "0.875rem", color: c.muted, fontWeight: 500, marginBottom: "0.5rem" }}>{e.role}</div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.72, margin: 0 }}>{e.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SIDE PROJECTS */}
      <section id="side-projects" style={section}>
        <div className="wrap" style={wrap}>
          <FadeIn><h2 style={secTitle}>Building on the side</h2></FadeIn>
          <FadeIn delay={55}><Case name="PaceIQ" status="Live" meta="Personal project · React + Vite · FastAPI · Claude Vision · 2026" blocks={[
            { label: "The Problem", text: "Built for runners who track everything but understand nothing from their data. You finish a run, your watch shows 47 metrics, and you still don't know if the session helped." },
            { label: "What It Does", text: "Upload your splits screenshot and paste your training plan. PaceIQ analyses actual vs planned pace, heart rate zones, and interval execution — then gives a personalised breakdown specific to your profile: age, weight, city, altitude, shoe mileage, target races." },
            { label: "Stack", text: "React + Vite frontend · FastAPI backend · SQLite · Claude Vision API" },
          ]} /></FadeIn>
          <FadeIn delay={110}><Case name="Calorie Tracker" status="Live" meta="Personal project · Claude + Notion API · 2026" blocks={[
            { label: "The Problem", text: "Training for a half marathon while hitting a weight goal. Every calorie app died within a week — none fit how I actually eat or train." },
            { label: "What I Built", text: "Describe or photograph a meal — Claude identifies it, looks up nutrition data, logs to Notion automatically. Targets adapt by day type: rest 1,900 kcal, gym 2,100, easy run 2,200, long run 2,300. Macro splits shift too." },
            { label: "Why It Works", text: "No app, no friction. Just describe the meal. Running daily since I started training." },
          ]} /></FadeIn>
          <FadeIn delay={165}><Case name="Restaurant Reel Analyser" status="Building" meta="Personal project · Discord · Claude Vision · Whisper · Notion API · 2026" blocks={[
            { label: "The Problem", text: "I find restaurants through Instagram reels but always lose context — save the reel, forget about it, copy the name into notes and lose it." },
            { label: "What I Built", text: "A Discord bot: drop a reel link, it downloads the video, extracts frames via ffmpeg, transcribes with Whisper, sends to Claude Vision to pull restaurant name, area, cuisine, dish, veg/non-veg. Saves to Notion automatically." },
            { label: "Stack", text: "Python · Discord.py · yt-dlp · ffmpeg · Claude Vision API · OpenAI Whisper · Notion API" },
          ]} last /></FadeIn>
        </div>
      </section>

      {/* PERSONAL */}
      <section id="personal" style={section}>
        <div className="wrap" style={wrap}>
          <FadeIn><h2 style={secTitle}>Outside work</h2></FadeIn>
          {[
            { title: "Photography", text: `I've been shooting for a while — mostly street, people, and quiet moments that don't announce themselves. My work tends to blend detail with mood: less about the obvious shot, more about what's happening at the edges. Full portfolio at <a href="https://amoghpachpor.framer.website/" target="_blank" style="color:#1e3050;border-bottom:1px solid #1e3050">amoghpachpor.framer.website</a> or on <a href="https://vsco.co/ughmogh/gallery" target="_blank" style="color:#1e3050;border-bottom:1px solid #1e3050">VSCO</a>.` },
            { title: "Running", text: "I started running in 2026 and have come to genuinely enjoy it. Done a few 5K and 10K races, and on September 27th I'm running my <strong>first half marathon</strong>. After that, the goal is the <strong>Procam Slam</strong> — completing all of Procam International's major Indian road races in a single season." },
            { title: "Lily", text: "I adopted Lily on my 25th birthday — best decision I've made. She's almost three now, deeply unimpressed by everything I do, and somehow the most calming presence in my life. She has her own routines, her own opinions, and absolutely no interest in my sprint planning." },
          ].map((p, i) => (
            <FadeIn key={i} delay={i * 55}>
              <div style={{ paddingBottom: i < 2 ? "3.5rem" : 0, marginBottom: i < 2 ? "3.5rem" : 0, borderBottom: i < 2 ? `1px solid ${c.border}` : "none" }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.35rem", fontWeight: 600, color: c.text, marginBottom: "0.75rem" }}>{p.title}</div>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: p.text }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={section}>
        <div className="wrap" style={wrap}>
          <FadeIn><h2 style={secTitle}>Get in touch</h2></FadeIn>
          <FadeIn delay={55}><p style={{ fontSize: "1.05rem", color: c.muted, lineHeight: 1.8, maxWidth: 480, marginBottom: "2rem" }}>Open to build the right next thing — PM roles in AI and fintech, Founder's Office, or Chief of Staff. If something is worth building, I want to be part of it.</p></FadeIn>
          <FadeIn delay={110}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <a href="mailto:amoghp6298@gmail.com" style={{ color: c.accent, textDecoration: "none", fontWeight: 500 }}>amoghp6298@gmail.com</a>
              <a href="https://linkedin.com/in/amogh-pachpor" target="_blank" style={{ color: c.accent, textDecoration: "none", fontWeight: 500 }}>linkedin.com/in/amogh-pachpor</a>
              <a href="tel:+918296774472" style={{ color: c.accent, textDecoration: "none", fontWeight: 500 }}>+91 82967 74472</a>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.8rem", color: c.dim, margin: 0 }}>Amogh Pachpor · Bengaluru · 2026</p>
      </footer>
    </div>
  );
}
