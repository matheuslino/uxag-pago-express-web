import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'administracao/clients/edit/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'carteira/wallets/edit/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'carteira/wallets/logs/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'carteira/wallets/config/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
