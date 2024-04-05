import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createuserdto } from './dto/createuser.dto';
import { loginuserdto } from './dto/loginuser.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Get('/')
  getuser() {
    return this.authservice.findAll();
  }
  @Post('/signin')
  async login(@Body() loginUserDto: loginuserdto, @Res() res: Response) {
    try {
      const { token, user } = await this.authservice.login(loginUserDto, res);
      return res
        .status(200)
        .json({ message: 'Login successful!', token, user });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  @Post('/signup')
  async signup(
    @Body() CreateUserDto: createuserdto,
  ): Promise<{ token: string }> {
    return this.authservice.SignUp(CreateUserDto);
  }
}
