import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';

@Component({
  selector: 'app-text-area',
  imports: [TypographyComponent, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() id = '';
  @Input() name = '';
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() maxLength = 1000;

  value: string | null = null;
  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
