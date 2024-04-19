import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { CampaignModule } from 'src/campaign/campaign.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, CampaignModule, AuthModule],
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
