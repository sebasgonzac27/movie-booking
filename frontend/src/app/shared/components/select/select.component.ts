import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TypographyComponent } from '../typography/typography.component';

@Component({
  selector: 'app-select',
  imports: [CommonModule, TypographyComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() label = '';
  @Input() id = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() options: { value: number; label: string }[] = [];
}
