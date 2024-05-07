// create-campaign.dto.ts

import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsUrl,
  IsEnum,
} from 'class-validator';

enum CampaignCategory {
  Technology = 'Technology',
  Medical = 'Medical',
  Education = 'Education',
  Animals = 'Animals',
  Emergency = 'Emergency',
  Other = 'Other',
}

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  yourname: string;

  @IsNotEmpty()
  @IsString()
  useremail: string;

  @IsNotEmpty()
  @IsEnum(CampaignCategory, { message: 'invalid category' })
  category: CampaignCategory;

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
