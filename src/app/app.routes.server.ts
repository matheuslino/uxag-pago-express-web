import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'administracao/clients/edit/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'wallets/edit/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'wallets/logs/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'wallets/config/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
