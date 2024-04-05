import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createuserdto } from './dto/createuser.dto';
import { Model } from 'mongoose';
import { User } from '../Schemas/auth.Schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginuserdto } from './dto/loginuser.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async SignUp(
    CreateUserDto: createuserdto,
  ): Promise<{ message: string; token: string }> {
    try {
      const { name, email, password, confirmpassword } = CreateUserDto;
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
      if (password !== confirmpassword) {
        throw new BadRequestException(
          'Password And Confirm Password Dose Not Match ',
        );
      }

      const hasedpassword = await bcrypt.hash(password, 10);
      const createuser = await this.userModel.create({
        name,
        email,
        password: hasedpassword,
        confirmpassword,
      });
      const token = this.jwtService.sign({ id: createuser._id });
      return { message: 'User Successfully Registered!', token };
    } catch (error) {
      throw error;
    }
  }

  async login(
    LoginUserDto: loginuserdto,
    res: Response,
  ): Promise<{ message: string; token: string; user: any }> {
    try {
      const { email, password } = LoginUserDto;
      const user = await this.userModel.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = this.jwtService.sign({ id: user._id });
        res.cookie('token', token, { httpOnly: true });
        return { message: 'Login successful!', token, user };
      } else {
        throw new UnauthorizedException('Invalid Email Or Password');
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    console.log('hhh');
    return await this.userModel.find().exec();
  }
}
