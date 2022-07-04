import { InputType } from '@nestjs/graphql';
import { IsObject, IsString } from 'class-validator';
import { IVision } from '../interfaces/interface/vision.interface';

@InputType()
export class UpsertVisionDto {
  constructor(data: IVision) {
    return Object.assign(this, data);
  }
  /**
   * 유저 아이디
   */
  @IsObject()
  readonly _id?: object;

  /**
   * 직업 비전
   */
  @IsString()
  readonly career_vision?: string;

  /**
   * 학습 비전
   */
  @IsString()
  readonly study_vision?: string;

  /**
   * 건강 비전
   */
  @IsString()
  readonly health_vision?: string;

  /**
   * 관계 비전
   */
  @IsString()
  readonly relationship_vision?: string;

  /**
   * 주거 비전
   */
  @IsString()
  readonly living_vision?: string;

  /**
   * 사회참여 비전
   */
  @IsString()
  readonly social_vision?: string;

  /**
   * 여가 비전
   */
  @IsString()
  readonly leisure_vision?: string;

  /**
   * 재무 비전
   */
  @IsString()
  readonly finance_vision?: string;
}
