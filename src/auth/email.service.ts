import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schemas/auth.Schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import * as nodemailer from 'nodemailer';
import { emailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  private transporter;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const emailConfig = {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      this.transporter = nodemailer.createTransport(emailConfig);
    } else {
      console.error('Email Config is Incomplete');
    }
  }
  async sendEmail(
    userEmail: emailDto,
  ): Promise<{ message: string } | { error: string }> {
    if (!this.transporter) {
      console.error('Email transporter is not initialized');
      return;
    }
    try {
      const email = userEmail.email;

      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new Error('Invalid email.');
      }

      const resetToken = await this.authService.resetToken(user._id, user.name);

      const mailOptions = {
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'Token to reset your password',
        text: `I you want to reset your password then click on the given below link ,else ignore this email :: http://localhost:3000/resetPassword/${resetToken.reset_token}`,
      };

      await this.transporter.sendMail(mailOptions);

      return {
        message: 'Your reset token has been sent to your email successfully',
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}
