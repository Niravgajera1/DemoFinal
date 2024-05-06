import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from '../Schemas/campaign.Schema';
import { Model } from 'mongoose';
import { CreateCampaignDto } from './dto/create.campaign.dto';
import { UpdateCampaignDto } from './dto/update.campaign.dto';
import { Query } from 'express-serve-static-core';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/Schemas/auth.Schema';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    @InjectModel(User.name) private userModel: Model<User>,
    private authSerive: AuthService,
  ) {}

  async createCampaign(createCampaignDto: CreateCampaignDto, id: string) {
    const newCampaign = new this.campaignModel(createCampaignDto);
    const result = await newCampaign.save();
    const camapigId = result._id;
    await this.authSerive.addCampaign(id, camapigId);

    await this.campaignModel.findByIdAndUpdate(
      camapigId,
      { $push: { createdBy: id } },
      { new: true },
    );

    return result;
  }
  async findByid(id: string) {
    const found = await this.campaignModel.findById(id).populate({
      path: 'reviews', // Populate the 'reviews' field
      model: 'Review',
      populate: {
        path: 'user', // Populate the 'user' field inside each 'Review'
        model: 'User',
        select: 'name', // Specify the model to use for populating 'user'
      }, // Specify the model to use for population
    });
    if (!found) {
      throw new NotFoundException('campaign not found with this id');
    }
    return found;
  }

  async findAll(
    query: Query,
  ): Promise<{ data: Campaign[]; totalitem: number }> {
    ///console.log(query, 'query>>>');
    const resPerPage = 6;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    let DBquery: any = {};

    try {
      if (DBquery?.category) {
        DBquery['category'] = {
          $regexp: '^' + query?.category,
          $options: 'i',
        };
      }
      if (query?.category) {
        DBquery['category'] = { $regex: '^' + query?.category, $options: 'i' };
      }
      const totalitem = await this.campaignModel.countDocuments(DBquery).exec();
      const data = await this.campaignModel

        .find(DBquery)
        .populate({
          path: 'reviews', // Populate the 'reviews' field
          model: 'Review',
          populate: {
            path: 'user', // Populate the 'user' field inside each 'Review'
            model: 'User',
            select: 'name', // Specify the model to use for populating 'user'
          }, // Specify the model to use for population
        })
        .limit(resPerPage)
        .skip(skip)
        .exec();
      return { totalitem, data };
    } catch (error) {
      throw error.message;
    }
  }

  async upadateCampaign(id: string, updatecampaigndto: UpdateCampaignDto) {
    const found = await this.campaignModel.findById(id);
    if (!found) {
      throw new NotFoundException('camapign not found');
    }
    const keys = Object.keys(updatecampaigndto);
    if (keys.length === 0) {
      throw new HttpException('No fields provided for update', 400);
    }
    return this.campaignModel.findByIdAndUpdate(
      { _id: id },
      updatecampaigndto,
      { new: true },
    );
  }

  async deleteCampaign(id: string): Promise<void> {
    const deletedCampaign = await this.campaignModel.findByIdAndDelete(id);
    if (!deletedCampaign) {
      throw new NotFoundException('Campaign not found');
    }

    await this.userModel.updateMany(
      { createdCampaigns: id },
      { $pull: { createdCampaigns: id } },
    );
  }

  async updateamountDonated(id: string, amount: number) {
    try {
      const campaign = await this.campaignModel.findById(id);
      if (!campaign) {
        throw new Error(`Campaign with ID ${id} not found`);
      }
      const currentAmountDonated = Number(campaign.amountDonated);
      campaign.amountDonated = currentAmountDonated + amount;
      await campaign.save();
    } catch (error) {
      console.error('Error updating amount donated:', error);
      throw new Error('Failed to update amount donated for campaign');
    }
  }
}
