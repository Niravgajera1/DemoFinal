import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createuserdto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please Enter Valid Email Address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmpassword: string;
}
