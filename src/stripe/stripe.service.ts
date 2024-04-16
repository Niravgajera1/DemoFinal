import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'));
  }

  async createPayment(amount: number, currency: string, id: string) {
    try {
      // Logic to create payment
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
          id, // Associate the campaign ID with the payment
        },
      });
      return paymentIntent;
    } catch (error) {
      console.log('<<<Stripe Error>>>', error);
      throw new Error(`Failed to create payment: ${error.message}`);
    }
  }
}
