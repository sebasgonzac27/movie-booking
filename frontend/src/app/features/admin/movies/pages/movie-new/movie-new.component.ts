import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@app/shared/components';
import { WithoutMenuComponent } from '@app/shared/layouts';
import { MovieFormComponent } from '../../components';
import { MoviesService } from '../../services';

@Component({
  selector: 'app-movie-new',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    WithoutMenuComponent,
    MovieFormComponent,
  ],
  templateUrl: './movie-new.component.html',
  styleUrl: './movie-new.component.scss',
})
export class MovieNewComponent {
  formNewMovie: FormGroup;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.formNewMovie = this.formBuilder.group({
      cover: [null, Validators.required],
      title: ['', Validators.required],
      storyline: ['', [Validators.required, Validators.maxLength(600)]],
      releaseDate: ['', Validators.required],
      duration: [0, Validators.required],
      genres: [[], Validators.required],
      languages: [[], Validators.required],
    });
  }

  onSubmit(): void {
    if (this.formNewMovie.invalid) {
      return;
    }
    this.moviesService.createMovie(this.formNewMovie.value).subscribe(() => {
      this.formNewMovie.reset();
    });
  }
}
