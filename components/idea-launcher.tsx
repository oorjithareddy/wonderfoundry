"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";

type Direction = {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: string;
  product: "book" | "deck" | "poster";
};

type DirectionsResponse = {
  ok: boolean;
  result?: {
    mode: "demo" | "ai";
    provider: string;
    notice?: string;
    directions: Direction[];
  };
  error?: string;
};

export function IdeaLauncher() {
  const [idea, setIdea] = useState("");
  const [submittedIdea, setSubmittedIdea] = useState("");
  const [directions, setDirections] = useState<Direction[]>([]);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [mode, setMode] = useState<"demo" | "ai">("demo");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const selected = directions.find((direction) => direction.id === selectedDirection) ?? directions[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanIdea = idea.trim();
    if (cleanIdea.length < 3 || isLoading) return;

    setIsLoading(true);
    setError("");
    setNotice("");
    setSubmittedIdea(cleanIdea);
    setDirections([]);
    setSelectedDirection("");

    try {
      const response = await fetch("/api/creation/directions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idea: cleanIdea }),
        cache: "no-store",
      });
      const payload = await response.json() as DirectionsResponse;
      if (!response.ok || !payload.ok || !payload.result) {
        throw new Error(payload.error ?? "We couldn't find a direction just now. Please try again.");
      }
      setDirections(payload.result.directions);
      setMode(payload.result.mode);
      setNotice(payload.result.notice ?? "");
      setSelectedDirection(payload.result.directions[0]?.id ?? "");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We couldn't find a direction just now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="idea-panel">
      <form className="idea-form" onSubmit={handleSubmit}>
        <label htmlFor="idea-input">THE RAW IDEA <span>NO NEED TO OVERTHINK IT</span></label>
        <textarea
          id="idea-input"
          value={idea}
          onChange={(event) => setIdea(event.target.value)}
          placeholder="A field guide to my best friend, ranked by snack loyalty…"
          maxLength={500}
          rows={4}
          required
          minLength={3}
          aria-describedby="idea-form-hint"
        />
        <div className="idea-form-footer"><span id="idea-form-hint">{idea.length}/500</span><button className="button button-lime" type="submit" disabled={idea.trim().length < 3 || isLoading}>{isLoading ? "Finding ideas…" : "Find a direction"} <span aria-hidden="true">↗</span></button></div>
      </form>

      {isLoading ? (
        <div className="idea-empty-state" role="status" aria-live="polite"><span className="empty-spark" aria-hidden="true">✳</span><p>Turning your idea around.<br /><strong>Finding three ways into it…</strong></p><span className="empty-arrow" aria-hidden="true">↗</span></div>
      ) : error ? (
        <div className="idea-empty-state" role="alert"><span className="empty-spark" aria-hidden="true">✳</span><p>We hit a little snag.<br /><strong>{error}</strong></p><span className="empty-arrow" aria-hidden="true">↗</span></div>
      ) : submittedIdea && directions.length > 0 ? (
        <motion.div className="direction-results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} aria-live="polite">
          <div className="results-heading"><span>THREE WAYS TO PLAY WITH IT</span><span className="results-idea">“{submittedIdea}”</span></div>
          <div className="direction-list">
            {directions.map((direction, index) => (
              <motion.button
                className={`direction-option ${selectedDirection === direction.id ? "is-selected" : ""}`}
                type="button"
                key={direction.id}
                onClick={() => setSelectedDirection(direction.id)}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.22 }}
                aria-pressed={selectedDirection === direction.id}
              >
                <span className="direction-icon" aria-hidden="true">{direction.icon}</span>
                <span className="direction-text"><span className="direction-label">{direction.label}</span><strong>{direction.title}</strong><small>{direction.description}</small></span>
                <span className="direction-check" aria-hidden="true">{selectedDirection === direction.id ? "✓" : "↗"}</span>
              </motion.button>
            ))}
          </div>
          <p className="selected-note"><span className="status-dot" /> {mode === "ai" ? "AI-GENERATED DRAFT" : "DEMO DIRECTIONS"}: <strong>{selected?.title ?? "Choose a direction"}</strong> <span>{notice || (mode === "demo" ? "— rule-based preview; no AI provider is configured." : "— review and revise before use.")}</span></p>
        </motion.div>
      ) : (
        <div className="idea-empty-state"><span className="empty-spark" aria-hidden="true">✳</span><p>Your idea goes here.<br /><strong>Three possible directions come back.</strong></p><span className="empty-arrow" aria-hidden="true">↖</span></div>
      )}
    </div>
  );
}
