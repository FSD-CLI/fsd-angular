export const templateInfo = {
  framework: 'Angular 22',
  architecture: 'Feature-Sliced Design',
  stack: ['Standalone', 'Signals', 'Zoneless', 'Vitest'],
  commands: {
    generateFeature: 'npx create-fsd-architecture -g feature checkout',
    verify: 'npm run ci',
  },
} as const;
