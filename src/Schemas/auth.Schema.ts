import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Campaign } from './campaign.Schema';

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Campaign' }] })
  contributedCampaigns: string[]; // Assuming campaign IDs are strings
}

export const UserSchema = SchemaFactory.createForClass(User);
