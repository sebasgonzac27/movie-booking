import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TypographyComponent } from '../../components/typography/typography.component';
import { ArrowLeftComponent } from '../../icons/arrow-left/arrow-left.component';

@Component({
  selector: 'app-without-menu',
  imports: [TypographyComponent, ArrowLeftComponent],
  templateUrl: './without-menu.component.html',
  styleUrl: './without-menu.component.scss',
})
export class WithoutMenuComponent {
  @Input() name = '';

  constructor(
    private readonly location: Location,
    private readonly router: Router,
  ) {}

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
