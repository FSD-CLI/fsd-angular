# FSD Angular Starter

A standalone Angular 22 starter organized with Feature-Sliced Design.
Angular is not registered in the current stable
[`create-fsd-architecture`](https://www.npmjs.com/package/create-fsd-architecture)
CLI. Clone this repository and use its local scripts to work with the starter.

## Included stack

- Angular 22 standalone components and lazy Router configuration
- Strict TypeScript and strict Angular templates
- Zoneless change detection and `OnPush` components
- Tailwind CSS 4
- Angular `HttpClient` using the Fetch backend
- TanStack Angular Query for server state
- NgRx Signal Store for client state
- Angular typed forms and Zod 4
- Vitest, Angular ESLint, Prettier, and Steiger
- Husky and Commitlint

## Requirements

- Node.js `22.22.3+`, `24.15.0+`, or `26+`
- npm 11.12.1, as pinned in `package.json`

Use the pinned runtime locally with:

```bash
nvm use
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4200](http://localhost:4200).

## Quality workflow

```bash
npm run fsd:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run ci
```

Production dependency audit:

```bash
npm run audit
```

## FSD structure

```text
src/
├── app/       # Angular bootstrap, providers, and routes
├── pages/     # Route-level compositions
├── widgets/   # Large reusable interface blocks
├── features/  # User actions and business capabilities
├── entities/  # Business objects
└── shared/    # Reusable API, config, model, types, and UI
```

The dependency direction runs from upper layers to lower layers. Each slice
exposes a public API through `index.ts`.

## Path aliases

The TypeScript configuration exposes `@app`, `@pages`, `@widgets`, `@features`,
`@entities`, and `@shared` aliases.

## Generate slices

Angular generators are not available in the current stable CLI. Create slices
manually using the structure and aliases above until an Angular adapter and
template registry entry are implemented and verified.

## Architecture checks

[Steiger](https://github.com/feature-sliced/steiger) validates FSD boundaries.
Angular ESLint validates TypeScript, inline templates, and accessibility rules.

## License

MIT

## Support FSD CLI

If this project helps you, you can optionally support its development:

- [GitHub Sponsors](https://github.com/sponsors/ashrafmo-1?frequency=one-time&sponsor=ashrafmo-1)
- [Buy Me a Coffee](https://buymeacoffee.com/ashrafqopiah)
- **InstaPay (Egypt):** `ashrafmo-1`

For InstaPay, use the username exactly as shown and verify the recipient details
in the app before confirming a transfer. Donations are optional.
