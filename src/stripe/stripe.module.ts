import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { CampaignModule } from 'src/campaign/campaign.module';

@Module({
  imports: [ConfigModule, CampaignModule],
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
