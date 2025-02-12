import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@app/core/guards';
import {
  MovieDetailComponent,
  MovieFunctionsComponent,
  MovieListComponent,
} from './pages';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: ':slug', component: MovieDetailComponent },
  {
    path: ':slug/functions',
    component: MovieFunctionsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
