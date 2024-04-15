import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCampaignDto {
  @IsOptional()
  @IsString()
  yourname: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  story: string;

  @IsOptional()
  @IsNumber()
  goal: number;

  @IsOptional()
  @IsString()
  enddate: string;

  @IsOptional()
  @IsString()
  image: File;
}
