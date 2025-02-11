import { Component, Input } from '@angular/core';
import { MovieResponse } from '@app/features/admin/movies/interfaces';
import { formatDate } from '@app/shared/utils';
import {
  CalendarDays,
  Clapperboard,
  Languages,
  LucideAngularModule,
} from 'lucide-angular';
import { TypographyComponent } from '../../design-system/typography/typography.component';

@Component({
  selector: 'app-movie-list-card',
  imports: [TypographyComponent, LucideAngularModule],
  templateUrl: './movie-list-card.component.html',
  styleUrl: './movie-list-card.component.scss',
})
export class MovieListCardComponent {
  readonly Clapperboard = Clapperboard;
  readonly Languages = Languages;
  readonly CalendarDays = CalendarDays;

  @Input() movie!: MovieResponse;

  get genres() {
    return this.movie.genres.map((genre) => genre.name).join(', ');
  }

  get languages() {
    return this.movie.languages.map((language) => language.name).join(', ');
  }

  get releaseDate() {
    return formatDate(this.movie.releaseDate);
  }
}
