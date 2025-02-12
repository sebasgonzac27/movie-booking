import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieResponse } from '@app/shared/interfaces';
import { formatHour } from '@app/shared/utils';
import {
  Clapperboard,
  Clock,
  Languages,
  LucideAngularModule,
} from 'lucide-angular';
import { TypographyComponent } from '../../design-system/typography/typography.component';

@Component({
  selector: 'app-movie-list-card',
  imports: [TypographyComponent, LucideAngularModule, RouterModule],
  templateUrl: './movie-list-card.component.html',
  styleUrl: './movie-list-card.component.scss',
})
export class MovieListCardComponent {
  readonly Clapperboard = Clapperboard;
  readonly Languages = Languages;
  readonly Clock = Clock;

  @Input() movie!: MovieResponse;

  get genres() {
    return this.movie.genres.map((genre) => genre.name).join(', ');
  }

  get languages() {
    return this.movie.languages.map((language) => language.name).join(', ');
  }

  get duration() {
    return formatHour(this.movie.duration);
  }
}
