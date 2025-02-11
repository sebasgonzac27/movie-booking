import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieListCardComponent } from '@app/shared/components';
import { InputComponent } from '@app/shared/design-system';
import { LayoutComponent } from '@app/shared/layouts';
import { MovieResponse } from '../../interfaces';
import { MoviesService } from '../../services';

@Component({
  selector: 'app-movie-list',
  imports: [
    CommonModule,
    LayoutComponent,
    InputComponent,
    MovieListCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  movies: MovieResponse[] = [];

  searchControl = new FormControl('');

  constructor(
    private readonly moviesService: MoviesService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });

    this.searchControl.valueChanges.subscribe((query) => {
      this.updateSearch(query);
    });
  }

  updateSearch(query: string | null) {
    const newQuery = query ?? undefined;

    this.router.navigate([], {
      queryParams: { search: newQuery },
      queryParamsHandling: 'merge',
    });
  }
}
