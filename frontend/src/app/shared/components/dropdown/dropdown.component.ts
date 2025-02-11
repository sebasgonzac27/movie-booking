import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChevronDownComponent, ChevronUpComponent } from '@app/shared/icons';
import { Option } from '@app/shared/interfaces';
import { TypographyComponent } from '../typography/typography.component';

type Value = string | string[] | null;

@Component({
  selector: 'app-dropdown',
  imports: [
    CommonModule,
    ChevronDownComponent,
    ChevronUpComponent,
    TypographyComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  @Input() label: string = '';
  @Input() options: Option[] = [];
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;

  value: Value = null; // Se define como Input
  selectedOption: Option | null = null;
  selectedOptions: Option[] = [];
  isOpen = false;

  constructor(private readonly elementRef: ElementRef) {}

  ngOnInit() {
    this.updateSelectedOptions(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.updateSelectedOptions(changes['value'].currentValue);
    }
  }

  toggle() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  onChange: (value: Value) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: Value): void {
    this.value = value;
    this.updateSelectedOptions(value);
  }

  registerOnChange(fn: (value: Value) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectOption(option: Option) {
    if (this.multiple) {
      this.selectedOptions = this.selectedOptions.includes(option)
        ? this.selectedOptions.filter((selected) => selected !== option)
        : [...this.selectedOptions, option];

      this.value = this.selectedOptions.map((option) => option.value);
    } else {
      this.selectedOption = option;
      this.value = option.value;
      this.isOpen = false;
    }

    this.onChange(this.value);
    this.onTouched();
  }

  updateSelectedOptions(value: Value) {
    if (this.multiple) {
      this.selectedOptions = this.options.filter((option) =>
        Array.isArray(value) ? value.includes(option.value) : false,
      );
    } else {
      this.selectedOption =
        this.options.find((option) => option.value === value) ?? null;
    }
  }

  displaySelectedValue() {
    if (this.multiple) {
      return this.selectedOptions.length > 0
        ? this.selectedOptions.map((option) => option.label).join(', ')
        : this.placeholder;
    }
    return this.selectedOption?.label ?? this.placeholder;
  }
}
