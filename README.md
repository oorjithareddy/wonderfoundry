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

## Planned stack

- Next.js App Router, React, TypeScript
- Tailwind CSS plus custom CSS and design tokens
- Motion for React (`motion/react`) for purposeful animations
- SVG, Canvas, and React components for initial 2D design previews
- Git and GitHub as the source of truth
- Supabase/Postgres and protected object storage when persistence is introduced
- Provider-independent server-side AI integration
- Vercel for deployment when the local app is ready
- Payment, print-vendor, and shipping adapters selected only after integration and sample validation

Avoid adding dependencies or external services before a concrete need has been validated.

## Build sequence

1. Establish the design direction, project conventions, and local development setup.
2. Build the home page and playful discovery experience.
3. Build a creative workspace with idea input, direction selection, asset upload, revision history, version comparison, and a physical-product preview. Use mocked generation before integrating paid AI services.
4. Add print-safe document models and validation.
5. Add persistence, authentication, saved designs, and secure file storage.
6. Add checkout and payment handling with verified webhooks and failure recovery.
7. Integrate print-on-demand and shipping providers behind adapters, after testing APIs and physical samples.
8. Deploy to a staging environment, test end-to-end, and run a small pilot before broad launch.
9. Add operational and marketing automation with human approval for consequential actions.

## Repository status

This repository starts with the project blueprint only. The application scaffold and dependencies have not yet been generated or tested. Initial development should happen locally, with changes committed to this repository in small, verifiable steps.

## Local setup (planned)

Once the Next.js scaffold is committed:

```bash
npm install
npm run dev
```

See the project documentation and example environment file before adding any integrations. Never commit real API keys; use `.env.local` locally and the deployment platform's secret manager in hosted environments.
