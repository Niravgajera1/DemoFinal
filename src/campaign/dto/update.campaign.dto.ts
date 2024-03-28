import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCampaignDto {
  @IsOptional()
  @IsString()
  yourname: string;

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
  @IsDate()
  enddate: Date;

  @IsOptional()
  @IsString()
  image: string;
}
