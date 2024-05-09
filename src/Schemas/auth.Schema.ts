import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
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
  TokenExpiresIn: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Campaign' }] })
  contributedCampaigns: {
    campaignId: string;
    name: string;
    donationAmount: number;
  };

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }] })
  createdCampaigns: Campaign[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }] })
  likedCampaigns: Campaign[];

  @Prop({ default: 'User' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
