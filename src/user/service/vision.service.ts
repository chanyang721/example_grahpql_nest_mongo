import { Injectable } from '@nestjs/common';
import { UpsertVisionDto } from '../dto/upsert-vision.dto';
import { IVision } from '../interfaces/interface/vision.interface';
import { VisionRepository } from '../repository/vision.repository';

@Injectable()
export class VisionService {
  constructor(private readonly visionRepository: VisionRepository) {}

  async findVision(user_id: string) {
    return await this.visionRepository.getVision(user_id);
  }

  async upsertVision(upsertVisionDto: UpsertVisionDto) {
    return await this.visionRepository.upsertVision(upsertVisionDto);
  }
}
