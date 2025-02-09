import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'date' | 'password' | 'file' = 'text';
  @Input() disabled = false;
}
