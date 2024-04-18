import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CampaignService } from './../campaign/campaign.service'; // Import the CampaignService
import { Session } from 'inspector';

interface CheckoutRequest {
  // userEmail: string;
  campaignId: string;
  // campaignName: string;
  // campaignImage: string;
  donationAmount: number; // New field for donation amount
}

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private campaignService: CampaignService, // Inject the CampaignService
  ) {}

  @Post('/checkout')
  async createCheckoutSession(
    @Body() body: any,
    // @Res()
    // res: Response,
  ): Promise<string> {
    const { campaignId, donationAmount } = body;

    const sessionurl = await this.stripeService.createCheckoutSession(
      campaignId,
      donationAmount,
    );
    return sessionurl;
  }
}
