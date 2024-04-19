import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CampaignService } from './../campaign/campaign.service'; // Import the CampaignService
import { Session } from 'inspector';
import { AuthService } from 'src/auth/auth.service';

interface CheckoutRequest {
  campaignId: string;
  donationAmount: number;
  campaignImage: string;
  campaignName: string;
}

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private campaignService: CampaignService,
    private userService: AuthService, // Inject the CampaignService
  ) {}

  @Post('/checkout')
  async createCheckoutSession(
    @Body() body: CheckoutRequest,
    // @Res()
    // res: Response,
  ): Promise<string> {
    const { campaignId, donationAmount, campaignImage, campaignName } = body;

    const sessionurl = await this.stripeService.createCheckoutSession(
      campaignId,
      donationAmount,
      campaignImage,
      campaignName,
    );
    try {
      await this.campaignService.updateamountDonated(
        campaignId,
        donationAmount,
      );
      await this.userService.addContributedCampaign(body.userId, campaignId);
    } catch (error) {
      console.log('error to upadate amount :', error.message);
    }
    return sessionurl;
  }
}
