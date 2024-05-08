import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { CampaignService } from 'src/campaign/campaign.service';

@Injectable()
export class StripeWebhookService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private userService: AuthService,
    private campaignService: CampaignService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2024-04-10', // Specify the Stripe API version
    });
  }
  async handleEvent(event: any) {
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful payment
        const session = event?.data?.object;

        const { metadata } = session;

        const user = await this.userService.findById(metadata.stringUserId);
        if (user) {
          const userName = user.name;
          const userId = metadata.stringUserId;

          await this.campaignService.updateamountDonated(
            metadata.campaignId,
            metadata.donationAmount,
          );
          await this.userService.addContributedCampaign(
            userId,
            metadata.campaignId,
            metadata.donationAmount,
            userName,
            metadata.campaignName,
          );
        }

        break;
      default:
        console.log('Unhandled event type:', event.type);
    }
  }
}
