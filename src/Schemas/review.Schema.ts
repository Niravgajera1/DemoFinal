import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Campaign } from './campaign.Schema';
import { User } from './auth.Schema';

@Schema({
  timestamps: true,
})
export class Review extends Document {
  @Prop({ required: true })
  review: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
  campaign: Campaign;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
