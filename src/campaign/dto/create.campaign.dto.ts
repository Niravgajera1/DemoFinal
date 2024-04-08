import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

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
  enddate: Date;

  @IsOptional()
  image?: string;
}
