import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Campaign extends Document {
  @Prop({ required: true })
  yourname: string;

  @Prop()
  useremail: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  story: string;

  @Prop({ required: true })
  goal: number;

  @Prop({ required: true })
  enddate: string;

  @Prop()
  image: string | null;

  @Prop({ default: 0 })
  amountDonated: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  contributedUsers: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  createdBy: Types.ObjectId[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
