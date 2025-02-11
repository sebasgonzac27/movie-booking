import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DropdownComponent,
  ImagePickerComponent,
  InputComponent,
  TextAreaComponent,
} from '@app/shared/design-system';
import { Option } from '@app/shared/interfaces';
import { GenresService, LanguagesService } from '../../services';

@Component({
  selector: 'app-movie-form',
  imports: [
    ReactiveFormsModule,
    ImagePickerComponent,
    InputComponent,
    TextAreaComponent,
    DropdownComponent,
  ],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
})
export class MovieFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;

  genres: Option[] = [];
  languages: Option[] = [];

  constructor(
    private readonly genresService: GenresService,
    private readonly languagesService: LanguagesService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getLanguages();
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
}
