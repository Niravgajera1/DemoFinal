import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'));
  }

  async createCheckoutSession(campaignId: string, donationAmount: number) {
    console.log(campaignId, donationAmount);
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id: campaignId,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'tshirt',
              // images: [`https://www.natours.dev/img/tours/${campaignImage}`],
            },
            unit_amount: donationAmount * 100, // Include donation amount
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000`, // Include donation amount in success URL
      cancel_url: `http://localhost:3000`,
    });
    console.log(session);
    return session.url;
  }
}
