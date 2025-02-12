import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketResponse } from '@app/shared/interfaces';
import { LayoutComponent } from '@app/shared/layouts';
import { TicketsService } from '@app/shared/services';
import { formatDate } from '@app/shared/utils';

@Component({
  selector: 'app-ticket-detail',
  imports: [CommonModule, LayoutComponent],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss',
})
export class TicketDetailComponent implements OnInit {
  ticket!: TicketResponse;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly ticketsService: TicketsService,
  ) {}

  ngOnInit(): void {
    this.loadTicket();
  }

  loadTicket(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!id) {
        return;
      }
      this.ticketsService.getTicketById(id).subscribe((ticket) => {
        this.ticket = ticket;
      });
    });
  }

  get purchaseDate() {
    return formatDate(this.ticket.purchaseDate.toString());
  }
}
