import { IsNotEmpty, IsString } from 'class-validator';

export class resetPassworddto {
  @IsNotEmpty()
  @IsString()
  token: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
