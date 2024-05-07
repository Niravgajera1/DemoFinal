import { Module } from '@nestjs/common';
import { StripeWebhookService } from './stripe-webhook.service';
import { StripeWebhookController } from './stripe-webhook.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { CampaignService } from 'src/campaign/campaign.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/auth.Schema';
import { Campaign, CampaignSchema } from 'src/Schemas/campaign.Schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  providers: [
    StripeWebhookService,
    ConfigService,
    JwtService,
    AuthService,
    CampaignService,
  ],
  controllers: [StripeWebhookController],
})
export class StripeWebhookModule {}
