import { IsISO8601, IsNumber, IsPositive } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsISO8601()
  purchaseDate: Date;

  @IsNumber()
  @IsPositive()
  functionId: number;

  @IsNumber()
  @IsPositive()
  paymentMethodId: number;
}
