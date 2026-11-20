# FSD Angular Starter

A standalone Angular 22 starter organized with Feature-Sliced Design.
Create a project from it with
[`create-fsd-architecture`](https://www.npmjs.com/package/create-fsd-architecture)
(a CLI release that includes Angular support):

```bash
npx create-fsd-architecture my-app --framework angular
```

## Template contract

`fsd.config.json` records the Angular-native stack. `npm run check:template`
checks the configuration, dependencies, six layers, aliases, and application
entrypoints. The CLI uses it to configure new projects, generate slices and
plan managed upgrades.

## Validation scope

This starter includes local quality checks. Application-specific security,
authentication, backend integration and deployment need their own validation.
Passing template checks does not certify production deployment.

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

```bash
npx create-fsd-architecture -g feature checkout
npx create-fsd-architecture -g entity product
npx create-fsd-architecture -g widget navbar
npx create-fsd-architecture -g page account
npx create-fsd-architecture -g feature auth
npx create-fsd-architecture -g shared ui
```

Generated slices are standalone `OnPush` components with signal inputs. Features
use TanStack Angular Query `inject*` helpers and an NgRx Signal Store; `feature
auth` adds typed reactive forms validated with zod. `-g page` registers a lazy
route between the `fsd-cli:routes` markers in `src/app/app.routes.ts`.

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

## Git workflow policy

Git and Conventional Commits remain part of setup. Pre-commit checks staged and
working-tree whitespace; full builds run in CI. Set `FSD_PRE_COMMIT_LINT=1` to
run lint on commit or `FSD_PRE_PUSH_CHECKS=1` to run lint/build on push.
For an intentional emergency bypass, Husky supports `HUSKY=0 git commit ...`;
CI remains the required quality gate and failures must still be resolved.

Auto-PR and PR labeling are optional. The React template keeps reviewed examples
in `.github/optional-workflows/`; copy a chosen file into `.github/workflows/`
to enable it. Auto-PR is manual (`workflow_dispatch`) and needs repository
permission to create PRs. Labeler needs `.github/labeler.yml`, the labels
`documentation`, `source`, `ci`, and Actions permission to apply labels.
Do not enable automation before configuring its permissions and labels.
