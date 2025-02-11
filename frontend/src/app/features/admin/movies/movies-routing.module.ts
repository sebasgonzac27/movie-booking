import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent, MovieNewComponent } from './pages';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'new', component: MovieNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
