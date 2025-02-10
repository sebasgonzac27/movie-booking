import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';

@Component({
  selector: 'app-input',
  imports: [TypographyComponent, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent<T> implements ControlValueAccessor {
  @Input() label = '';
  @Input() id = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' | 'date' | 'password' | 'file' = 'text';
  @Input() disabled = false;
  @Input() accept = '';

  @ViewChild('inputRef', { static: false })
  inputRef!: ElementRef<HTMLInputElement>;

  value: T | null = null;
  onChange: (value: T | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: T | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.type === 'file' && input.files) {
      const file = input.files[0];
      this.value = file as T;
    } else {
      this.value = input.value as T;
    }

    this.onChange(this.value);
    this.onTouched();
  }
}
