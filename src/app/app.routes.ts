import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages').then((x) => x.HubComponent),
  },
  {
    path: 'game',
    loadComponent: () => import('../pages').then((x) => x.GameComponent),
  },
];
