import {
  BURGUNDY_EDITORIAL_THEME,
  validateProductionDraft,
  type ProductFormat,
  type ReferenceImageMetadata,
} from "@/lib/production-model";

const MAX_REQUEST_BYTES = 16 * 1024;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

/**
 * Stateless validation only. This route does not save the idea, reference
 * image, theme, or validation response to a database or object store.
 */
export async function POST(request: Request): Promise<Response> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return json({ error: "Request body is too large." }, 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return json({ error: "Could not read the request body." }, 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return json({ error: "Request body is too large." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return json({ error: "Send a valid JSON request body." }, 400);
  }

  if (!isRecord(body)) {
    return json({ error: "The request body must be a JSON object." }, 400);
  }

  if (
    typeof body.idea !== "string" ||
    typeof body.headline !== "string" ||
    (body.subtitle !== undefined && typeof body.subtitle !== "string") ||
    typeof body.product !== "string"
  ) {
    return json({
      error: "Expected idea, headline, product, and an optional subtitle string.",
    }, 400);
  }

  let theme = null;
  if (body.themeId !== undefined && body.themeId !== null) {
    if (body.themeId !== BURGUNDY_EDITORIAL_THEME.id) {
      return json({ error: "Unknown themeId. Omit it or use 'burgundy-editorial'." }, 400);
    }
    theme = BURGUNDY_EDITORIAL_THEME;
  }

  let referenceImage: ReferenceImageMetadata | null = null;
  if (body.referenceImage !== undefined && body.referenceImage !== null) {
    if (!isRecord(body.referenceImage)) {
      return json({ error: "referenceImage must contain image metadata." }, 400);
    }
    referenceImage = body.referenceImage as unknown as ReferenceImageMetadata;
  }

  const validation = validateProductionDraft({
    idea: body.idea,
    headline: body.headline,
    subtitle: typeof body.subtitle === "string" ? body.subtitle : "",
    product: body.product as ProductFormat,
    referenceImage,
    theme,
  });

  return json({
    ok: validation.validBrief,
    validation,
  }, validation.validBrief ? 200 : 422);
}
