import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/review.create';
import { ReviewService } from './review.service';
import { Review } from 'src/Schemas/review.Schema';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/create')
  async createReview(@Body() createReviewdto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewdto);
  }

  @Get()
  async getAllReviews() {
    return this.reviewService.findAllReviews();
  }

  @Get('/campaign/:id')
  async getCampaignReviews(@Param('id') id: string): Promise<Review[]> {
    const reviews = await this.reviewService.getReview(id);
    if (!reviews || reviews.length === 0) {
      throw new NotFoundException('No reviews found for this campaign');
    }
    return reviews;
  }
}
