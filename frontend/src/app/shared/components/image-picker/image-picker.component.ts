import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypographyComponent } from '../typography/typography.component';

type Value = File | null;

@Component({
  selector: 'app-image-picker',
  imports: [CommonModule, TypographyComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagePickerComponent),
      multi: true,
    },
  ],
  templateUrl: './image-picker.component.html',
  styleUrl: './image-picker.component.scss',
})
export class ImagePickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() disabled = false;

  value: Value = null;
  preview: string | ArrayBuffer | null = 'https://placehold.co/400x600';

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0];
      this.value = file || null;
      this.onChange(this.value);
      this.getPreview();
    }
    this.onTouched();
  }

  getPreview(): void {
    if (this.value) {
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result;
      };
      reader.readAsDataURL(this.value);
      return;
    }
    this.preview = 'https://placehold.co/400x600';
  }

  writeValue(value: Value): void {
    this.value = value;
    this.getPreview();
  }

  onChange: (value: Value) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: (value: Value) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
