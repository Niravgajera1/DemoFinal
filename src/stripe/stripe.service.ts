import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'));
  }

  async createCheckoutSession(
    campaignId: string,
    donationAmount: number,
    campaignImage: string,
    campaignName: string,
  ) {
    // console.log(campaignId, campaignName, campaignImage, '>>>>>>>');
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        client_reference_id: JSON.stringify({
          campaignId,
          campaignName,
          campaignImage,
        }),

        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: `You Are Supportig : ${campaignName}`,
                images: [campaignImage],
              },
              unit_amount: donationAmount * 100, // Include donation amount
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/main`, // Include donation amount in success URL
        cancel_url: `http://localhost:3000`,
      });
      return session.url;
    } catch (error) {
      console.log(error.message);
    }
  }
}
