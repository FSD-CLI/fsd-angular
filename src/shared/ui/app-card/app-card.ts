import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <article
      class="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition hover:border-red-300/30 hover:bg-red-300/[0.045]"
    >
      <ng-content />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCard {}
