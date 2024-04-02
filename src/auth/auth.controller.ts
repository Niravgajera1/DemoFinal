import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createuserdto } from './dto/createuser.dto';
import { loginuserdto } from './dto/loginuser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Get('/')
  getuser() {
    return this.authservice.findAll();
  }
  @Post('/signin')
  async login(@Body() LoginUserDto: loginuserdto): Promise<{ token: string }> {
    try {
      return this.authservice.login(LoginUserDto);
    } catch (error) {
      console.log(error.message);
    }
  }

  @Post('/signup')
  async signup(
    @Body() CreateUserDto: createuserdto,
  ): Promise<{ token: string }> {
    return this.authservice.SignUp(CreateUserDto);
  }
}
