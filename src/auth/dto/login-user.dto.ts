import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserDto {
  /**
   * 유저 이메일
   */
  @ApiProperty({
    name: 'email',
    description: 'The email of the user',
    required: false,
    example: 'user@email.com',
    type: String,
  })
  @Field(() => String, {
    description: 'The email of the user',
    nullable: true,
  })
  @IsEmail({
    message: 'Email must be a valid email',
  })
  readonly email: string;

  /**
   * 유저 비밀번호
   */
  @ApiProperty({
    name: 'password',
    description: 'The password of the user',
    required: false,
    example: 'password',
  })
  @Field(() => String, {
    description: 'The password of the user',
    nullable: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
