import { Component } from '@angular/core';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'app-movie-form',
  imports: [InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
})
export class MovieFormComponent {
  options = [
    {
      value: 1,
      label: 'Action',
    },
    {
      value: 2,
      label: 'Comedy',
    },
    {
      value: 3,
      label: 'Drama',
    },
    {
      value: 4,
      label: 'Horror',
    },
    {
      value: 5,
      label: 'Romance',
    },
  ];
}
