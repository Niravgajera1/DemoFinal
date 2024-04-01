import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createuserdto } from './dto/createuser.dto';
import { get } from 'http';
import { loginuserdto } from './dto/loginuser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Get('/')
  getuser() {
    return this.authservice.findAll();
  }
  @Get('/login')
  async login(@Body() LoginUserDto: loginuserdto): Promise<{ token: string }> {
    return this.authservice.login(LoginUserDto);
  }

  @Post('/signup')
  async signup(
    @Body() CreateUserDto: createuserdto,
  ): Promise<{ token: string }> {
    return this.authservice.SignUp(CreateUserDto);
  }
}
