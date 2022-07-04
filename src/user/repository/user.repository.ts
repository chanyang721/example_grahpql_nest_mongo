import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name, 'Attale-Pro')
    private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userModel.find().select({ password: 0 }).exec();
  }

  async findOne(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(_id: string): Promise<any> {
    const returnUser = await this.userModel.findById(_id).select('-password');
    return returnUser;
  }

  async updateOne(_id: string, refreshToken: string) {
    await this.userModel.updateOne({ _id }, { refreshToken });
  }
}
