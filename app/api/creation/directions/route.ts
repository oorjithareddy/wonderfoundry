import { NextResponse } from "next/server";
import {
  generateCreativeDirections,
  isProductFormat,
  MAX_CREATIVE_IDEA_LENGTH,
} from "@/lib/creative-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 12 * 1024;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function responseError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return responseError("Request body is too large.", 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return responseError("Could not read the request body.", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return responseError("Request body is too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return responseError("Send a valid JSON request body.", 400);
  }
  if (!isRecord(body)) {
    return responseError("The request body must be a JSON object.", 400);
  }

  if (typeof body.idea !== "string") {
    return responseError("An idea string is required.", 400);
  }
  if (body.idea.trim().length < 3 || body.idea.trim().length > MAX_CREATIVE_IDEA_LENGTH) {
    return responseError("Keep the idea between 3 and 500 characters.", 422);
  }

  let product: "book" | "deck" | "poster" | undefined;
  if (body.product !== undefined && body.product !== null && body.product !== "") {
    if (!isProductFormat(body.product)) {
      return responseError("Product must be book, deck, or poster.", 422);
    }
    product = body.product;
  }

  let themeId: string | null = null;
  if (body.themeId !== undefined && body.themeId !== null && body.themeId !== "") {
    if (typeof body.themeId !== "string" || body.themeId !== "burgundy-editorial") {
      return responseError("Unknown theme. Omit themeId or use 'burgundy-editorial'.", 422);
    }
    themeId = body.themeId;
  }

  try {
    const result = await generateCreativeDirections({ idea: body.idea, product, themeId });
    return NextResponse.json({ ok: true, result }, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create directions.";
    return responseError(message, 422);
  }
}
