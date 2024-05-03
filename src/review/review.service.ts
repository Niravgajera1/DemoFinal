import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/Schemas/review.Schema';
import { CreateReviewDto } from './dto/review.create';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async createReview(createReviewdto: CreateReviewDto): Promise<Review> {
    const createReview = new this.reviewModel(createReviewdto);
    return createReview.save();
  }

  async findAllReviews(): Promise<Review[]> {
    return this.reviewModel
      .find()
      .populate({
        path: 'user',
        options: { strictPopulate: false },
      })
      .populate({
        path: 'campaign',
        options: { strictPopulate: false },
      })
      .exec();
  }
}
