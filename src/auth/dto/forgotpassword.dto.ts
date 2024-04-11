// forgot-password.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;

  // @IsOptional()
  // subject: string;

  // @IsOptional()
  // text: string;
}
