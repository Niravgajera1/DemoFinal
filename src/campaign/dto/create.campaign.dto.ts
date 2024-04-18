// create-campaign.dto.ts

import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  yourname: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  story: string;

  @IsNotEmpty()
  @IsString()
  goal: number;

  @IsNotEmpty()
  enddate: string;

  @IsOptional()
  image: string | null;

  amountDonated: number;
}
