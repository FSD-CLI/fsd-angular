# FSD Angular Starter

A production-ready Angular 22 starter with a complete Feature-Sliced Design
architecture. It is the Angular template used by
[`create-fsd-architecture`](https://www.npmjs.com/package/create-fsd-architecture).

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
- npm 11 or another package manager selected through the FSD CLI

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

After this template is added to the stable CLI registry, generators will create
Angular-native standalone components and lazy route entries:

```bash
npx create-fsd-architecture -g feature auth
npx create-fsd-architecture -g entity product
npx create-fsd-architecture -g widget navbar
npx create-fsd-architecture -g page account
```

## Architecture checks

[Steiger](https://github.com/feature-sliced/steiger) validates FSD boundaries.
Angular ESLint validates TypeScript, inline templates, and accessibility rules.

## License

MIT
