import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class loginuserdto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please Enter Valid Email Address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
