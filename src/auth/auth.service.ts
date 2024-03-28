import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createuserdto } from './dto/createuser.dto';
import { Model } from 'mongoose';
import { User } from '../Schemas/auth.Schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(CreateUserDto: createuserdto): Promise<User> {
    const createuser = new this.userModel(CreateUserDto);

    return await createuser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
