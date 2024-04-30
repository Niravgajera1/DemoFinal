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
  userId: string;
}

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private campaignService: CampaignService,
    private userService: AuthService, // Inject the CampaignService
  ) {}

  @Post('/checkout')
  async createCheckoutSession(@Body() body: CheckoutRequest): Promise<string> {
    const { campaignId, donationAmount, campaignImage, campaignName, userId } =
      body;
    const stringUserId = String(userId);
    // console.log(stringUserId, '>>>>>>>>>>>>>>>');
    try {
      const sessionurl = await this.stripeService.createCheckoutSession(
        campaignId,
        donationAmount,
        campaignImage,
        campaignName,
      );

      const user = await this.userService.findById(stringUserId);
      if (user) {
        const userName = user.name;
        const userId = stringUserId;
        // console.log(userId, campaignId, donationAmount, userName);
        await this.campaignService.updateamountDonated(
          campaignId,
          donationAmount,
        );
        await this.userService.addContributedCampaign(
          userId,
          campaignId,
          donationAmount,
          userName,
          campaignName,
        );
      }
      return sessionurl;
    } catch (error) {
      console.log('payment Failed', error.message);
    }
    // console.log(stringUserId, '>>>>>>>>>>>>>>>>>>>>>>>');
    // try {
    //   await this.campaignService.updateamountDonated(
    //     campaignId,
    //     donationAmount,
    //   );
    // } catch (error) {
    //   console.log('error to upadate amount :', error.message);
    // }
  }
}