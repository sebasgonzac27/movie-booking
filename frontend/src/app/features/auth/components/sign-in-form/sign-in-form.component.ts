import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonComponent, InputComponent } from '@app/shared/design-system';
import { AuthService } from '../../services';

@Component({
  selector: 'app-sign-in-form',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  returnUrl: string = '/';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
    console.log(this.formGroup.valid);
    if (!this.formGroup.valid) {
      return;
    }
    this.authService.signIn(this.formGroup.value).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl]);
      },
    });
  }
}
