import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationComponent } from '@app/shared/components';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { TypographyComponent } from '../../design-system/typography/typography.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    TypographyComponent,
    LucideAngularModule,
    NavigationComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  readonly ArrowLeft = ArrowLeft;

  @Input() name = '';
  @Input() showNavigation = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';

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
