import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createuserdto } from './dto/createuser.dto';
import { get } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Get('/')
  getuser() {
    return this.authservice.findAll();
  }
  @Post('/signup')
  async signup(@Body() CreateUserDto: createuserdto) {
    return this.authservice.createUser(CreateUserDto);
  }
}
