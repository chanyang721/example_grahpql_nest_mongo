import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto';
import { UserEntity, UserDocument } from 'src/user/entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(UserEntity.name, 'test')
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUserOption = new this.userModel(createUserDto);
    const user = await newUserOption.save();
    return user.toObject();
  }
}
