/**
 * Print-aware creation data.
 * Sizes are provisional working targets, not vendor templates.
 */
export type ProductFormat = "book" | "deck" | "poster";
export type ArtDirection = "archive" | "electric" | "dreamy";

export interface ProductPalette {
  paper: string;
  ink: string;
  primary: string;
  accent: string;
}
export interface ProductThemeProfile {
  id: string;
  name: string;
  brief: string;
  scope: "product-artwork";
  palette: ProductPalette;
  referenceAssetPaths: readonly string[];
  assetPolicy: "moodboard-only";
}
export interface PrintSpecification {
  product: ProductFormat;
  label: string;
  trimWidthMm: number;
  trimHeightMm: number;
  bleedMm: number;
  safeAreaMm: number;
  targetDpi: number;
  preferredExport: "PDF";
  expectedColorMode: "CMYK";
  vendorVerified: false;
  caveat: string;
}
export interface ReferenceImageMetadata {
  widthPx: number;
  heightPx: number;
  sizeBytes: number;
  mimeType: string;
}
export interface ProductionDraftInput {
  idea: string;
  headline: string;
  subtitle?: string;
  product: ProductFormat;
  referenceImage?: ReferenceImageMetadata | null;
  theme?: ProductThemeProfile | null;
}
export interface ValidationIssue {
  code: string;
  message: string;
  severity: "error" | "warning";
}
export interface ProductionValidation {
  validBrief: boolean;
  printReady: false;
  product: ProductFormat | null;
  specification: PrintSpecification | null;
  canvasPixels: { widthPx: number; heightPx: number } | null;
  issues: ValidationIssue[];
  warnings: ValidationIssue[];
}

export const MAX_HEADLINE_LENGTH = 48;
export const MAX_SUBTITLE_LENGTH = 90;
export const MAX_BRIEF_LENGTH = 500;
export const MAX_REFERENCE_IMAGE_BYTES = 2 * 1024 * 1024;
export const TARGET_PRINT_DPI = 300;

/**
 * This is product-artwork inspiration only. Assets are not automatically
 * placed in compositions: a future creator flow must ask the user to choose
 * any image that should actually appear on a product.
 */
export const BURGUNDY_EDITORIAL_THEME: ProductThemeProfile = {
  id: "burgundy-editorial",
  name: "Burgundy / Black Cherry",
  brief:
    "Deep burgundy and black cherry, vintage cream paper, restrained antique brass, " +
    "romantic editorial print, tactile paper and archival details. Treat images as " +
    "a reference library, not a checklist. Do not automatically combine, repeat, " +
    "or place every object into the final composition; use only elements the " +
    "creator explicitly selects. Apply this direction to product artwork only.",
  scope: "product-artwork",
  palette: {
    paper: "#F2E7D8",
    ink: "#35171C",
    primary: "#761F2A",
    accent: "#B08B56",
  },
  referenceAssetPaths: [
    "/art/heart-vinyl-cutout.webp",
    "/art/leopard-cherries-cutout.webp",
    "/art/headphones-cutout.webp",
    "/art/wax-seal-cutout.webp",
    "/art/lily-cutout.webp",
  ],
  assetPolicy: "moodboard-only",
};

/**
 * Generic starting assumptions for layout maths only. Confirm exact size,
 * bleed, safe area, colour profile and exports against a selected printer.
 */
export const PRODUCT_PRINT_SPECIFICATIONS: Record<ProductFormat, PrintSpecification> = {
  book: {
    product: "book",
    label: "Mini book",
    trimWidthMm: 148,
    trimHeightMm: 210,
    bleedMm: 3,
    safeAreaMm: 5,
    targetDpi: TARGET_PRINT_DPI,
    preferredExport: "PDF",
    expectedColorMode: "CMYK",
    vendorVerified: false,
    caveat: "A5 is provisional. Page count, binding, cover and interior-file requirements are not yet matched to a printer.",
  },
  deck: {
    product: "deck",
    label: "Card deck",
    trimWidthMm: 63,
    trimHeightMm: 88,
    bleedMm: 3,
    safeAreaMm: 4,
    targetDpi: TARGET_PRINT_DPI,
    preferredExport: "PDF",
    expectedColorMode: "CMYK",
    vendorVerified: false,
    caveat: "63 × 88 mm is provisional. Card stock, corner radius, deck packaging and cutting template remain unverified.",
  },
  poster: {
    product: "poster",
    label: "Art print",
    trimWidthMm: 210,
    trimHeightMm: 297,
    bleedMm: 3,
    safeAreaMm: 5,
    targetDpi: TARGET_PRINT_DPI,
    preferredExport: "PDF",
    expectedColorMode: "CMYK",
    vendorVerified: false,
    caveat: "A4 is provisional. Paper stock, colour profile, bleed and PDF preset need the selected printer's current template.",
  },
};

export function getTargetCanvasPixels(product: ProductFormat): { widthPx: number; heightPx: number } {
  const spec = PRODUCT_PRINT_SPECIFICATIONS[product];
  return {
    widthPx: Math.ceil(((spec.trimWidthMm + 2 * spec.bleedMm) / 25.4) * spec.targetDpi),
    heightPx: Math.ceil(((spec.trimHeightMm + 2 * spec.bleedMm) / 25.4) * spec.targetDpi),
  };
}

export function validateProductionDraft(input: ProductionDraftInput): ProductionValidation {
  const issues: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const product = Object.prototype.hasOwnProperty.call(PRODUCT_PRINT_SPECIFICATIONS, input.product)
    ? input.product
    : null;
  const specification = product ? PRODUCT_PRINT_SPECIFICATIONS[product] : null;
  const canvasPixels = product ? getTargetCanvasPixels(product) : null;

  if (!product || !specification) {
    issues.push({
      code: "unsupported-product-format",
      message: "Choose a supported product format before preparing artwork.",
      severity: "error",
    });
  }

  const idea = typeof input.idea === "string" ? input.idea.trim() : "";
  const headline = typeof input.headline === "string" ? input.headline.trim() : "";
  const subtitle = typeof input.subtitle === "string" ? input.subtitle : "";

  if (!idea) {
    issues.push({ code: "missing-idea", message: "Add the idea or story that the product should express.", severity: "error" });
  } else if (idea.length > MAX_BRIEF_LENGTH) {
    issues.push({ code: "idea-too-long", message: `Keep the idea brief to ${MAX_BRIEF_LENGTH} characters or fewer.`, severity: "error" });
  }
  if (!headline) {
    issues.push({ code: "missing-headline", message: "Add a main title before preparing product artwork.", severity: "error" });
  } else if (headline.length > MAX_HEADLINE_LENGTH) {
    issues.push({ code: "headline-too-long", message: `Keep the main title to ${MAX_HEADLINE_LENGTH} characters or fewer.`, severity: "error" });
  }
  if (subtitle.length > MAX_SUBTITLE_LENGTH) {
    issues.push({ code: "subtitle-too-long", message: `Keep the subtitle to ${MAX_SUBTITLE_LENGTH} characters or fewer.`, severity: "error" });
  }
  if (input.theme && input.theme.scope !== "product-artwork") {
    issues.push({
      code: "invalid-theme-scope",
      message: "Product themes must affect the product artwork, not the storefront.",
      severity: "error",
    });
  }
  if (input.theme && input.theme.assetPolicy !== "moodboard-only") {
    issues.push({
      code: "invalid-reference-asset-policy",
      message: "Reference artwork must not be automatically placed in the final composition.",
      severity: "error",
    });
  }

  warnings.push({
    code: "vendor-spec-not-verified",
    message: "The size, bleed and safe area are provisional working targets, not verified printer specifications.",
    severity: "warning",
  });
  warnings.push({
    code: "print-export-not-generated",
    message: "This is a concept draft, not a print-ready export. Final layout, fonts, assets and PDF output still need checks.",
    severity: "warning",
  });
  warnings.push({
    code: "color-profile-unconfirmed",
    message: "CMYK conversion and the exact colour profile must be confirmed with the selected print vendor.",
    severity: "warning",
  });

  if (input.referenceImage) {
    const image = input.referenceImage;
    const metadataValid =
      Number.isFinite(image.widthPx) && Number.isFinite(image.heightPx) &&
      image.widthPx > 0 && image.heightPx > 0 &&
      Number.isFinite(image.sizeBytes) && image.sizeBytes > 0 &&
      typeof image.mimeType === "string" && image.mimeType.startsWith("image/");

    if (!metadataValid) {
      issues.push({
        code: "invalid-reference-image-metadata",
        message: "Reference image metadata is incomplete or invalid.",
        severity: "error",
      });
    } else {
      if (image.sizeBytes > MAX_REFERENCE_IMAGE_BYTES) {
        issues.push({
          code: "reference-image-too-large",
          message: "Reference images must be no larger than 2 MB for the current prototype.",
          severity: "error",
        });
      }
      if (canvasPixels && (image.widthPx < canvasPixels.widthPx || image.heightPx < canvasPixels.heightPx)) {
        warnings.push({
          code: "reference-image-below-target-resolution",
          message: `The image is ${image.widthPx} × ${image.heightPx}px; the provisional ${TARGET_PRINT_DPI} DPI canvas target is ${canvasPixels.widthPx} × ${canvasPixels.heightPx}px. It may be unsuitable as full-bleed artwork.`,
          severity: "warning",
        });
      }
    }
  }

  if (specification && !specification.vendorVerified) {
    warnings.push({ code: "vendor-template-required", message: specification.caveat, severity: "warning" });
  }

  return {
    validBrief: issues.length === 0,
    printReady: false,
    product,
    specification,
    canvasPixels,
    issues,
    warnings,
  };
}
