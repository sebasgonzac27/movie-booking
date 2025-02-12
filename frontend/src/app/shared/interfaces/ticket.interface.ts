interface Ticket {
  quantity: number;
}

export interface TicketDto {
  quantity: number;
  functionId: number;
  paymentMethodId: number;
}

export interface TicketResponse extends Ticket {
  id: number;
  totalPrice: number;
  purchaseDate: Date;
}
