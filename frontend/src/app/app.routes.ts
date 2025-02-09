import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./features/tickets/tickets.module').then((m) => m.TicketsModule),
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
