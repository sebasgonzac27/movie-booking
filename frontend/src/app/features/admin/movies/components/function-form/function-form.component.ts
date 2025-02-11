import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  TypographyComponent,
} from '@app/shared/design-system';
import { LucideAngularModule, Minus } from 'lucide-angular';

@Component({
  selector: 'app-function-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    TypographyComponent,
    LucideAngularModule,
  ],
  templateUrl: './function-form.component.html',
  styleUrl: './function-form.component.scss',
})
export class FunctionFormComponent {
  readonly Minus = Minus;

  @Input() formGroup!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  get functions() {
    return this.formGroup.get('functions') as FormArray;
  }

  addFunction() {
    const functionForm = this.formBuilder.group({
      schedule: ['', Validators.required],
      availableTickets: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    this.functions.push(functionForm);
  }

  removeFunction(index: number) {
    this.functions.removeAt(index);
  }
}
