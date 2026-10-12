import test from "node:test";
import assert from "node:assert/strict";
import {
  buildDemoCreativeDirections,
  generateCreativeDirections,
} from "../lib/creative-engine.ts";

const idea = "A field guide to my best friend, ranked by snack loyalty.";

test("exploratory demo returns three varied formats without claiming AI generation", async () => {
  const result = await generateCreativeDirections({ idea }, { env: { AI_PROVIDER: "demo" } });
  assert.equal(result.mode, "demo");
  assert.equal(result.printReady, false);
  assert.equal(result.directions.length, 3);
  assert.deepEqual(result.directions.map((direction) => direction.product), ["book", "deck", "poster"]);
  assert.equal(new Set(result.directions.map((direction) => direction.title)).size, 3);
  assert.match(result.notice, /rule-based previews/i);
});

test("selected product is respected across three creative routes", async () => {
  const result = buildDemoCreativeDirections({ idea, product: "deck" });
  assert.equal(result.directions.length, 3);
  assert.ok(result.directions.every((direction) => direction.product === "deck"));
  assert.equal(new Set(result.directions.map((direction) => direction.title)).size, 3);
});

test("themes apply to the artwork and reference assets remain unselected", async () => {
  const result = buildDemoCreativeDirections({ idea, product: "poster", themeId: "burgundy-editorial" });
  assert.equal(result.theme?.id, "burgundy-editorial");
  assert.equal(result.theme?.assetPolicy, "moodboard-only");
  assert.ok(result.directions.every((direction) => direction.selectedReferenceAssets.length === 0));
  assert.ok(result.directions.every((direction) => /product artwork only/i.test(direction.visualApproach)));
});

test("input validation rejects short briefs and unsupported formats", async () => {
  await assert.rejects(
    () => generateCreativeDirections({ idea: "x" }, { env: { AI_PROVIDER: "demo" } }),
    /between 3 and 500 characters/i,
  );
  await assert.rejects(
    () => generateCreativeDirections({ idea, product: "mug" }, { env: { AI_PROVIDER: "demo" } }),
    /unsupported product format/i,
  );
});

test("incomplete AI configuration returns a clearly labelled demo fallback", async () => {
  const result = await generateCreativeDirections(
    { idea, product: "book" },
    { env: { AI_PROVIDER: "openai-compatible", AI_MODEL: "model" } },
  );
  assert.equal(result.mode, "demo");
  assert.match(result.notice, /not configured correctly/i);
});

test("valid compatible-provider JSON is normalized to safe typed directions", async () => {
  const modelPayload = {
    ideaSummary: "A snack-loyalty field guide.",
    directions: [
      { id: "one", product: "book", title: "Archive", concept: "A personal archive of snack lore.", visualApproach: "Editorial type with ample space.", suggestedDetails: ["Quotes", "Rankings"], productionFit: "A booklet with a separate cover." },
      { id: "two", product: "book", title: "After Hours", concept: "A night-time chronicle of the friendship.", visualApproach: "A bold cover and small captions.", suggestedDetails: ["Sections", "Footnotes"], productionFit: "An interior and cover file are needed." },
      { id: "three", product: "book", title: "Field Notes", concept: "A playful scientific study of snack loyalty.", visualApproach: "Index labels, diagrams and notes.", suggestedDetails: ["Scores", "Observations"], productionFit: "A structured booklet." },
    ],
  };
  let sentBody;
  const fetcher = async (url, init) => {
    assert.equal(url, "https://example.test/v1/chat/completions");
    assert.equal(init.method, "POST");
    assert.match(init.headers.authorization, /^Bearer /);
    sentBody = JSON.parse(init.body);
    return new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify(modelPayload) } }],
    }), { status: 200, headers: { "content-type": "application/json" } });
  };
  const result = await generateCreativeDirections(
    { idea, product: "book" },
    {
      env: {
        AI_PROVIDER: "openai-compatible",
        AI_API_KEY: "test-only-key",
        AI_BASE_URL: "https://example.test/v1",
        AI_MODEL: "test-model",
      },
      fetcher,
    },
  );
  assert.equal(result.mode, "ai");
  assert.equal(result.directions.length, 3);
  assert.equal(result.directions[0].title, "Archive");
  assert.equal(result.printReady, false);
  assert.equal(sentBody.model, "test-model");
  assert.equal(sentBody.response_format.type, "json_object");
});

test("malformed or failed provider output falls back transparently", async () => {
  const result = await generateCreativeDirections(
    { idea },
    {
      env: {
        AI_PROVIDER: "openai-compatible",
        AI_API_KEY: "test-only-key",
        AI_BASE_URL: "https://example.test/v1",
        AI_MODEL: "test-model",
      },
      fetcher: async () => new Response("provider unavailable", { status: 503 }),
    },
  );
  assert.equal(result.mode, "demo");
  assert.match(result.notice, /AI generation was unavailable/i);
  assert.equal(result.directions.length, 3);
});

test("AI output with duplicate ids or invalid product is rejected to demo fallback", async () => {
  const modelPayload = {
    ideaSummary: "An idea",
    directions: [
      { id: "same", product: "book", title: "First", concept: "First concept.", visualApproach: "Editorial layout.", suggestedDetails: ["A", "B"], productionFit: "Booklet." },
      { id: "same", product: "book", title: "Second", concept: "Second concept.", visualApproach: "Poster look.", suggestedDetails: ["C", "D"], productionFit: "Booklet." },
      { id: "three", product: "book", title: "Third", concept: "Third concept.", visualApproach: "Type-led design.", suggestedDetails: ["E", "F"], productionFit: "Booklet." },
    ],
  };
  const result = await generateCreativeDirections(
    { idea },
    {
      env: {
        AI_PROVIDER: "openai-compatible",
        AI_API_KEY: "test-only-key",
        AI_BASE_URL: "https://example.test/v1",
        AI_MODEL: "test-model",
      },
      fetcher: async () => new Response(JSON.stringify({
        choices: [{ message: { content: JSON.stringify(modelPayload) } }],
      }), { status: 200, headers: { "content-type": "application/json" } }),
    },
  );
  assert.equal(result.mode, "demo");
  assert.match(result.notice, /invalid response/i);
});

test("unknown themes cannot silently become another theme", async () => {
  await assert.rejects(
    () => generateCreativeDirections({ idea, themeId: "unknown-theme" }, { env: { AI_PROVIDER: "demo" } }),
    /unsupported product theme/i,
  );
});
