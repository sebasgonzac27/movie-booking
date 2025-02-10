import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typography',
  imports: [CommonModule],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss',
})
export class TypographyComponent {
  @Input() type: 'label' | 'title' | 'subtitle' | 'body' = 'body';
}
