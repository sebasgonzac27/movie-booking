import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
