import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  yourname: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  story: string;
  @IsNotEmpty()
  @IsNumber()
  goal: number;
  @IsNotEmpty()
  @IsDate()
  enddate: Date;
  @IsNotEmpty()
  @IsString()
  image: string;
}
