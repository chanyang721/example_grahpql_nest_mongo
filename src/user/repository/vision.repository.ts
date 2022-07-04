import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpsertVisionDto } from '../dto/upsert-vision.dto';
import { UserDocument, UserEntity } from '../entities/user.entity';

@Injectable()
export class VisionRepository {
  constructor(
    @InjectModel(UserEntity.name, 'Attale-Pro')
    private visionModel: Model<UserDocument>,
  ) {}

  async getVision(user_id: string) {
    const user = await this.visionModel
      .findOne({ _id: user_id })
      .select({ password: 0 })
      .exec();

    return user;
  }

  async upsertVision(upsertVisionDto: UpsertVisionDto) {
    const { _id, ...visionData } = upsertVisionDto;
    const user = await this.visionModel.updateOne({ _id }, visionData, {
      upsert: true,
      timestamps: false,
    });

    return user;
  }
}
