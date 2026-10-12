# Wonderfoundry

> A playful, AI-assisted creative studio for turning personal ideas into physical keepsakes.

Wonderfoundry is the temporary internal name for a creative-commerce project. The goal is to help people turn memories, inside jokes, imaginary concepts, and personal stories into distinctive printed products, with AI-assisted creation and external print-on-demand fulfilment.

## Product principles

- **Creative first:** the experience should feel like a playful creative playground, not a conventional product grid.
- **Purposeful whimsy:** use expressive interactions and motion to make exploration joyful without obstructing usability.
- **Manufacturable output:** creative freedom is bounded by real product formats, print dimensions, bleed, safe areas, and resolution requirements.
- **Low-operational overhead:** avoid holding inventory; validate vendors and fulfilment flows before accepting real orders.
- **Progressive complexity:** begin as a modular monolith and introduce infrastructure only when the workload requires it.
- **Privacy and safety:** protect uploaded assets and customer information, and never commit secrets or private production data.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS 4 plus custom CSS and design tokens
- Motion for React for purposeful animation
- SVG, Canvas, and React components for initial 2D design previews
- Git and GitHub as the source of truth
- Supabase/Postgres and protected object storage when persistence is introduced
- Provider-independent server-side AI integration
- Vercel for deployment when the local app is ready
- Payment, print-vendor, and shipping adapters selected only after integration and sample validation

## Local development

Requirements: Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Useful commands:

```sh
npm run lint
npm run typecheck
npm run build
```

The current homepage includes a front-end-only idea launcher. It does not call an AI model, save designs to a database, or create orders. This is intentional: validate the experience before adding paid services.

## Build sequence

1. Establish project conventions and the visual direction.
2. Build the home page and playful discovery experience.
3. Build the creative workspace: idea input, creative directions, asset upload, revision history, version comparison, and physical-product preview. Start with deterministic demo behaviour.
4. Add print-safe document models and validation.
5. Add persistence, authentication, saved designs, and secure file storage.
6. Add checkout and payment handling with verified webhooks and failure recovery.
7. Integrate print-on-demand and shipping providers behind adapters, after testing APIs and physical samples.
8. Deploy to staging, test end-to-end, and run a small pilot before broad launch.
9. Add operational and marketing automation with human approval for consequential actions.

## Safety and secrets

Never commit real API keys, customer uploads, payment secrets, or private production data. Use .env.local for local secrets and your hosting provider's secret manager in deployment. The .env.example file is safe to commit.

## Status

The repository contains an initial, untested application scaffold and visual prototype. Before treating it as production-ready, install dependencies and run lint, type-check, and production build locally.