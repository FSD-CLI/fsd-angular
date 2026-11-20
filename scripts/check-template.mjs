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
    apiClient: 'angular-http',
    serverState: 'angular-query',
    clientState: 'ngrx-signals',
    forms: 'angular-forms-zod',
    ui: 'shared-ui',
  };
  // Projects created with pnpm, yarn or bun record their manager here.
  assert.ok(
    ['npm', 'pnpm', 'yarn', 'bun'].includes(config.packageManager),
    `Unsupported packageManager: ${config.packageManager}`,
  );
  for (const [key, value] of Object.entries(expected)) {
    assert.equal(config[key], value, `Template config mismatch: ${key}`);
  }
  assert.deepEqual(
    Object.keys(config)
      .filter((key) => key !== '$schema' && key !== 'packageManager')
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
  const routes = read('src/app/app.routes.ts');
  assert.match(routes, /loadComponent/);
  // `create-fsd-architecture -g page` registers lazy routes between these markers.
  assert.match(
    routes,
    /\/\/ fsd-cli:routes:start\n[\s\S]*\/\/ fsd-cli:routes:end/,
    'Missing CLI route markers',
  );
  assert.match(read('src/shared/api/api-client.ts'), /HttpClient/);
  assert.match(read('src/app/app.config.ts'), /provideAppQuery/);

  // Zoneless: no zone.js dependency, polyfill, or zone-based change detection provider.
  for (const field of ['dependencies', 'devDependencies']) {
    assert.ok(!pkg[field]?.['zone.js'], `zone.js must not be in ${field} (template is zoneless)`);
  }
  const angularJson = read('angular.json');
  assert.doesNotMatch(angularJson, /zone\.js/, 'angular.json must not load zone.js polyfills');

  // Standalone + OnPush: every component under src is standalone and uses OnPush.
  const sourceFiles = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return sourceFiles(full);
      return entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts') ? [full] : [];
    });
  for (const file of sourceFiles(path.join(root, 'src'))) {
    const source = fs.readFileSync(file, 'utf8');
    const relative = path.relative(root, file);
    assert.doesNotMatch(source, /@NgModule\s*\(/, `NgModule is not allowed: ${relative}`);
    assert.doesNotMatch(source, /standalone:\s*false/, `Non-standalone component: ${relative}`);
    assert.doesNotMatch(
      source,
      /provideZoneChangeDetection\s*\(/,
      `Zone-based change detection is not allowed: ${relative}`,
    );
    if (/@Component\s*\(/.test(source)) {
      assert.match(
        source,
        /ChangeDetectionStrategy\.OnPush/,
        `Component must use OnPush change detection: ${relative}`,
      );
    }
  }
  return config;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkTemplate();
  console.log('Angular template contract passed.');
}
