import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/welcome').then((page) => page.WelcomePage),
    title: 'FSD CLI · Angular template',
  },
  // fsd-cli:routes:start
  // fsd-cli:routes:end
  { path: '**', redirectTo: '' },
];
