import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { TicketDto, TicketResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(private readonly httpClient: HttpClient) {}

  createTicket(ticket: TicketDto) {
    return this.httpClient.post<TicketResponse>(
      `${environment.apiUrl}/tickets`,
      {
        ...ticket,
        purchaseDate: new Date(),
      },
    );
  }

  getTicketById(id: number) {
    return this.httpClient.get<TicketResponse>(
      `${environment.apiUrl}/tickets/${id}`,
    );
  }
}
