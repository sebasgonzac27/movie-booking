import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '@app/shared/layouts';
import { SignInFormComponent } from '../../components';
import { AuthService } from '../../services';

@Component({
  selector: 'app-sign-in',
  imports: [LayoutComponent, SignInFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.verifyIsAuthenticated();
  }

  verifyIsAuthenticated(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
}
