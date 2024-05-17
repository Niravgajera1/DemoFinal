import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  // Patch,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
  UseGuards,
  // BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createuserdto } from './dto/createuser.dto';
import { loginuserdto } from './dto/loginuser.dto';
import { Response } from 'express';
import { emailDto } from './dto/email.dto';
import { EmailService } from './email.service';
import { UpdatePasswordDto, resetPassworddto } from './dto/resetPassword.dto';
import { AuthGuard } from '@nestjs/passport';
import {mongo } from "mongoose"
// import { ForgotPasswordDto } from './dto/forgotpassword.dto';
// import { resetPassworddto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authservice: AuthService,
    private emailService: EmailService,
  ) {}

  @Get('/')
  getuser() {
    return this.authservice.findAll();
  }
  @Get('/:id')
  async getuserById(@Param('id') id: string) {
    const user = await this.authservice.findById(id);
    return user;
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

  @Post('/forgotPassword')
  async ForgotPass(
    @Body() data: emailDto,
  ): Promise<{ message: string } | { error: string }> {
    try {
      return await this.emailService.sendEmail(data);
    } catch (error) {
      throw new HttpException(
        error.message || 'internal server error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Patch('/resetPassword')
  async resetPassword(@Body() resetData: resetPassworddto) {
    return this.authservice.resetpass(resetData);
  }

  @Patch('/updatePassword')
  async updatePassword(@Body() updatepassworddto: UpdatePasswordDto) {
    try {
      const result = await this.authservice.updatePassword(updatepassworddto);
      console.log(result);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server Error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

 @Delete("/:id")
 //@UseGuards(AuthGuard())
 async deleteuser(@Param("id") id:string ):Promise<void>{
  try {
    const isValid: boolean = mongo.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid id', 404);
    }
    await this.authservice.deleteUser(id);
  } catch (error) {
    throw error.message;
  }
}
 }

