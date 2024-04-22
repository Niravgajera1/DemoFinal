import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  // Patch,
  // Param,
  // BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createuserdto } from './dto/createuser.dto';
import { loginuserdto } from './dto/loginuser.dto';
import { Response } from 'express';
// import { ForgotPasswordDto } from './dto/forgotpassword.dto';
// import { resetPassworddto } from './dto/resetPassword.dto';

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

  // @Post('/signin/forgotPassword')
  // async forgotPassword(@Body() forgotpassworddto: ForgotPasswordDto) {
  //   await this.authservice.SendResetPasswordToken(forgotpassworddto);
  //   return { message: 'Password Reset Sent Successfully' };
  // }

  // @Patch('/signin/resetPassword/:token')
  // async resetPassword(
  //   @Param('token') token: string,
  //   @Body() ResetPasswordDto: resetPassworddto,
  // ) {
  //   try {
  //     if (ResetPasswordDto.newPassword !== ResetPasswordDto.confirmPassword) {
  //       throw new BadRequestException('Password Does Not Match');
  //     }

  //     const result = await this.authservice.resetPassword(
  //       token,
  //       ResetPasswordDto.newPassword,
  //       ResetPasswordDto.confirmPassword,
  //     );
  //     return result;
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  @Post('/signup')
  async signup(
    @Body() CreateUserDto: createuserdto,
  ): Promise<{ token: string }> {
    return this.authservice.SignUp(CreateUserDto);
  }
}
