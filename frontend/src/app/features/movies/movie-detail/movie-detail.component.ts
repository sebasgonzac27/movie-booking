import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '@app/shared/design-system';
import { MovieResponse } from '@app/shared/interfaces';
import { LayoutComponent } from '@app/shared/layouts';
import { MoviesService } from '@app/shared/services';
import { formatDate, formatHour } from '@app/shared/utils';

@Component({
  selector: 'app-movie-detail',
  imports: [LayoutComponent, ButtonComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  movie!: MovieResponse;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly moviesService: MoviesService,
  ) {}

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.moviesService.getMovieBySlug(slug).subscribe((movie) => {
          this.movie = movie;
        });
      }
    });
  }

  get genres() {
    return this.movie.genres.map((genre) => genre.name).join(', ');
  }

  get languages() {
    return this.movie.languages.map((language) => language.name).join(', ');
  }

  get duration() {
    return formatHour(this.movie.duration);
  }

  get releaseDate() {
    return formatDate(this.movie.releaseDate);
  }
}
