import { Field, ObjectType } from '@nestjs/graphql';
import { Sex } from 'src/user/enums/Sex';
import { UserRole } from 'src/user/enums/UserRole';
import { IUser } from '../interface/user.interface';

@ObjectType({ description: 'User' })
export class UserType {
  constructor(user: IUser) {
    Object.assign(this, user);
  }

  @Field({ description: '' })
  readonly _id: string;

  @Field({ description: '' })
  readonly email: string;

  @Field({ description: '' })
  readonly name: string;

  @Field({ description: '' })
  readonly birth: Date;

  @Field({ description: '' })
  readonly password: string;

  @Field(() => Sex, { description: '' })
  readonly sex: Sex;

  @Field(() => UserRole, { description: '' })
  readonly role: UserRole;

  @Field({ description: '' })
  readonly photo?: string;

  @Field({ description: '' })
  readonly currentHashedRefreshToken?: string;
}
