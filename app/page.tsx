import { IdeaLauncher } from "@/components/idea-launcher";

const creations = [
  {
    number: "01",
    category: "THE PEOPLE ARCHIVE",
    title: "A field guide to your favourite human.",
    description: "Tiny details, legendary quotes, questionable habits. All the lore in one little book.",
    type: "field-guide",
    stamp: "YOU KNOW THE ONE",
    colour: "butter",
  },
  {
    number: "02",
    category: "INSIDE-JOKE DECKS",
    title: "A card game only your group gets.",
    description: "The bits of context that make absolutely no sense to anybody else.",
    type: "card-deck",
    stamp: "DEEP LORE",
    colour: "blue",
  },
  {
    number: "03",
    category: "IMAGINARY OBJECTS",
    title: "A tiny universe with your name on it.",
    description: "Fake magazines, personal myths, strange posters and other very real ideas.",
    type: "imaginary",
    stamp: "NOT THAT SERIOUS",
    colour: "coral",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="announcement">
        <span><i className="status-dot" aria-hidden="true" /> A SMALL STUDIO FOR BIG PERSONALITY</span>
        <span className="announcement-right">YOUR STRANGEST IDEA IS WELCOME <span aria-hidden="true">↗</span></span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Wonderfoundry home">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>wonderfoundry<span className="wordmark-period">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#explore">Explore ideas</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        <a className="header-cta" href="#idea-lab">Make a thing <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> MADE FOR THE TOO-SPECIFIC IDEA</div>
          <h1 id="hero-title">Make it strange.<br />Make it <span className="highlight-word">yours<span className="scribble" aria-hidden="true">〰</span></span></h1>
          <p className="hero-description">Your best ideas are too personal for a template. Turn your memories, inside jokes and beautifully weird thoughts into real things you can hold.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#idea-lab">Start with an idea <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#explore">Wander around first <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-note"><span className="note-star" aria-hidden="true">✳</span><span>Made from your imagination.<br /><strong>Not another off-the-shelf gift.</strong></span></div>
        </div>

        <div className="hero-art" role="img" aria-label="An illustrated sample of a personal field guide booklet">
          <div className="art-orbit orbit-one" aria-hidden="true" />
          <div className="art-orbit orbit-two" aria-hidden="true" />
          <div className="float-note float-note-top">A ONE-OF-ONE<br />KIND OF THING <span aria-hidden="true">↘</span></div>
          <div className="sample-book">
            <div className="book-topline"><span>WF / FIELD NOTES</span><span>NO. 001</span></div>
            <div className="book-sun" aria-hidden="true"><span>✳</span></div>
            <p className="book-kicker">A VERY UNOFFICIAL</p>
            <p className="book-title">FIELD GUIDE<br />TO <em>MY PEOPLE</em></p>
            <div className="book-bottom"><span>OBSERVATIONS · LORE · LEGEND</span><span>VOL. 01</span></div>
          </div>
          <div className="float-note float-note-bottom"><span className="mini-spark" aria-hidden="true">✳</span> NOT A TEMPLATE.<br />A LITTLE ARTEFACT.</div>
          <div className="art-caption"><span>SPECIMEN 001</span><span>THE PEOPLE ARCHIVE</span></div>
        </div>
      </section>

      <div className="ticker" aria-label="Creative possibilities">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, index) => (
            <span className="ticker-set" key={index}>GOOD IDEAS GET PHYSICAL <b>✳</b> MEMORIES, BUT MAKE THEM OBJECTS <b>✳</b> WEIRDLY SPECIFIC IS THE POINT <b>✳</b> ONE IDEA, A HUNDRED DIRECTIONS <b>✳</b> </span>
          ))}
        </div>
      </div>

      <section className="explore section-wrap" id="explore" aria-labelledby="explore-title">
        <div className="section-heading">
          <div><p className="eyebrow">A FEW PLACES TO BEGIN</p><h2 id="explore-title">Choose your kind<br />of <span className="serif-accent">weird.</span></h2></div>
          <p className="section-intro">These aren't fixed products. They're starting points. Bring the idea; we'll figure out what shape it wants to take.</p>
        </div>
        <div className="creation-grid">
          {creations.map((creation) => (
            <article className={`creation-card ${creation.colour}`} key={creation.number}>
              <div className="creation-top"><span>{creation.number} / 03</span><span className="creation-stamp">{creation.stamp}</span></div>
              <div className={`creation-art ${creation.type}`} aria-hidden="true">
                {creation.type === "field-guide" ? <><span className="mini-book-line">A FIELD GUIDE TO</span><span className="mini-book-title">YOUR<br />FAVOURITE<br /><i>HUMAN.</i></span><span className="mini-book-burst">✳</span><span className="mini-book-foot">THE UNOFFICIAL EDITION</span></> : null}
                {creation.type === "card-deck" ? <><span className="deck-card deck-back">NOT<br />CANON.</span><span className="deck-card deck-front"><i>THE</i><strong>LORE<br />DECK</strong><small>EST. SOMEWHERE IN THE GROUP CHAT</small></span><span className="deck-doodle">✳</span></> : null}
                {creation.type === "imaginary" ? <><span className="imaginary-star">✳</span><span className="imaginary-sun" /><span className="imaginary-title">A VERY<br /><em>REAL</em><br />FICTION.</span><span className="imaginary-orbit" /></> : null}
              </div>
              <p className="creation-category">{creation.category}</p>
              <h3>{creation.title}</h3>
              <p className="creation-description">{creation.description}</p>
              <a className="card-link" href="#idea-lab">Start here <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="idea-lab" id="idea-lab" aria-labelledby="idea-lab-title">
        <div className="idea-lab-inner section-wrap">
          <div className="idea-lab-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> THE IDEA LAB / OPEN</p>
            <h2 id="idea-lab-title">Okay, your turn.<br /><span className="serif-accent">What are we making?</span></h2>
            <p>Start with a half-formed thought. A person, a memory, a bit of lore. It doesn't need to be polished to be interesting.</p>
            <div className="prototype-label"><span className="status-dot" /> DEMO MODE · NO AI CALLS OR SAVING YET</div>
          </div>
          <IdeaLauncher />
        </div>
      </section>

      <section className="how-it-works section-wrap" id="how-it-works" aria-labelledby="how-title">
        <div className="how-title-wrap"><p className="eyebrow">FROM THOUGHT TO THING</p><h2 id="how-title">A little imagination.<br /><span className="serif-accent">A real-world object.</span></h2></div>
        <div className="steps-grid">
          <article className="step"><span className="step-number">01</span><span className="step-icon" aria-hidden="true">✳</span><h3>Tell us the lore.</h3><p>Describe the person, memory, mood or absurd little idea you can't stop thinking about.</p></article>
          <article className="step"><span className="step-number">02</span><span className="step-icon step-icon-blue" aria-hidden="true">↗</span><h3>Play with directions.</h3><p>Explore different creative routes, add details, and shape the one that feels like you.</p></article>
          <article className="step"><span className="step-number">03</span><span className="step-icon step-icon-coral" aria-hidden="true">✳</span><h3>Make it tangible.</h3><p>Review a print-ready preview before a production partner makes the real thing.</p></article>
        </div>
      </section>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#top"><span className="brand-mark" aria-hidden="true">✳</span><span>wonderfoundry<span className="wordmark-period">.</span></span></a>
        <p>For the ideas that don't fit neatly anywhere else.</p>
        <a className="footer-top" href="#top">Back to the top ↑</a>
        <span className="footer-small">AN EARLY PROTOTYPE · 2026</span>
      </footer>
    </main>
  );
}
