import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/review.create';
import { ReviewService } from './review.service';

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
}
