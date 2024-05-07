import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import { StripeWebhookModule } from './stripe-webhook/stripe-webhook.module';

const DBURL: string =
  'mongodb+srv://niravpatelpc:7359965@nest.riw7o.mongodb.net/';

@Module({
  imports: [
    MongooseModule.forRoot(DBURL),
    ConfigModule.forRoot(),
    AuthModule,
    CampaignModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    StripeModule,
    ReviewModule,
    StripeWebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
