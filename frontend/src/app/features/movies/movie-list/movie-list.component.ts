import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-movie-list',
  imports: [ButtonComponent, InputComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  handleClick() {
    alert('Button clicked');
  }
}
