import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function checkTemplate(root = fileURLToPath(new URL('../', import.meta.url))) {
  const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
  const config = JSON.parse(read('fsd.config.json'));
  const expected = {
    schemaVersion: 1,
    framework: 'angular',
    packageManager: 'npm',
    apiClient: 'angular-http',
    serverState: 'angular-query',
    clientState: 'ngrx-signals',
    forms: 'angular-forms-zod',
    ui: 'shared-ui',
  };
  for (const [key, value] of Object.entries(expected)) {
    assert.equal(config[key], value, `Template config mismatch: ${key}`);
  }
  assert.deepEqual(
    Object.keys(config)
      .filter((key) => key !== '$schema')
      .sort(),
    Object.keys(expected).sort(),
    'Unexpected config property',
  );
  const pkg = JSON.parse(read('package.json'));
  for (const dependency of [
    '@angular/core',
    '@angular/common',
    '@angular/router',
    '@angular/forms',
    '@tanstack/angular-query-experimental',
    '@ngrx/signals',
    'zod',
  ]) {
    assert.ok(pkg.dependencies[dependency], `Missing dependency: ${dependency}`);
  }
  const tsconfig = JSON.parse(read('tsconfig.json').replace(/\/\*[\s\S]*?\*\//g, ''));
  for (const layer of ['app', 'pages', 'widgets', 'features', 'entities', 'shared']) {
    assert.ok(
      fs.statSync(path.join(root, 'src', layer)).isDirectory(),
      `Missing FSD layer: ${layer}`,
    );
    assert.deepEqual(
      tsconfig.compilerOptions.paths[`@${layer}/*`],
      [`./src/${layer}/*`],
      `Invalid alias: ${layer}`,
    );
  }
  for (const entry of [
    'src/main.ts',
    'src/app/app.ts',
    'src/app/app.config.ts',
    'src/app/app.routes.ts',
    'src/pages/welcome/index.ts',
  ]) {
    assert.ok(fs.statSync(path.join(root, entry)).isFile(), `Missing entrypoint: ${entry}`);
  }
  assert.match(read('src/main.ts'), /bootstrapApplication/);
  assert.match(read('src/app/app.routes.ts'), /loadComponent/);
  assert.match(read('src/shared/api/api-client.ts'), /HttpClient/);
  assert.match(read('src/app/app.config.ts'), /provideAppQuery/);
  return config;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkTemplate();
  console.log('Angular template contract passed (inspection only; generators unavailable).');
}
