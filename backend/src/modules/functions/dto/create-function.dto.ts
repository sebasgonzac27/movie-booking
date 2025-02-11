import {
  IsCurrency,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateFunctionDto {
  @IsISO8601()
  schedule: Date;

  @IsCurrency()
  price: number;

  @IsNumber()
  @IsPositive()
  availableTickets: number;

  @IsNumber()
  @IsOptional()
  movieId: number;
}
