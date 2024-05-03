import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createuserdto } from './dto/createuser.dto';
import { Model } from 'mongoose';
import { User } from '../Schemas/auth.Schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { loginuserdto } from './dto/loginuser.dto';
import { Response } from 'express';
import { Campaign } from 'src/Schemas/campaign.Schema';
import { UpdatePasswordDto, resetPassworddto } from './dto/resetPassword.dto';

@Injectable()
export class AuthService {
  // [x: string]: any;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
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
      if (!user) {
        throw new UnauthorizedException('with this email no user found');
      }
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

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).populate({
        path: 'createdCampaigns',
        options: { strictPopulate: false },
      });
      if (!user) {
        throw new NotFoundException('User Not Found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async resetToken(
    userid: number,
    username: string,
  ): Promise<{ reset_token: string }> {
    const payload = {
      id: userid,
      username,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '5m',
      secret: process.env.JWT_SECRET,
    });
    return {
      reset_token: token,
    };
  }

  async resetpass(resetinfo: resetPassworddto) {
    try {
      // Verify reset token
      const checkResetToken = jwt.verify(
        resetinfo.reset_token,
        process.env.JWT_SECRET,
      );

      const id: number = checkResetToken['id'] as unknown as number;

      // Hash the new password
      const hash = await bcrypt.hash(resetinfo.password, 10);

      // Update user password in the database
      const updatePassword = await this.userModel.findByIdAndUpdate(
        id,
        { password: hash },
        //  { confirmPassword: resetinfo.confirmPassword },
        { new: true },
      );

      if (!updatePassword)
        throw new HttpException('Password is not updated. ', 404);

      // Return success message
      return {
        success: true,
        message: 'Successfully password has been updated',
      };
    } catch (error) {
      // Handle errors and return failure message
      console.error('Password reset failed:', error.message);
      return {
        success: false,
        message: 'Password reset failed. Please try again.',
      };
    }
  }

  async updatePassword(newpassword: UpdatePasswordDto) {
    try {
      const { email, currentPassword, newPassword } = newpassword;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new Error('Invalid Email');
      }
      const isCorrectPass = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isCorrectPass) {
        throw new Error('Your Current Password is Wrong');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return {
        success: true,
        message: 'Your Password Has Been Updated Successfully..!',
      };
    } catch (error) {
      console.error('Password Has Not Updated', error.message);
      throw error;
    }
  }

  async addContributedCampaign(
    userId: string,
    campaignId: string,
    donationAmount: number,
    userName: string,
    campaignName: string,
  ): Promise<Campaign> {
    try {
      await this.userModel
        .findByIdAndUpdate(
          userId,
          {
            $push: {
              contributedCampaigns: {
                campaignId: campaignId,
                name: campaignName,
                donationAmount: donationAmount,
              },
            },
          },
          { new: true },
        )
        .exec();

      const updatedcamapign = await this.campaignModel
        .findByIdAndUpdate(
          campaignId,
          {
            $push: {
              contributedUsers: {
                user: userId,
                userName: userName,
                donationAmount: donationAmount,
              },
            },
          },
          { new: true }, // Return the updated document
        )
        .exec();
      return updatedcamapign;
    } catch (error) {
      throw new Error(`Failed to add contributed campaign: ${error.message}`);
    }
  }

  async addCampaign(id: string, campaignId: string) {
    return await this.userModel.findByIdAndUpdate(
      id,
      { $push: { createdCampaigns: campaignId } },
      { new: true },
    );
  }
}
