export interface Function {
  schedule: Date;
  availableTickets: number;
  price: number;
}

export interface FunctionResponse extends Function {
  id: number;
  movieId: number;
}
