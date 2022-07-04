import { registerEnumType } from '@nestjs/graphql';

/**
 * 유저 역할
 */
export enum UserRole {
  USER = 'USER', // 일반 이용자
  ADMIN = 'ADMIN', // 관리자
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
