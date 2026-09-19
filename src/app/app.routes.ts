import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/welcome').then((page) => page.WelcomePage),
    title: 'FSD CLI · Angular template',
  },
  { path: '**', redirectTo: '' },
];
