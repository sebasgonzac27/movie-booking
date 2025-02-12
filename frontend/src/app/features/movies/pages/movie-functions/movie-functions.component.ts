import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ButtonComponent,
  DropdownComponent,
  InputComponent,
} from '@app/shared/design-system';
import {
  FunctionResponse,
  PaymentMethod,
  TicketDto,
} from '@app/shared/interfaces';
import { LayoutComponent } from '@app/shared/layouts';
import {
  MoviesService,
  PaymentMethodsService,
  TicketsService,
} from '@app/shared/services';

@Component({
  selector: 'app-movie-functions',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutComponent,
    DropdownComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './movie-functions.component.html',
  styleUrl: './movie-functions.component.scss',
})
export class MovieFunctionsComponent implements OnInit {
  functions: FunctionResponse[] = [];
  paymentMethods: PaymentMethod[] = [];
  selectedDate: string = '';
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private readonly moviesService: MoviesService,
    private readonly paymentMethodsService: PaymentMethodsService,
    private readonly ticketsService: TicketsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      date: ['', Validators.required],
      hour: ['', Validators.required],
      quantity: [1, Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFunctions();
    this.loadPaymentMethods();
    this.onDateChange();
    this.onHourChange();
  }

  loadFunctions() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');

    if (!slug) {
      return;
    }

    this.moviesService.getFunctionsByMovieSlug(slug).subscribe((functions) => {
      this.functions = functions;
    });
  }

  loadPaymentMethods() {
    this.paymentMethodsService
      .getPaymentMethods()
      .subscribe((paymentMethods) => {
        this.paymentMethods = paymentMethods;
      });
  }

  onDateChange(): void {
    this.formGroup.get('date')?.valueChanges.subscribe((date) => {
      this.selectedDate = date;
      this.formGroup.get('hour')?.setValue(''); // Reset hour when date changes
    });
  }

  onHourChange(): void {
    this.formGroup.get('hour')?.valueChanges.subscribe((hour) => {
      this.formGroup
        .get('quantity')
        ?.setValidators([
          Validators.max(
            this.functions.find((func) => func.id.toString() === hour)
              ?.availableTickets ?? 0,
          ),
        ]);
    });
  }

  hoursByDate(date: string) {
    return (
      this.functionsByDate[date]?.map((func) => ({
        label: new Date(func.schedule).toLocaleTimeString(),
        value: func.id.toString(),
      })) || []
    );
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const ticket: TicketDto = {
      quantity: parseInt(this.formGroup.get('quantity')?.value, 0),
      functionId: parseInt(this.formGroup.get('hour')?.value, 0),
      paymentMethodId: parseInt(this.formGroup.get('paymentMethod')?.value, 0),
    };
    this.ticketsService.createTicket(ticket).subscribe((ticket) => {
      this.router.navigate(['/tickets', ticket.id]);
    });
  }

  get paymentMethodsOptions() {
    return this.paymentMethods.map((method) => ({
      label: method.name,
      value: method.id.toString(),
    }));
  }

  get functionsByDate() {
    return this.functions.reduce(
      (acc: { [key: string]: FunctionResponse[] }, func) => {
        const date = new Date(func.schedule).toLocaleDateString();

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(func);

        return acc;
      },
      {},
    );
  }

  get dates() {
    return Object.keys(this.functionsByDate);
  }

  get datesOptions() {
    return this.dates.map((date) => ({ label: date, value: date }));
  }

  get hoursOptions() {
    return this.hoursByDate(this.selectedDate);
  }
}
