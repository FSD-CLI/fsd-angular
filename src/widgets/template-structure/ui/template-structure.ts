import { ChangeDetectionStrategy, Component } from '@angular/core';

const LAYERS = [
  ['app', 'Bootstrap, providers, and global styles'],
  ['pages', 'Route-level screen composition'],
  ['widgets', 'Large reusable interface blocks'],
  ['features', 'User actions and business capabilities'],
  ['entities', 'Business objects and representations'],
  ['shared', 'Framework infrastructure and reusable UI'],
] as const;

@Component({
  selector: 'app-template-structure',
  template: `
    <section class="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <div class="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            Dependency direction
          </p>
          <h2 class="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            A structure that stays clear.
          </h2>
          <p class="mt-6 max-w-xl leading-7 text-stone-400">
            Higher layers compose lower layers. Angular route configuration stays in the app layer
            while FSD page slices expose explicit public APIs.
          </p>
        </div>

        <ol class="space-y-3" aria-label="Feature-Sliced Design layers">
          @for (layer of layers; track layer[0]; let index = $index) {
            <li
              class="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 transition hover:border-red-300/30 hover:bg-red-300/[0.05]"
            >
              <span class="font-mono text-sm text-stone-600">0{{ index + 1 }}</span>
              <div>
                <p class="font-mono text-base text-red-200">src/{{ layer[0] }}/</p>
                <p class="mt-1 text-sm text-stone-400">{{ layer[1] }}</p>
              </div>
            </li>
          }
        </ol>
      </div>

      <footer
        class="mt-24 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>FSD CLI · Angular template</p>
        <p>Standalone native. Architecture ready.</p>
      </footer>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateStructure {
  protected readonly layers = LAYERS;
}
