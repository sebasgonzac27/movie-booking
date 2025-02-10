import { Component, Input } from '@angular/core';
import { TypographyComponent } from '../typography/typography.component';

@Component({
  selector: 'app-input',
  imports: [TypographyComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label = '';
  @Input() id = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'date' | 'password' | 'file' = 'text';
  @Input() disabled = false;
}
