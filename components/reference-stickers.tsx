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

type StickerAsset = {
  file: string;
  index: number;
  label: string;
  directFile?: string;
};

const stickerData: Record<Exclude<ReferenceStickerKind, "leopard">, StickerAsset> = {
  headphones: {
    file: "a", index: 0, directFile: "headphones-cutout.webp",
    label: "Burgundy and cream headphones",
  },
  "heart-vinyl": {
    file: "a", index: 1, directFile: "heart-vinyl-cutout.webp",
    label: "Heart-shaped burgundy vinyl record",
  },
  dahlia: {
    file: "a", index: 2, directFile: "dahlia-cutout.webp",
    label: "Burgundy dahlia flower",
  },
  lily: {
    file: "a", index: 3, directFile: "lily-cutout.webp",
    label: "Dark red lily flower",
  },
  "leopard-cherries": {
    file: "a", index: 4, directFile: "leopard-cherries-cutout.webp",
    label: "Cherries with a leopard-print bow",
  },
  cocktail: {
    file: "b", index: 0, directFile: "cocktail-cutout.webp",
    label: "Cherry-red cocktail glass",
  },
  "music-player": {
    file: "b", index: 1, directFile: "music-player-cutout.webp",
    label: "Red retro music player",
  },
  guitar: {
    file: "b", index: 2, directFile: "guitar-cutout.webp",
    label: "Vintage red electric guitar",
  },
  "rose-bouquet": {
    file: "b", index: 3, directFile: "rose-bouquet-cutout.webp",
    label: "Antique rose bouquet",
  },
  seal: {
    file: "b", index: 4, directFile: "wax-seal-cutout.webp",
    label: "Burgundy wax seal",
  },
};

export function ReferenceSticker({ kind, className = "" }: StickerProps) {
  if (kind === "leopard") {
    return (
      <span
        className={`wf-sticker reference-sticker reference-sticker-photo ${className}`}
        role="img"
        aria-label="Leopard portrait against a dark burgundy background"
        style={{
          backgroundImage: "url('/art/leopard-portrait.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 58%",
        }}
      />
    );
  }

  const item = stickerData[kind];
  const style: CSSProperties = item.directFile
    ? {
        backgroundImage: `url('/art/${item.directFile}')`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }
    : {
        backgroundImage: `url('/art/reference-stickers-${item.file}.webp')`,
        backgroundPosition: `${item.index * 25}% center`,
        backgroundSize: "500% 100%",
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
