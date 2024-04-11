import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  confirmpassword: string;

  @Prop()
  PasswordReserToken: string;

  @Prop()
  PasswordExpiresIn: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
