"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { ReferenceSticker } from "@/components/reference-stickers";
import "./workspace.css";

type ProductFormat = "book" | "deck" | "poster";
type ArtDirection = "archive" | "electric" | "dreamy";

type Draft = {
  headline: string;
  subtitle: string;
  idea: string;
  product: ProductFormat;
  direction: ArtDirection;
  image: string;
};

type SavedVersion = Draft & {
  version: number;
  savedAt: string;
};

const formats: { id: ProductFormat; name: string; detail: string; symbol: string }[] = [
  { id: "book", name: "Mini book", detail: "A little archive of lore", symbol: "▤" },
  { id: "deck", name: "Card deck", detail: "A set made for your people", symbol: "▧" },
  { id: "poster", name: "Art print", detail: "A statement-sized artefact", symbol: "▣" },
];

const directions: { id: ArtDirection; name: string; note: string }[] = [
  { id: "archive", name: "The archive", note: "Warm, collected, considered" },
  { id: "electric", name: "After Hours", note: "Black cherry, music posters, ink" },
  { id: "dreamy", name: "Wild Botanical", note: "Faded florals, old paper, moss" },
];

function Mockup({ draft, compact = false }: { draft: Draft; compact?: boolean }) {
  const className = `mockup mockup-${draft.product} palette-${draft.direction}`;
  const art = (
    <>
      <span className="mockup-overline">{draft.product === "book" ? "WF / FIELD NOTES" : draft.product === "deck" ? "A VERY PERSONAL DECK" : "A LIMITED EDITION PRINT"}</span>
      {draft.image ? (
        <div className="mockup-uploaded-image" role="img" aria-label="Your uploaded reference image" style={{ backgroundImage: `url("${draft.image}")` }} />
      ) : (
        <div className="mockup-symbol" aria-hidden="true">{draft.direction === "dreamy" ? "☼" : draft.direction === "electric" ? "✳" : "✴"}</div>
      )}
      <h3>{draft.headline.trim() || "YOUR IDEA, IN OBJECT FORM"}</h3>
      <p>{draft.subtitle.trim() || "A VERY UNOFFICIAL EDITION"}</p>
      <span className="mockup-bottomline">OBSERVATIONS · LORE · LEGEND</span>
    </>
  );

  if (draft.product === "deck") {
    return (
      <div className={`${className} ${compact ? "mockup-compact" : ""}`}>
        <div className="deck-stack-card deck-stack-back" aria-hidden="true">YOUR<br />LORE.</div>
        <div className="deck-stack-card deck-stack-front">{art}</div>
      </div>
    );
  }

  if (draft.product === "poster") {
    return (
      <div className={`${className} ${compact ? "mockup-compact" : ""}`}>
        <div className="poster-paper">{art}</div>
      </div>
    );
  }

  return (
    <div className={`${className} ${compact ? "mockup-compact" : ""}`}>
      <div className="book-paper">{art}</div>
    </div>
  );
}

function VersionTile({ version, onRestore }: { version: SavedVersion; onRestore: () => void }) {
  return (
    <article className="version-tile">
      <div className="version-tile-art"><Mockup draft={version} compact /></div>
      <div className="version-tile-meta">
        <span>VERSION {String(version.version).padStart(2, "0")}</span>
        <span>{version.savedAt}</span>
      </div>
      <strong>{version.headline || "Untitled direction"}</strong>
      <button className="quiet-button" type="button" onClick={onRestore}>Continue from this <span aria-hidden="true">↗</span></button>
    </article>
  );
}

export default function MakePage() {
  const [idea, setIdea] = useState("A field guide to my best friend, ranked by snack loyalty.");
  const [headline, setHeadline] = useState("FIELD GUIDE TO MY PEOPLE");
  const [subtitle, setSubtitle] = useState("OBSERVATIONS · LORE · LEGEND");
  const [product, setProduct] = useState<ProductFormat>("book");
  const [direction, setDirection] = useState<ArtDirection>("archive");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [versions, setVersions] = useState<SavedVersion[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const draft: Draft = { idea, headline, subtitle, product, direction, image: uploadedImage };

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError("");
    if (!file.type.startsWith("image/")) {
      setUploadError("Choose an image file such as PNG, JPG or WEBP.");
      event.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("For this prototype, keep reference images under 2 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadedImage(reader.result);
        setNotice("Reference image added to this local draft.");
      }
    };
    reader.onerror = () => setUploadError("That image could not be read. Try another file.");
    reader.readAsDataURL(file);
  }

  function saveVersion() {
    const nextVersion: SavedVersion = {
      ...draft,
      version: versions.length + 1,
      savedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setVersions((existing) => [...existing, nextVersion]);
    setNotice(`Version ${nextVersion.version} added to this session's history.`);
    setCompareOpen(false);
  }

  function restoreVersion(version: SavedVersion) {
    setIdea(version.idea);
    setHeadline(version.headline);
    setSubtitle(version.subtitle);
    setProduct(version.product);
    setDirection(version.direction);
    setUploadedImage(version.image);
    setNotice(`Restored version ${version.version} to the editor. Save it again to create a new version.`);
    setCompareOpen(false);
  }

  return (
    <main className="workspace-shell">
      <header className="workspace-topbar">
        <Link className="workspace-brand" href="/" aria-label="Wonderfoundry home">
          <span className="brand-mark" aria-hidden="true">✳</span><span>wonderfoundry<span className="wordmark-period">.</span></span>
        </Link>
        <div className="workspace-breadcrumb"><span>CREATIVE STUDIO</span><span aria-hidden="true">/</span><strong>NEW PROJECT</strong></div>
        <div className="workspace-status"><span className="status-dot" /> LOCAL DRAFT</div>
      </header>

      <div className="workspace-intro">
        <Link className="back-link" href="/">← Back to the playground</Link>
        <div className="workspace-intro-row">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> THE MAKING ROOM / 001</p>
            <h1>Start with a thought.<br /><span className="serif-accent">Make it a thing.</span></h1>
            <p className="workspace-lede">Shape the idea, choose its form, and see a little preview take shape. Nothing needs to be perfect yet.</p>
          </div>
          <nav className="workspace-steps" aria-label="Creation steps">
            <span className="workspace-step active"><b>01</b> IDEA</span>
            <span className="workspace-step active"><b>02</b> SHAPE</span>
            <span className="workspace-step"><b>03</b> MAKE REAL</span>
          </nav>
        </div>
      </div>

      <div className="workspace-grid">
        <section className="editor-panel" aria-labelledby="editor-title">
          <div className="panel-heading"><span className="panel-index">01</span><div><p>THE RAW MATERIAL</p><h2 id="editor-title">Tell us the lore.</h2></div></div>

          <div className="editor-field">
            <div className="field-label-row"><label htmlFor="idea-brief">The idea, in your own words</label><span>THE MORE SPECIFIC, THE BETTER</span></div>
            <textarea id="idea-brief" value={idea} onChange={(event) => setIdea(event.target.value)} maxLength={500} rows={4} placeholder="A memory, a person, an inside joke, a very odd theory…" />
            <div className="field-footnote"><span>{idea.length}/500</span><span>This is your brief, not the final copy.</span></div>
          </div>

          <div className="editor-divider" />

          <div className="panel-heading"><span className="panel-index">02</span><div><p>GIVE IT A FORM</p><h2>What could it become?</h2></div></div>
          <fieldset className="format-options" aria-label="Choose a product format">
            {formats.map((format) => (
              <button key={format.id} type="button" className={`format-option ${product === format.id ? "selected" : ""}`} onClick={() => setProduct(format.id)} aria-pressed={product === format.id}>
                <span className={`format-symbol symbol-${format.id}`} aria-hidden="true">{format.symbol}</span>
                <strong>{format.name}</strong><small>{format.detail}</small>
                <span className="option-check" aria-hidden="true">{product === format.id ? "✓" : "+"}</span>
              </button>
            ))}
          </fieldset>

          <div className="editor-divider" />

          <div className="panel-heading"><span className="panel-index">03</span><div><p>SET THE FEELING</p><h2>Choose a direction.</h2></div></div>
          <fieldset className="direction-options" aria-label="Choose a visual direction">
            {directions.map((item) => (
              <button key={item.id} type="button" className={`direction-pick ${direction === item.id ? "selected" : ""}`} onClick={() => setDirection(item.id)} aria-pressed={direction === item.id}>
                <span className={`direction-swatch swatch-${item.id}`} aria-hidden="true"><i /><i /><i /></span>
                <span><strong>{item.name}</strong><small>{item.note}</small></span>
                <span className="option-check" aria-hidden="true">{direction === item.id ? "✓" : "+"}</span>
              </button>
            ))}
          </fieldset>

          <div className="editor-divider" />

          <div className="panel-heading"><span className="panel-index">04</span><div><p>MAKE IT PERSONAL</p><h2>Change the details.</h2></div></div>
          <div className="editor-field">
            <label htmlFor="design-headline">Main title</label>
            <input id="design-headline" value={headline} onChange={(event) => setHeadline(event.target.value)} maxLength={48} placeholder="YOUR VERY OWN TITLE" />
            <div className="field-footnote"><span>{headline.length}/48</span><span>Short, punchy, yours.</span></div>
          </div>
          <div className="editor-field">
            <label htmlFor="design-subtitle">Small-print / subtitle</label>
            <input id="design-subtitle" value={subtitle} onChange={(event) => setSubtitle(event.target.value)} maxLength={90} placeholder="A VERY UNOFFICIAL EDITION" />
            <div className="field-footnote"><span>{subtitle.length}/90</span><span>Make it an in-joke if you like.</span></div>
          </div>
          <div className="editor-field upload-field">
            <label htmlFor="reference-image">Add a reference image <span>OPTIONAL</span></label>
            <label className="upload-dropzone" htmlFor="reference-image">
              <span className="upload-icon" aria-hidden="true">↑</span><span><strong>{uploadedImage ? "Replace reference image" : "Choose an image to try"}</strong><small>PNG, JPG or WEBP · up to 2 MB · stays in this tab</small></span>
              <span className="upload-action">BROWSE</span>
            </label>
            <input className="visually-hidden-file" id="reference-image" type="file" accept="image/*" onChange={handleUpload} />
            {uploadedImage ? <button className="remove-image" type="button" onClick={() => { setUploadedImage(""); setNotice("Reference image removed."); }}>Remove image</button> : null}
            {uploadError ? <p className="upload-error" role="alert">{uploadError}</p> : null}
          </div>

          <div className="editor-actions">
            <button className="button button-dark" type="button" onClick={saveVersion}>Add to version history <span aria-hidden="true">↗</span></button>
            <span>Session-only. Not uploaded or saved to an account.</span>
          </div>
        </section>

        <aside className="preview-column" aria-label="Live design preview and versions">
          <div className="preview-panel">
            <div className="preview-header"><div><p>THE FIRST LOOK</p><h2>In progress<span>.</span></h2></div><span className="live-pill"><i /> LIVE PREVIEW</span></div>
            <div className="preview-stage"><div className="stage-sticker-cloud" aria-hidden="true"><ReferenceSticker kind="leopard-cherries" className="stage-sticker stage-sticker-cherries" /><ReferenceSticker kind="lily" className="stage-sticker stage-sticker-butterfly" /><ReferenceSticker kind="headphones" className="stage-sticker stage-sticker-cassette" /><ReferenceSticker kind="seal" className="stage-sticker stage-sticker-star" /></div>
              <div className="stage-ring stage-ring-one" aria-hidden="true" />
              <div className="stage-ring stage-ring-two" aria-hidden="true" />
              <Mockup draft={draft} />
              <span className="stage-note stage-note-top">A WORK IN<br />PROGRESS <span aria-hidden="true">↘</span></span>
              <span className="stage-note stage-note-bottom"><i>✳</i> IDEA → OBJECT</span>
            </div>
            <div className="preview-caption"><span>{formats.find((item) => item.id === product)?.name.toUpperCase()}</span><span>DESIGN DIRECTION / {direction.toUpperCase()}</span></div>
            <div className="print-note"><span aria-hidden="true">ⓘ</span><p><strong>Concept preview only.</strong> This isn't a print-ready file yet. Real dimensions, bleed, colour and production checks come later.</p></div>
          </div>

          <div className="versions-panel">
            <div className="versions-heading"><div><p>KEEP THE GOOD BITS</p><h2>Version history <span>({versions.length})</span></h2></div><button className="compare-button" type="button" onClick={() => setCompareOpen((open) => !open)} disabled={versions.length < 2}>{compareOpen ? "Close compare" : "Compare ↔"}</button></div>
            {notice ? <p className="workspace-notice" role="status"><span className="status-dot" />{notice}</p> : null}
            {versions.length === 0 ? (
              <div className="versions-empty"><span aria-hidden="true">↳</span><p>Your first version will live here.<br /><strong>Change something, then add a version.</strong></p></div>
            ) : (
              <div className="version-list">
                {[...versions].reverse().map((version) => <VersionTile key={version.version} version={version} onRestore={() => restoreVersion(version)} />)}
              </div>
            )}
            {compareOpen && versions.length >= 2 ? (
              <div className="compare-panel">
                <div className="compare-panel-title"><span>VERSION {String(versions[versions.length - 2].version).padStart(2, "0")}</span><span>VS.</span><span>VERSION {String(versions[versions.length - 1].version).padStart(2, "0")}</span></div>
                <div className="compare-grid">
                  <div><Mockup draft={versions[versions.length - 2]} compact /><p>{versions[versions.length - 2].headline || "Untitled version"}</p><small>{versions[versions.length - 2].product.toUpperCase()} · {versions[versions.length - 2].direction.toUpperCase()}</small></div>
                  <div><Mockup draft={versions[versions.length - 1]} compact /><p>{versions[versions.length - 1].headline || "Untitled version"}</p><small>{versions[versions.length - 1].product.toUpperCase()} · {versions[versions.length - 1].direction.toUpperCase()}</small></div>
                </div>
              </div>
            ) : null}
            <p className="versions-disclaimer">Versions only exist while this page stays open. Sign-in and cloud saving will be a later step.</p>
          </div>
        </aside>
      </div>

      <footer className="workspace-footer"><Link className="workspace-brand" href="/"><span className="brand-mark" aria-hidden="true">✳</span><span>wonderfoundry<span className="wordmark-period">.</span></span></Link><span>MAKE IT STRANGE. MAKE IT YOURS.</span><Link href="/">Return to the playground ↑</Link></footer>
    </main>
  );
}
