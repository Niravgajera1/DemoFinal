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
    stringUserId: string,
    userEmail: string,
  ) {
    // console.log(campaignId, campaignName, campaignImage, '>>>>>>>');
    const metadata = {
      campaignId,
      campaignName,
      donationAmount,
      stringUserId,
    };
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
                name: `You Are Supporting : ${campaignName}`,
                images: [campaignImage],
              },
              unit_amount: donationAmount * 100, // Include donation amount
            },
            quantity: 1,
          },
        ],
        metadata: metadata,
        mode: 'payment',
        success_url: `http://localhost:3000/PaymentSuccessfull`,
        customer_email: userEmail,
        // Include donation amount in success URL
        cancel_url: `http://localhost:3000`,
      });
      return session.url;
    } catch (error) {
      console.log(error.message);
    }
  }
}
