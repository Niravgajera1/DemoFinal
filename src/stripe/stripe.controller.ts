import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';

interface CheckoutRequest {
  campaignId: string;
  donationAmount: number;
  campaignImage: string;
  campaignName: string;
  userId: string;
  userEmail: string;
}

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('/checkout')
  async createCheckoutSession(@Body() body: CheckoutRequest): Promise<string> {
    const {
      campaignId,
      donationAmount,
      campaignImage,
      campaignName,
      userId,
      userEmail,
    } = body;
    const stringUserId = String(userId);

    try {
      const sessionurl = await this.stripeService.createCheckoutSession(
        campaignId,
        donationAmount,
        campaignImage,
        campaignName,
        stringUserId,
        userEmail,
      );
      return sessionurl;
    } catch (error) {
      console.log('payment Failed', error.message);
    }
  }
}
