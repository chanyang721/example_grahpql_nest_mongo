import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { IUser } from '../interfaces/interface/user.interface';
import { UserEntity } from '../entities/user.entity';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async getById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User with this id does not exist');
    }

    return user;
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne(email);
  }

  async setCurrentRefreshToken(refreshToken: string | null, id: string) {
    let currentHashedRefreshToken: string;

    if (refreshToken !== null) {
      currentHashedRefreshToken = await hash(
        refreshToken,
        this.configService.get<number>('SALT_ROUND'),
      );
    }

    await this.userRepository.updateOne(id, currentHashedRefreshToken);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, _id: string) {
    const user = await this.getById(_id);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (!isRefreshTokenMatching) {
      throw new BadRequestException(
        'Refresh token is not matched, please retry login',
      );
    }

    return user;
  }
}
