import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

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
  @IsNumber()
  goal: number;
  @IsNotEmpty()
  @IsString()
  enddate: string;
  @IsNotEmpty()
  @IsString()
  image: string;
}
