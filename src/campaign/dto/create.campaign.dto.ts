import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  MinLength,
  IsUrl,
} from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  yourname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  category: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  story: string;

  @IsNotEmpty()
  @IsString()
  goal: number;

  @IsNotEmpty()
  @IsString()
  enddate: string;

  @IsOptional()
  // @IsUrl()
  image: string | null;

  amountDonated: number;
}
