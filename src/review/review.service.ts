import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/Schemas/review.Schema';
import { CreateReviewDto } from './dto/review.create';
import { Campaign } from 'src/Schemas/campaign.Schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(Campaign.name) private readonly campaignModel: Model<Campaign>,
  ) {}

  async createReview(createReviewdto: CreateReviewDto): Promise<Review> {
    const { user, campaign } = createReviewdto;

    const campaigns = await this.campaignModel.findById(campaign);
    if (!campaigns) {
      throw new NotFoundException('Campaign Not Found With this Id');
    }
    if (campaigns.createdBy.toString() === user) {
      throw new ConflictException('You Can Not Post In Your Own Campaign');
    }
    const createReview = new this.reviewModel(createReviewdto);
    const savedReview = await createReview.save();

    await this.campaignModel.findByIdAndUpdate(
      campaign,
      { $push: { reviews: savedReview._id } },
      { new: true },
    );

    await campaigns.save();
    return savedReview;
  }

  async findAllReviews(): Promise<Review[]> {
    return this.reviewModel
      .find()
      .populate({
        path: 'user',
        select: '_id name',
        options: { strictPopulate: false },
      })
      .populate({
        path: 'campaign',
        select: 'title',
        options: { strictPopulate: false },
      })
      .sort({ createdAt: 1 })
      .exec();
  }

  async getReview(camapigId: string) {
    const review = await this.reviewModel
      .find({ campaign: camapigId })
      .populate({
        path: 'user',
        select: '_id name',
        options: { strictPopulate: false },
      })
      .populate({
        path: 'campaign',
        select: 'title',
        options: { strictPopulate: false },
      })
      .sort({ createdAt: -1 })
      .exec();
    if (!review) {
      throw new NotFoundException('with this campaign no review found');
    }
    return review;
  }
}
