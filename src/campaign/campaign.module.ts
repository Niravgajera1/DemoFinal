import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from '../Schemas/campaign.Schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/Schemas/auth.Schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Campaign.name,
        schema: CampaignSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
