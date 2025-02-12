import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { PaymentMethod } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  constructor(private readonly httpClient: HttpClient) {}

  getPaymentMethods() {
    return this.httpClient.get<PaymentMethod[]>(
      `${environment.apiUrl}/payment-methods`,
    );
  }
}
