import { IsString, IsUrl } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  name: string;

  @IsUrl()
  icon: string;
}
