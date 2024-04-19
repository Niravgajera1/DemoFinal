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
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { use } from 'passport';

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
  ): Promise<{ token: string; user: loginuserdto }> {
    try {
      const { email, password } = LoginUserDto;
      const user = await this.userModel.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = this.jwtService.sign({ id: user._id });
        res.cookie('token', token, { httpOnly: true });
        return { token, user };
      } else {
        throw new UnauthorizedException('Invalid Email Or Password');
      }
    } catch (error) {
      throw error;
    }
  }

  async SendResetPasswordToken(option: { email: string }) {
    try {
      const resetToken = this.createPasswordResetToken();
      // user.passwordResetToken = resetToken;
      // User.passwordExpiresIn =
      const resetUrl = `http://localhost:3001/auth/signin/resetPassword/${resetToken}`;
      const message = `Your Password Reset Token Valid For 10 Minuts : ${resetUrl}`;
      // console.log('<<<MEssAge>>>', message);

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: 'niravpatelpc@gmail.com',
        to: option.email,
        subject: 'Password Reset Token',
        text: message,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error.message);
    }
  }

  createPasswordResetToken(): string {
    // Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the reset token
    const hashedResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set the hashed token and expiration time
    const passwordResetToken = hashedResetToken;
    const passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
    // console.log(
    //   '<<<<Password Reset Token>>>',
    //   { resetToken },
    //   passwordResetToken,
    // );

    // Return the unhashed reset token for sending it to the user
    return resetToken;
  }

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<{ status: string; token?: string }> {
    try {
      const hashToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await this.userModel.findOne({
        passwordResetToken: hashToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        throw new Error('Token is invalid or expired');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      user.password = newPassword;
      user.confirmpassword = confirmPassword;
      user.PasswordReserToken = undefined;
      user.PasswordExpiresIn = undefined;
      await user.save();
      const newToken = this.jwtService.sign({ id: user._id });
      return {
        status: 'success',
        token: newToken,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async addContributedCampaign(
    userId: string,
    campaignId: string,
  ): Promise<User> {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(
          userId,
          { $push: { contributedCampaigns: campaignId } },
          { new: true },
        )
        .populate('contributedCampaigns', 'name _id')
        .exec(); // Populate campaign data

      return user;
    } catch (error) {
      throw new Error(`Failed to add contributed campaign: ${error.message}`);
    }
  }
}
