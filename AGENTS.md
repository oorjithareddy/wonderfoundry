# Wonderfoundry engineering notes

## Product intent
Build a playful creative studio that turns highly personal ideas into print-ready physical keepsakes. The experience should feel like an interactive editorial playground, not a conventional template marketplace.

## Technical constraints
- Keep the app as a modular monolith until a concrete scaling need justifies a separate service.
- Prefer TypeScript, small components, semantic HTML, accessible controls, and clear loading/error states.
- Use Motion for purposeful interactions; prefer CSS for simple decoration.
- Respect reduced-motion preferences and make key actions work on keyboard and touch screens.
- Keep creative output constrained to defined manufacturing formats and print-safe geometry when those features arrive.
- Start with mock/local logic. Do not add paid AI, payment, analytics, storage, or fulfilment credentials until the relevant feature is designed and tested.
- Do not create fake claims about AI generation, saving, production, checkout, or shipment. Clearly label prototype behaviour.

## Before finishing a change
Run npm run lint, npm run typecheck, and npm run build where the environment allows. Report any command that could not be run. Add or update tests when behaviour warrants it. Never commit secrets or user-uploaded assets.