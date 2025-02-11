import { Component } from '@angular/core';
import { LayoutComponent } from '@app/shared/layouts';

@Component({
  selector: 'app-movie-list',
  imports: [LayoutComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {}
