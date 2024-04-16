import { Body, Controller, Param, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CampaignService } from './../campaign/campaign.service'; // Import the CampaignService

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private campaignService: CampaignService, // Inject the CampaignService
  ) {}

  @Post('payment/:id')
  async payment(
    @Body() body: { amount: number; currency: string },
    @Param('id') id: string,
  ) {
    try {
      const { amount, currency } = body;
      const paymentIntent = await this.stripeService.createPayment(
        amount,
        currency,
        id,
      );
      await this.campaignService.updateamountDonated(id, amount);
      // Fetch campaign details
      const campaign = await this.campaignService.findByid(id);

      return {
        message: 'Payment successful!',
        campaign: {
          id: campaign.id,
          name: campaign.title,
          amountDonated: campaign.amountDonated,
        },
      };
    } catch (error) {
      console.log('<<<Error>>>', error.message);
      throw new Error('Failed to process payment');
    }
  }
}
