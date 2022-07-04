import { registerEnumType } from '@nestjs/graphql';

/**
 * 성별 식별
 */
export enum Sex {
  MALE = 'MALE', // 남성
  FEMALE = 'FEMALE', // 여성
  NONE = 'NONE', // 그외
}

/**
 * !WARING: 상수값 GraphQL등록.
 */
registerEnumType(Sex, {
  name: 'Sex',
});
