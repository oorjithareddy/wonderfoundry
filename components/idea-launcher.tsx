"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion } from "motion/react";

type Direction = {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: string;
};

function getDirections(idea: string): Direction[] {
  const aboutPet = /pet|dog|cat|puppy|kitten|rabbit|bird/i.test(idea);
  const aboutPeople = /friend|sister|brother|mum|mom|dad|partner|girlfriend|boyfriend|family|people|roommate/i.test(idea);
  const subject = aboutPet ? "your favourite creature" : aboutPeople ? "your people" : "your very specific idea";

  return [
    {
      id: "field-guide",
      title: aboutPet ? "The Pet Field Guide" : "The Field Guide",
      label: "MINI BOOK",
      description: `A tiny guide to ${subject}: habits, lore, quotes and extremely scientific observations.`,
      icon: "▤",
    },
    {
      id: "lore-deck",
      title: "The Lore Deck",
      label: "CARD SET",
      description: "A deck of prompts, rankings and facts that deserve to become permanent group canon.",
      icon: "▧",
    },
    {
      id: "cover-story",
      title: "The Cover Story",
      label: "POSTER / ZINE",
      description: "Turn the idea into an imaginary magazine cover, feature story or wall-worthy artefact.",
      icon: "▣",
    },
  ];
}

export function IdeaLauncher() {
  const [idea, setIdea] = useState("");
  const [submittedIdea, setSubmittedIdea] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("field-guide");
  const directions = useMemo(() => getDirections(submittedIdea), [submittedIdea]);
  const selected = directions.find((direction) => direction.id === selectedDirection) ?? directions[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanIdea = idea.trim();
    if (!cleanIdea) return;
    setSubmittedIdea(cleanIdea);
    setSelectedDirection("field-guide");
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
        />
        <div className="idea-form-footer"><span>{idea.length}/500</span><button className="button button-lime" type="submit" disabled={!idea.trim()}>Find a direction <span aria-hidden="true">↗</span></button></div>
      </form>

      {submittedIdea ? (
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
          <p className="selected-note"><span className="status-dot" /> DIRECTION SELECTED: <strong>{selected.title}</strong> <span>— this is a local demo; nothing has been saved.</span></p>
        </motion.div>
      ) : (
        <div className="idea-empty-state"><span className="empty-spark" aria-hidden="true">✳</span><p>Your idea goes here.<br /><strong>Three possible directions come back.</strong></p><span className="empty-arrow" aria-hidden="true">↖</span></div>
      )}
    </div>
  );
}
