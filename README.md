# FSD Angular Starter

An Angular 22 starter with a complete Feature-Sliced Design
architecture. Angular integration with
[`create-fsd-architecture`](https://www.npmjs.com/package/create-fsd-architecture)
is planned; published CLI 2.6.1 does not register an Angular template.

## Validation scope

This is a starter template. Repository quality checks cover the checked-in
example; production deployment requires validating your application, runtime,
API integration, authentication, and hosting configuration. CLI support and
release verification are documented at [fsdcli.me](https://fsdcli.me).

Security snapshot (2026-10-06): The production audit passes with zero findings after a Solid-scoped Seroval 1.6.8 override. `npm run test:serialization` verifies rejection of the advisory payloads and preserves ordinary/plugin/SSR serialization; it runs in quality and security CI. The override is required while Solid pins the vulnerable 1.5.x range. Development-only audit findings remain separate. See [SECURITY.md](SECURITY.md) and the linked cross-repository inventory.

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
- npm 11 (the package manager used by this standalone template)

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
