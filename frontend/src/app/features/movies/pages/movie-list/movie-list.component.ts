import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieListCardComponent } from '@app/shared/components';
import { InputComponent } from '@app/shared/design-system';
import { MovieResponse } from '@app/shared/interfaces';
import { LayoutComponent } from '@app/shared/layouts';
import { MoviesService } from '@app/shared/services';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  imports: [
    CommonModule,
    LayoutComponent,
    InputComponent,
    ReactiveFormsModule,
    MovieListCardComponent,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();
  subscription = new Subscription();

  movies: MovieResponse[] = [];
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly moviesService: MoviesService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const search = params['search'] || '';
      this.searchControl.setValue(search, { emitEvent: false });
      this.loadMovies(search);
    });

    this.subscribeToSearchControl();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeToSearchControl(): void {
    const searchSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          this.router.navigate([], { queryParams: { search: value } });
          return this.moviesService.getMovies({ search: value });
        }),
      )
      .subscribe((movies) => {
        this.movies = movies;
      });

    this.subscription.add(searchSubscription);
  }

  loadMovies(search: string): void {
    this.moviesService.getMovies({ search }).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
