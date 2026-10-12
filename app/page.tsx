"use client";

import { useState } from "react";
import Image from "next/image";
import { IdeaLauncher } from "@/components/idea-launcher";
import { RetroSticker } from "@/components/retro-stickers";

const posters = [
  { id: "archive", number: "01", label: "THE PEOPLE ARCHIVE", title: "A field guide to your favourite human.", body: "Tiny habits, famous quotes and wildly scientific snack rankings.", image: "/art/odd-things.svg", format: "MINI BOOK / MEMORY ARCHIVE", sticker: "flower" },
  { id: "music", number: "02", label: "LATE-NIGHT ANTHOLOGIES", title: "Your life, as a record sleeve.", body: "A personal soundtrack for the people, phases and lore.", image: "/art/side-a.svg", format: "POSTER / SOUNDTRACK", sticker: "vinyl" },
  { id: "botanical", number: "03", label: "WILD BOTANICAL", title: "A little wild by nature.", body: "Old paper, strange flowers and an entire personality in bloom.", image: "/art/wild-bloom.svg", format: "PRINT / COLLECTIBLE", sticker: "butterfly" },
  { id: "outlaw", number: "04", label: "THE LITTLE OUTLAW", title: "For your little outlaw era.", body: "Tall tales, side quests and highly questionable decisions.", image: "/art/little-outlaw.svg", format: "ZINE / CARD DECK", sticker: "revolver" },
  { id: "fiction", number: "05", label: "UNVERIFIED MYTHOLOGY", title: "A very real fiction.", body: "A universe only your people know how to read.", image: "/art/fiction.svg", format: "ART PRINT / SMALL EDITION", sticker: "cherries" },
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="wf-site" id="top">
      <div className="wf-topstrip">
        <span><i aria-hidden="true" /> THE PERSONAL PRINT DEPARTMENT</span>
        <span className="wf-strip-center">TALL TALES / LITTLE OBJECTS / BIG LORE</span>
        <a href="/make">MAKE SOMETHING WEIRD <b aria-hidden="true">↗</b></a>
      </div>
      <header className="wf-header">
        <a className="wf-wordmark" href="#top" aria-label="Wonderfoundry home">
          <span className="wf-brand-stamp" aria-hidden="true">✳</span><span>wonderfoundry<span className="wf-brand-period">®</span></span>
        </a>
        <button className="wf-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="wf-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "CLOSE −" : "MENU +"}</button>
        <nav className={`wf-nav ${menuOpen ? "is-open" : ""}`} id="wf-navigation" aria-label="Main navigation">
          <a href="#archive">The oddity archive</a><a href="#idea-lab">The making room</a><a className="wf-nav-cta" href="/make">MAKE A THING <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="wf-hero" aria-labelledby="wf-hero-title">
        <div className="wf-hero-copy">
          <p className="wf-kicker"><span className="wf-kicker-line" /> PERSONAL MYTHOLOGY / PRINTED MATTER</p>
          <h1 id="wf-hero-title"><span className="hero-line-one">YOUR LIFE.</span><span className="hero-line-two"><em>YOUR</em> LORE.</span><span className="hero-line-three">YOUR <b>LEGEND.</b></span></h1>
          <p className="wf-hero-lede">The strange little details that make a person, a friendship, a phase, a whole universe. We turn that stuff into objects worth keeping.</p>
          <div className="wf-hero-actions"><a href="/make" className="wf-button wf-button-dark">ENTER THE MAKING ROOM <span aria-hidden="true">↗</span></a><a href="#archive" className="wf-text-link">SCROLL THE ODDITIES <span aria-hidden="true">↓</span></a></div>
          <div className="wf-hero-footer"><span className="wf-seal" aria-hidden="true">WF<br />001</span><span><strong>NOT ANOTHER GIFT TEMPLATE.</strong><br />A one-off for your particular universe.</span></div>
          <span className="hero-handwrite" aria-hidden="true">made from the lore.</span>
        </div>

        <div className="wf-hero-collage">
          <div className="collage-scrap collage-scrap-top" aria-hidden="true"><span>THE PERSONAL</span><strong>PRESS</strong><span>VOL. 01 / EST. NOW</span></div>
          <figure className="hero-print hero-print-main"><div className="hero-print-meta"><span>WF / 001</span><span>LIMITED EDITION</span></div><Image src="/art/odd-things.svg" alt="Original oxblood and old-paper botanical poster" width={600} height={800} priority /><figcaption>AN OBJECT FROM YOUR UNIVERSE</figcaption></figure>
          <figure className="hero-print hero-print-moon"><Image src="/art/fiction.svg" alt="Original circular burgundy graphic poster" width={700} height={700} /></figure>
          <figure className="hero-print hero-print-record"><Image src="/art/side-a.svg" alt="Original music-inspired poster featuring a vinyl record" width={600} height={800} /></figure>
          <div className="wf-sticker-field" aria-hidden="true">
            <RetroSticker kind="jaguar" className="sticker-jaguar sticker-drift" /><RetroSticker kind="car" className="sticker-car sticker-bob" /><RetroSticker kind="guitar" className="sticker-guitar sticker-drift-slow" /><RetroSticker kind="cherries" className="sticker-cherries sticker-rock" /><RetroSticker kind="flower" className="sticker-flower sticker-bob" /><RetroSticker kind="radio" className="sticker-radio sticker-drift" /><RetroSticker kind="bottle" className="sticker-bottle sticker-rock" /><RetroSticker kind="butterfly" className="sticker-butterfly sticker-drift-slow" /><RetroSticker kind="cassette" className="sticker-cassette sticker-bob" /><RetroSticker kind="revolver" className="sticker-revolver sticker-drift" /><RetroSticker kind="star" className="sticker-star sticker-spin" />
          </div>
          <div className="collage-tape tape-top" aria-hidden="true" /><div className="collage-tape tape-side" aria-hidden="true" />
          <span className="collage-note note-top">CUT OUT<br />YOUR OWN<br />UNIVERSE ✳</span><span className="collage-note note-bottom">THE GOOD STUFF<br />IS NEVER ORDINARY.</span><span className="collage-serial">SPECIMEN 001 / COLLECTORS&apos; DEPT.</span>
        </div>
      </section>

      <div className="wf-marquee" aria-hidden="true"><div className="wf-marquee-track">{[0,1].map((repeat) => <span className="wf-marquee-group" key={repeat}><b>✳</b> MADE OF MEMORIES <b>✳</b> PRINTED LIKE A CULT CLASSIC <b>✳</b> PERSONALITY, WITH PAPER EDGES <b>✳</b> YOUR LORE, YOUR RULES <b>✳</b> NO TWO WORLDS THE SAME <b>✳</b></span>)}</div></div>

      <section className="wf-archive" id="archive" aria-labelledby="wf-archive-title">
        <div className="wf-section-top"><div><p className="wf-kicker"><span className="wf-kicker-line" /> THE ODDITY ARCHIVE / VOL. 001</p><h2 id="wf-archive-title">Keep the<br /><em>weird bits.</em></h2></div><div className="wf-archive-intro"><p>Think newspaper clipping, record sleeve, field notes, a poster from an imaginary film. Not a fixed catalogue. A pile of good starting points.</p><span>THE ARCHIVE IS OPEN <b aria-hidden="true">↘</b></span></div><RetroSticker kind="bow" className="archive-bow" /></div>
        <div className="wf-pinboard">
          {posters.map((poster) => (
            <article key={poster.id} className={`pin pin-${poster.id}`}>
              <div className="pin-paper-edge"><div className="pin-meta"><span>WF / {poster.number}</span><span>{poster.format}</span></div>
                <a href="/make" className="pin-art" aria-label={`Start creating: ${poster.title}`}><Image src={poster.image} alt={`Original illustration: ${poster.title}`} width={700} height={900} loading="lazy" /><span className="pin-art-cta" aria-hidden="true">↗ MAKE IT YOURS</span></a>
                <div className="pin-caption"><p>{poster.label}</p><h3>{poster.title}</h3><span>{poster.body}</span></div><a className="pin-print-link" href="/make">MAKE YOUR OWN <span aria-hidden="true">↗</span></a>
              </div>
              <RetroSticker kind={poster.sticker} className={`pin-sticker pin-sticker-${poster.id}`} /><span className="pin-index" aria-hidden="true">({poster.number})</span>
            </article>
          ))}
          <aside className="press-scrap" aria-label="A fictional newspaper clipping"><div className="press-scrap-header"><span>THE WONDERFOUNDRY GAZETTE</span><span>NO. 07</span></div><strong>LOCAL PERSON<br />BECOMES<br /><em>THE WHOLE STORY.</em></strong><div className="press-scrap-columns"><i /><i /><i /><i /></div><span className="press-scrap-footer">EXTRA! EXTRA! THE LORE IS REAL.</span></aside>
          <aside className="archive-contact-sheet" aria-label="A small printed index of collected objects">
            <div className="contact-masthead"><span>SUPPLEMENT / A</span><span>OBJECT INDEX</span></div>
            <h3>Little things.<br /><em>Big lore.</em></h3>
            <p className="contact-intro">Evidence from the department of very personal things.</p>
            <div className="contact-cutouts">
              <div className="contact-object contact-radio"><RetroSticker kind="radio" /><span>FREQUENCY / 07</span></div>
              <div className="contact-object contact-car"><RetroSticker kind="car" /><span>NIGHT DRIVE / 1978</span></div>
              <div className="contact-object contact-cassette"><RetroSticker kind="cassette" /><span>SIDE A / 02:17</span></div>
              <div className="contact-object contact-flower"><RetroSticker kind="flower" /><span>SPECIMEN / 004</span></div>
            </div>
            <div className="contact-bottomline"><span>FIELD NOTE NO. 01</span><span>KEEP EVERYTHING.</span></div>
          </aside>
          <RetroSticker kind="tiger" className="pinboard-tiger sticker-drift" /><RetroSticker kind="star" className="pinboard-star sticker-spin" />
        </div>
        <div className="wf-archive-footer"><span>FIG. 001—005 / A SMALL SAMPLE OF MANY POSSIBILITIES</span><a href="/make">START YOUR OWN FILE <b aria-hidden="true">↗</b></a></div>
      </section>

      <section className="wf-sticker-shelf" aria-labelledby="sticker-shelf-title">
        <div className="sticker-shelf-heading"><p className="wf-kicker"><span className="wf-kicker-line" /> FOUND IN THE MARGINS</p><h2 id="sticker-shelf-title">A few things<br /><em>we kept.</em></h2><p>Every good story has a soundtrack, a mascot, a flower, a questionable decision or two.</p></div>
        <div className="sticker-shelf-stage" aria-hidden="true"><RetroSticker kind="car" className="shelf-car sticker-bob" /><RetroSticker kind="jaguar" className="shelf-jaguar sticker-drift" /><RetroSticker kind="radio" className="shelf-radio sticker-rock" /><RetroSticker kind="guitar" className="shelf-guitar sticker-drift-slow" /><RetroSticker kind="cherries" className="shelf-cherries sticker-bob" /><RetroSticker kind="bottle" className="shelf-bottle sticker-rock" /><RetroSticker kind="flower" className="shelf-flower sticker-drift" /><RetroSticker kind="revolver" className="shelf-revolver sticker-bob" /><RetroSticker kind="butterfly" className="shelf-butterfly sticker-drift-slow" /><RetroSticker kind="cassette" className="shelf-cassette sticker-bob" /><RetroSticker kind="bow" className="shelf-bow sticker-rock" /><RetroSticker kind="vinyl" className="shelf-vinyl sticker-spin" /><RetroSticker kind="star" className="shelf-star sticker-spin" /><span className="shelf-caption shelf-caption-one">STICK A LITTLE<br />MAGIC ON IT.</span><span className="shelf-caption shelf-caption-two">COLLECT THINGS.<br />MAKE LORE.</span><span className="shelf-sticker-tape" /></div>
      </section>

      <section className="wf-lab" id="idea-lab" aria-labelledby="wf-lab-title"><div className="wf-lab-inner">
        <div className="wf-lab-copy"><p className="wf-kicker"><span className="wf-kicker-line" /> THE MAKING ROOM / OPEN</p><h2 id="wf-lab-title">You bring<br />the <em>lore.</em></h2><p>Start with a person, a memory, an obsession, or a phrase that makes absolutely no sense without context. We&apos;ll help turn it into a keepsake with its own visual universe.</p><div className="wf-lab-note"><span className="wf-lab-star" aria-hidden="true">✳</span><span>PROTOTYPE / LOCAL DEMO<br /><strong>No AI call or cloud saving has been added yet.</strong></span></div><RetroSticker kind="butterfly" className="lab-butterfly sticker-drift" /><RetroSticker kind="cherries" className="lab-cherries sticker-bob" /></div>
        <div className="wf-lab-form-wrap"><div className="lab-paper-label"><span>WF / BRIEF NO. 001</span><span>FOR INTERNAL IMAGINATION ONLY</span></div><IdeaLauncher /><div className="lab-bottom-note"><span>THIS IS WHERE THE STORY BEGINS</span><span>01 — ∞</span></div></div>
      </div></section>

      <section className="wf-process" id="how-it-works" aria-labelledby="wf-process-title"><div className="process-print-header"><p className="wf-kicker"><span className="wf-kicker-line" /> HOW THE LITTLE MACHINE WORKS</p><h2 id="wf-process-title">From brain<br />to <em>bookshop.</em></h2><RetroSticker kind="vinyl" className="process-vinyl sticker-spin" /></div>
        <div className="wf-process-grid"><article><span className="wf-process-index">01 / THE BRIEF</span><RetroSticker kind="flower" className="wf-process-icon process-flower" /><h3>Tell the story.</h3><p>A friend, an obsession, a family saying, a weird little theory. Give the idea its lore.</p></article><article><span className="wf-process-index">02 / THE PLAY</span><RetroSticker kind="cassette" className="wf-process-icon process-cassette" /><h3>Try on a look.</h3><p>Play with mood, typography, imagery and format until it looks like your world.</p></article><article><span className="wf-process-index">03 / THE OBJECT</span><RetroSticker kind="star" className="wf-process-icon process-star" /><h3>Make it tangible.</h3><p>Review the properly prepared art before a production partner makes the physical thing.</p></article></div>
      </section>

      <footer className="wf-footer"><a className="wf-wordmark" href="#top"><span className="wf-brand-stamp" aria-hidden="true">✳</span><span>wonderfoundry<span className="wf-brand-period">®</span></span></a><p>Little artefacts from your very particular universe.</p><a href="#top" className="wf-back-top">BACK TO THE TOP ↑</a><div className="wf-footer-bottom"><span>THE PERSONAL PRINT DEPARTMENT / EST. 2026</span><span>AN EARLY PROTOTYPE — MADE OF LORE</span></div></footer>
    </main>
  );
}
