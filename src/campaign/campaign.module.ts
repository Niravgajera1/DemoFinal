import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from '../Schemas/campaign.Schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/Schemas/auth.Schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Campaign.name,
        schema: CampaignSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // Fix useFactory
        secret: configService.get<string>('JWT_SECRET'), // Retrieve JWT_SECRET from config
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES'),
        },
      }),
    }),
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
