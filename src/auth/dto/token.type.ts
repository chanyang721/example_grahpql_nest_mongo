import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'token' })
export class TokenType {
  @Field({ description: 'The accessToken of the token' })
  readonly accessToken: string;

  @Field({ description: 'The accessOption of the token' })
  readonly accessOption: string;

  @Field({ description: 'The refreshToken of the token' })
  readonly refreshToken?: string;

  @Field({ description: 'The refreshOption of the token' })
  readonly refreshOption?: string;
}
