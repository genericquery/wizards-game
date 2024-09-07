import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages').then((x) => x.HubComponent),
  },
  {
    path: 'game/:gameId',
    loadComponent: () => import('../pages').then((x) => x.GameComponent),
  },
  {
    path: 'lobby/:gameId',
    loadComponent: () => import('../pages').then((x) => x.LobbyComponent),
  },
];
