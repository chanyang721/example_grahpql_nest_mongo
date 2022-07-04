import { Types } from 'mongoose';
import { Sex } from 'src/user/enums/Sex';
import { UserRole } from 'src/user/enums/UserRole';

export interface IUser {
  /**
   * 유저 아이디
   */
  readonly _id?: Types.ObjectId;

  /**
   * 유저 이메일
   */
  readonly email?: string;

  /**
   * 유저 이름
   */
  readonly name?: string;

  /**
   * 유저 생년월일 (YYYY-MM-DD)
   */
  readonly birth?: string;

  /**
   * 유저 비밀번호
   */
  readonly password?: string;

  /**
   * 유저 성별
   */
  readonly sex?: Sex;

  /**
   * 유저 역할
   */
  readonly role?: UserRole;

  /**
   * 유저 프로파일 이미지
   */
  readonly photo?: string;

  /**
   * 리프레시 토큰
   */
  readonly currentHashedRefreshToken?: string;
}
