import { IsMongoId, IsNotEmpty, IsString, isString } from 'class-validator';
import { User } from 'src/Schemas/auth.Schema';

import { ObjectId } from 'mongoose';
import { Campaign } from 'src/Schemas/campaign.Schema';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  review: string;

  @IsString()
  @IsNotEmpty()
  // @IsMongoId()
  user: string;

  @IsString()
  @IsNotEmpty()
  //@IsMongoId()
  campaign: string;
}
