import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TemplateFeatures } from '@widgets/template-features';
import { TemplateHero } from '@widgets/template-hero';
import { TemplateStructure } from '@widgets/template-structure';

@Component({
  selector: 'app-welcome-page',
  imports: [TemplateHero, TemplateFeatures, TemplateStructure],
  template: `
    <main class="min-h-screen overflow-hidden">
      <app-template-hero />
      <app-template-features />
      <app-template-structure />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePage {}
