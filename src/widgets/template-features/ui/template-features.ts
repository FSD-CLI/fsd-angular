import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppPreferencesStore } from '@shared/model';
import { AppCard } from '@shared/ui';

const FEATURES = [
  {
    eyebrow: 'Architecture',
    title: 'Complete FSD layers',
    description:
      'App, pages, widgets, features, entities, and shared are ready before the first feature lands.',
  },
  {
    eyebrow: 'Angular native',
    title: 'Standalone and zoneless',
    description:
      'Lazy routes, signals, OnPush components, HttpClient, and strict templates follow Angular 22 conventions.',
  },
  {
    eyebrow: 'State',
    title: 'Query + Signal Store',
    description:
      'TanStack Angular Query owns server state while NgRx Signal Store keeps client state explicit.',
  },
  {
    eyebrow: 'Guardrails',
    title: 'Steiger + Angular ESLint',
    description:
      'Architecture, lint, types, Vitest, production build, audit, and commit checks are ready for CI.',
  },
] as const;

@Component({
  selector: 'app-template-features',
  imports: [AppCard],
  template: `
    @if (preferences.showDetails()) {
      <section class="border-y border-white/10 bg-white/[0.025] py-24">
        <div class="mx-auto max-w-6xl px-6 lg:px-8">
          <div class="mb-12 max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
              Angular without the setup debt
            </p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Framework conventions and architecture boundaries together.
            </h2>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            @for (feature of features; track feature.title) {
              <app-card>
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-red-300">
                  {{ feature.eyebrow }}
                </p>
                <h3 class="mt-4 text-xl font-semibold text-white">{{ feature.title }}</h3>
                <p class="mt-3 leading-7 text-stone-400">{{ feature.description }}</p>
              </app-card>
            }
          </div>
        </div>
      </section>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFeatures {
  protected readonly features = FEATURES;
  protected readonly preferences = inject(AppPreferencesStore);
}
