"use client";

import { useState } from "react";
import Image from "next/image";
import { IdeaLauncher } from "@/components/idea-launcher";

const posters = [
  {
    id: "people",
    number: "001",
    label: "THE PEOPLE ARCHIVE",
    title: "A field guide to your favourite human.",
    description: "Every in-joke, tiny habit and legendary quote — collected like a very unofficial museum.",
    image: "/art/odd-things.svg",
    alt: "Original vintage botanical poster in oxblood and antique paper",
    className: "archive-print archive-print-large",
    format: "MINI BOOK / MEMORY ARCHIVE",
  },
  {
    id: "soundtrack",
    number: "002",
    label: "SOUNDTRACKS & SIDE QUESTS",
    title: "Your life, as a record sleeve.",
    description: "A cover for the songs, people and moments that made the lore.",
    image: "/art/side-a.svg",
    alt: "Original vinyl-record illustration on a deep burgundy music poster",
    className: "archive-print archive-print-record",
    format: "POSTER / PERSONAL ANTHOLOGY",
  },
  {
    id: "wild",
    number: "003",
    label: "WILD BOTANICAL",
    title: "A little wild by nature.",
    description: "Botanical shapes, old paper and patterns with a mind of their own.",
    image: "/art/wild-bloom.svg",
    alt: "Original stylized burgundy botanical poster with a patterned background",
    className: "archive-print archive-print-flower",
    format: "PRINT / COLLECTIBLE CARD",
  },
  {
    id: "outlaw",
    number: "004",
    label: "AFTER HOURS",
    title: "For your little outlaw era.",
    description: "Western ephemera, late-night energy and the art of not behaving.",
    image: "/art/little-outlaw.svg",
    alt: "Original vintage-inspired western poster in wine and antique gold",
    className: "archive-print archive-print-outlaw",
    format: "ZINE / CARD DECK",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="wf-site">
      <div className="wf-topstrip">
        <span><i aria-hidden="true" /> THE PERSONAL PRINT DEPARTMENT</span>
        <span className="wf-strip-center">MEMORIES / MYTHS / MISCHIEF</span>
        <a href="/make">YOUR IDEA GOES HERE <span aria-hidden="true">↗</span></a>
      </div>

      <header className="wf-header">
        <a className="wf-wordmark" href="#top" aria-label="Wonderfoundry home">
          <span className="wf-brand-stamp" aria-hidden="true">✳</span>
          <span>wonderfoundry<span>.</span></span>
        </a>
        <button className="wf-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="wf-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? "CLOSE −" : "MENU +"}
        </button>
        <nav className={`wf-nav ${menuOpen ? "is-open" : ""}`} id="wf-navigation" aria-label="Main navigation">
          <a href="#archive">The archive</a>
          <a href="#how-it-works">How it works</a>
          <a className="wf-nav-cta" href="/make">Make a little something <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="wf-hero" id="top" aria-labelledby="wf-hero-title">
        <div className="wf-hero-copy">
          <p className="wf-kicker"><span className="wf-kicker-line" /> MADE FOR THE PARTICULARLY SPECIFIC</p>
          <h1 id="wf-hero-title">Not quite<br /><em>ordinary.</em><br /><span>Entirely</span> <b>yours.</b></h1>
          <p className="wf-hero-lede">Some ideas are too personal for a template. Turn your people, memories and beautifully weird little obsessions into something you can actually hold.</p>
          <div className="wf-hero-actions">
            <a href="/make" className="wf-button wf-button-dark">Enter the making room <span aria-hidden="true">↗</span></a>
            <a href="#archive" className="wf-text-link">Browse the oddities <span aria-hidden="true">↓</span></a>
          </div>
          <div className="wf-hero-footer">
            <span className="wf-seal" aria-hidden="true">W<br />F</span>
            <span><strong>NOT MASS-PRODUCED PERSONALITY.</strong><br />Little artefacts from your own universe.</span>
            <span className="wf-hero-issue">ISSUE № 001<br />2026 — ONGOING</span>
          </div>
        </div>

        <section className="wf-art-wall" aria-label="A wall of original poster artwork">
          <div className="wf-wall-label wall-label-top">AN EXHIBITION OF VERY SPECIFIC THINGS</div>
          <figure className="wf-wall-print wf-wall-print-main">
            <Image src="/art/odd-things.svg" width={600} height={800} alt="Original poster: Odd things for good people, with burgundy typography and botanical artwork" priority />
            <figcaption>01 / THE PEOPLE ARCHIVE</figcaption>
          </figure>
          <figure className="wf-wall-print wf-wall-print-record">
            <Image src="/art/side-a.svg" width={600} height={800} alt="Original burgundy music poster featuring a vinyl record" />
          </figure>
          <figure className="wf-wall-print wf-wall-print-flower">
            <Image src="/art/wild-bloom.svg" width={600} height={800} alt="Original botanical illustration with a deep red flower and vintage pattern" />
          </figure>
          <span className="wf-wall-sticker sticker-one">YOUR LORE<br />LOOKS GOOD.</span>
          <span className="wf-wall-sticker sticker-two">NOT FOR<br />EVERYBODY ✳</span>
          <span className="wf-wall-catalogue">WONDERFOUNDRY<br />COLLECTORS' DEPT. / A</span>
        </section>
      </section>

      <div className="wf-marquee" aria-hidden="true">
        <div className="wf-marquee-track" aria-hidden="true">
          {["A LITTLE LORE", "A LOT OF PERSONALITY", "PRINTED FOR KEEPS", "THE WEIRD BITS ARE THE GOOD BITS"].map((phrase) => (
            <span className="wf-marquee-item" key={phrase}>{phrase}<b>✳</b></span>
          ))}
          {["A LITTLE LORE", "A LOT OF PERSONALITY", "PRINTED FOR KEEPS", "THE WEIRD BITS ARE THE GOOD BITS"].map((phrase) => (
            <span className="wf-marquee-item" key={`repeat-${phrase}`}>{phrase}<b>✳</b></span>
          ))}
        </div>
      </div>

      <section className="wf-archive" id="archive" aria-labelledby="wf-archive-title">
        <div className="wf-section-top">
          <div>
            <p className="wf-kicker"><span className="wf-kicker-line" /> CURATED ODDITIES / 001—004</p>
            <h2 id="wf-archive-title">A cabinet of<br /><em>curiosities.</em></h2>
          </div>
          <p className="wf-section-note">These aren't fixed products. They're creative rabbit holes. Bring the story; we'll help it find a form.</p>
        </div>

        <div className="wf-archive-wall">
          {posters.map((poster) => (
            <article className={poster.className} key={poster.id}>
              <div className="wf-print-metadata"><span>WF / {poster.number}</span><span>{poster.format}</span></div>
              <a href="/make" className="wf-print-art" aria-label={`Start creating: ${poster.title}`}>
                <Image src={poster.image} alt={poster.alt} width={600} height={800} loading="lazy" />
                <span className="wf-print-open" aria-hidden="true">↗</span>
              </a>
              <div className="wf-print-copy">
                <p>{poster.label}</p>
                <h3>{poster.title}</h3>
                <span>{poster.description}</span>
              </div>
              <a className="wf-print-link" href="/make">MAKE YOUR OWN <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <div className="wf-archive-foot"><span>FIG. A — D / SAMPLE DIRECTIONS</span><span>THE FIRST EDITION IS ONLY THE BEGINNING</span></div>
      </section>

      <section className="wf-lab" id="idea-lab" aria-labelledby="wf-lab-title">
        <div className="wf-lab-inner">
          <div className="wf-lab-copy">
            <p className="wf-kicker"><span className="wf-kicker-line" /> THE MAKING ROOM / OPEN</p>
            <h2 id="wf-lab-title">Enough looking.<br /><em>Make something.</em></h2>
            <p>Tell us the half-formed thought you can't stop thinking about. A person. A bit of lore. A completely irrational ranking of everyone's snack loyalty.</p>
            <div className="wf-lab-note"><span className="wf-lab-star" aria-hidden="true">✳</span><span>DEMO MODE / YOUR IDEA STAYS IN THIS TAB<br /><strong>No AI call, account or upload is made yet.</strong></span></div>
          </div>
          <IdeaLauncher />
        </div>
      </section>

      <section className="wf-process" id="how-it-works" aria-labelledby="wf-process-title">
        <div className="wf-process-heading">
          <p className="wf-kicker"><span className="wf-kicker-line" /> FROM INSIDE JOKE TO OBJECT</p>
          <h2 id="wf-process-title">The story is yours.<br /><em>The form is up for grabs.</em></h2>
        </div>
        <div className="wf-process-grid">
          <article><span className="wf-process-index">01 / THE RAW MATERIAL</span><span className="wf-process-icon flower-icon" aria-hidden="true">✿</span><h3>Start with the lore.</h3><p>A memory, a person, a phrase no one else understands. The more particular, the better.</p></article>
          <article><span className="wf-process-index">02 / THE PLAY</span><span className="wf-process-icon record-icon" aria-hidden="true">◉</span><h3>Try on different forms.</h3><p>Explore visual directions, change the mood, revise the details and keep the best bits.</p></article>
          <article><span className="wf-process-index">03 / THE OBJECT</span><span className="wf-process-icon print-icon" aria-hidden="true">✳</span><h3>Make it tangible.</h3><p>Approve a properly prepared design before a production partner makes the real thing.</p></article>
        </div>
      </section>

      <footer className="wf-footer">
        <a className="wf-wordmark" href="#top"><span className="wf-brand-stamp" aria-hidden="true">✳</span><span>wonderfoundry<span>.</span></span></a>
        <p>For the oddly specific things that make us, us.</p>
        <a href="#top" className="wf-back-top">BACK TO THE TOP ↑</a>
        <div className="wf-footer-bottom"><span>INDEPENDENTLY IMAGINED / NOT A TEMPLATE</span><span>AN EARLY PROTOTYPE · 2026</span></div>
      </footer>
    </main>
  );
}
