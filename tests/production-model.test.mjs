import test from "node:test";
import assert from "node:assert/strict";
import {
  BURGUNDY_EDITORIAL_THEME,
  PRODUCT_PRINT_SPECIFICATIONS,
  getTargetCanvasPixels,
  validateProductionDraft,
} from "../lib/production-model.ts";

const goodDraft = {
  idea: "A personal field guide to my best friend.",
  headline: "FIELD GUIDE TO MY PEOPLE",
  subtitle: "OBSERVATIONS · LORE · LEGEND",
  product: "book",
};

test("all supported formats have explicitly provisional print dimensions", () => {
  for (const product of ["book", "deck", "poster"]) {
    const spec = PRODUCT_PRINT_SPECIFICATIONS[product];
    assert.ok(spec.trimWidthMm > 0);
    assert.ok(spec.trimHeightMm > 0);
    assert.ok(spec.bleedMm >= 0);
    assert.ok(spec.safeAreaMm >= 0);
    assert.equal(spec.targetDpi, 300);
    assert.equal(spec.vendorVerified, false);
  }
});

test("target pixel dimensions include bleed at 300 DPI", () => {
  const pixels = getTargetCanvasPixels("poster");
  assert.equal(pixels.widthPx, Math.ceil(((210 + 6) / 25.4) * 300));
  assert.equal(pixels.heightPx, Math.ceil(((297 + 6) / 25.4) * 300));
});

test("a complete creative brief is valid as a concept but never print-ready", () => {
  const result = validateProductionDraft(goodDraft);
  assert.equal(result.validBrief, true);
  assert.equal(result.printReady, false);
  assert.ok(result.warnings.some((warning) => warning.code === "vendor-spec-not-verified"));
  assert.ok(result.warnings.some((warning) => warning.code === "print-export-not-generated"));
});

test("missing idea or title blocks brief validation", () => {
  const missingIdea = validateProductionDraft({ ...goodDraft, idea: " " });
  const missingTitle = validateProductionDraft({ ...goodDraft, headline: "" });
  assert.equal(missingIdea.validBrief, false);
  assert.ok(missingIdea.issues.some((issue) => issue.code === "missing-idea"));
  assert.equal(missingTitle.validBrief, false);
  assert.ok(missingTitle.issues.some((issue) => issue.code === "missing-headline"));
});

test("copy length rules match the current creative workspace limits", () => {
  assert.ok(validateProductionDraft({ ...goodDraft, headline: "x".repeat(49) }).issues.some((issue) => issue.code === "headline-too-long"));
  assert.ok(validateProductionDraft({ ...goodDraft, subtitle: "x".repeat(91) }).issues.some((issue) => issue.code === "subtitle-too-long"));
});

test("small references generate a print-resolution warning", () => {
  const result = validateProductionDraft({
    ...goodDraft, product: "poster",
    referenceImage: { widthPx: 640, heightPx: 480, sizeBytes: 100_000, mimeType: "image/jpeg" },
  });
  assert.ok(result.warnings.some((warning) => warning.code === "reference-image-below-target-resolution"));
});

test("the burgundy profile stays product-only and does not auto-place assets", () => {
  assert.equal(BURGUNDY_EDITORIAL_THEME.scope, "product-artwork");
  assert.equal(BURGUNDY_EDITORIAL_THEME.assetPolicy, "moodboard-only");
  assert.ok(BURGUNDY_EDITORIAL_THEME.referenceAssetPaths.length > 0);
  assert.match(BURGUNDY_EDITORIAL_THEME.brief, /Do not automatically combine/i);
});

test("unknown runtime product formats are rejected", () => {
  const result = validateProductionDraft({ ...goodDraft, product: "mug" });
  assert.equal(result.validBrief, false);
  assert.equal(result.product, null);
  assert.ok(result.issues.some((issue) => issue.code === "unsupported-product-format"));
});

test("oversized images are rejected before production", () => {
  const result = validateProductionDraft({
    ...goodDraft,
    referenceImage: { widthPx: 2000, heightPx: 3000, sizeBytes: 2 * 1024 * 1024 + 1, mimeType: "image/png" },
  });
  assert.ok(result.issues.some((issue) => issue.code === "reference-image-too-large"));
});
