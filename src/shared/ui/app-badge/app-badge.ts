import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `
    <span
      class="inline-flex rounded-full border border-red-300/25 bg-red-300/10 px-3 py-1 text-xs font-medium text-red-100"
    >
      <ng-content />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBadge {}
