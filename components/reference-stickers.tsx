"use client";

import type { CSSProperties } from "react";

export type ReferenceStickerKind =
  | "headphones"
  | "heart-vinyl"
  | "dahlia"
  | "lily"
  | "leopard-cherries"
  | "cocktail"
  | "music-player"
  | "guitar"
  | "rose-bouquet"
  | "seal"
  | "leopard";

type StickerProps = {
  kind: ReferenceStickerKind;
  className?: string;
};

const spriteData: Partial<Record<ReferenceStickerKind, { file: string; index: number; label: string }>> = {
  headphones: { file: "a", index: 0, label: "Burgundy and cream headphones" },
  "heart-vinyl": { file: "a", index: 1, label: "Heart-shaped burgundy vinyl record" },
  dahlia: { file: "a", index: 2, label: "Burgundy dahlia flower" },
  lily: { file: "a", index: 3, label: "Dark red lily flower" },
  "leopard-cherries": { file: "a", index: 4, label: "Cherries with a leopard-print bow" },
  cocktail: { file: "b", index: 0, label: "Cherry-red cocktail glass" },
  "music-player": { file: "b", index: 1, label: "Red retro music player" },
  guitar: { file: "b", index: 2, label: "Vintage red electric guitar" },
  "rose-bouquet": { file: "b", index: 3, label: "Antique rose bouquet" },
  seal: { file: "b", index: 4, label: "Burgundy wax seal" },
};

export function ReferenceSticker({ kind, className = "" }: StickerProps) {
  if (kind === "leopard") {
    return (
      <span
        className={`wf-sticker reference-sticker reference-sticker-photo ${className}`}
        role="img"
        aria-label="Leopard portrait against a dark burgundy background"
        style={{ backgroundImage: "url('/art/leopard-portrait.webp')" } as CSSProperties}
      />
    );
  }

  const item = spriteData[kind];
  if (!item) return null;

  const style: CSSProperties = {
    backgroundImage: `url('/art/reference-stickers-${item.file}.webp')`,
    backgroundPosition: `${item.index * 25}% center`,
  };

  return (
    <span
      className={`wf-sticker reference-sticker ${className}`}
      role="img"
      aria-label={item.label}
      style={style}
    />
  );
}
