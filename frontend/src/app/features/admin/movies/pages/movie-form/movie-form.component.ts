import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  TextAreaComponent,
} from '@app/shared/components';
import { type Option } from '@app/shared/interfaces';
import { WithoutMenuComponent } from '@app/shared/layouts';
import { Subscription } from 'rxjs';
import { DropdownComponent } from '../../../../../shared/components/dropdown/dropdown.component';
import { GenresService, LanguagesService, MoviesService } from '../../services';

@Component({
  selector: 'app-movie-form',
  imports: [
    InputComponent,
    ButtonComponent,
    TextAreaComponent,
    WithoutMenuComponent,
    ReactiveFormsModule,
    DropdownComponent,
  ],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
})
export class MovieFormComponent implements OnInit, OnDestroy {
  genres: Option[] = [];
  languages: Option[] = [];

  formNewMovie: FormGroup;
  subscriptions: Subscription = new Subscription();

  imagePreview: string | ArrayBuffer | null = 'https://placehold.co/400x600';

  constructor(
    private readonly genresService: GenresService,
    private readonly languagesService: LanguagesService,
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

  ngOnInit(): void {
    this.getCategories();
    this.getLanguages();
    this.subscribeToCoverChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCategories(): void {
    this.genresService.getGenres().subscribe((genres) => {
      this.genres = genres.map((genre) => ({
        value: genre.id.toString(),
        label: genre.name,
      }));
    });
  }

  getLanguages(): void {
    this.languagesService.getLanguages().subscribe((languages) => {
      this.languages = languages.map((language) => ({
        value: language.id.toString(),
        label: language.name,
      }));
    });
  }

  onSubmit(): void {
    this.moviesService.createMovie(this.formNewMovie.value).subscribe(() => {
      this.formNewMovie.reset();
    });
    this.formNewMovie.reset();
  }

  subscribeToCoverChanges(): void {
    const coverSubscription = this.formNewMovie
      .get('cover')
      ?.valueChanges.subscribe((file: File) => {
        if (!file) {
          this.imagePreview = 'https://placehold.co/400x600';
          return;
        }

        if (!file.type.includes('image')) {
          this.formNewMovie.get('cover')?.setErrors({ invalidFileType: true });
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      });

    this.subscriptions.add(coverSubscription);
  }
}
