import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieFormComponent, MovieListComponent } from './pages';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'new', component: MovieFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
