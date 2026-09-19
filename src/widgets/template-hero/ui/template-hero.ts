import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { templateInfo } from '@shared/config';
import { AppPreferencesStore } from '@shared/model';
import { AppBadge } from '@shared/ui';

@Component({
  selector: 'app-template-hero',
  imports: [AppBadge],
  template: `
    <header class="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-6 py-20 lg:px-8">
      <nav class="mb-20 flex items-center justify-between" aria-label="Primary navigation">
        <a class="flex items-center gap-3 font-semibold tracking-tight" href="#top">
          <span
            class="grid size-9 place-items-center rounded-xl border border-red-300/30 bg-red-300/10 text-red-200"
            >F</span
          >
          FSD CLI
        </a>
        <a
          class="rounded-full border border-white/15 px-4 py-2 text-sm text-red-100 transition hover:border-red-300/50 hover:text-white"
          href="https://fsd-docs.vercel.app"
        >
          Documentation
        </a>
      </nav>

      <div id="top" class="max-w-4xl">
        <div class="flex flex-wrap gap-2">
          <app-badge>{{ info.framework }} · TypeScript · FSD</app-badge>
          @for (item of info.stack; track item) {
            <app-badge>{{ item }}</app-badge>
          }
        </div>

        <h1
          class="mt-8 text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-7xl"
        >
          Angular architecture that is <span class="text-red-300">ready to scale.</span>
        </h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
          Standalone Angular, signals, complete Feature-Sliced Design layers, and production
          guardrails from the first commit.
        </p>

        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <code
            class="rounded-xl border border-red-300/25 bg-red-300/8 px-5 py-3.5 text-sm text-red-100 sm:text-base"
            >{{ info.commands.generateFeature }}</code
          >
          <button
            type="button"
            class="rounded-xl bg-red-300 px-5 py-3.5 text-center text-sm font-semibold text-red-950 transition hover:bg-red-200 sm:text-base"
            [attr.aria-pressed]="preferences.showDetails()"
            (click)="preferences.toggleDetails()"
          >
            {{ preferences.showDetails() ? 'Hide details' : 'Show details' }}
          </button>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateHero {
  protected readonly info = templateInfo;
  protected readonly preferences = inject(AppPreferencesStore);
}
