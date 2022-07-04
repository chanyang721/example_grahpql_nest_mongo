import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/UserRole';
import { Sex } from '../enums/Sex';
import { IsOnlyDate } from 'src/configuration/decorators/is-only-date.validation';
import { Optional } from '@nestjs/common';

@InputType()
export class CreateUserDto {
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
    name: 'email',
    nullable: true,
    description: 'The email of the user',
  })
  @IsEmail({
    message: 'Email is not valid',
  })
  readonly email: string;

  /**
   * 유저 이름
   */
  @ApiProperty({
    name: 'name',
    description: 'The name of the user',
    required: false,
    example: 'John Doe',
    type: String,
    maxLength: 50,
    minLength: 2,
  })
  @Field(() => String, {
    name: 'name',
    nullable: true,
    description: 'The name of the user',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(50)
  @MinLength(2)
  readonly name: string;

  /**
   * 유저 생년월일 (YYYY-MM-DD)
   */
  @ApiProperty({
    name: 'birth',
    description: 'The birthday of the user',
    required: false,
    example: '2020-01-01',
    type: Date,
  })
  @Field(() => String, {
    name: 'birth',
    nullable: true,
    description: 'The birthday of the user',
  })
  @IsOnlyDate({
    message: 'Birthday must be a date',
  })
  readonly birth: string;

  /**
   * 유저 비밀번호
   */
  @ApiProperty({
    name: 'password',
    description: 'The password of the user',
    required: false,
    example: '12345678',
    type: String,
    minLength: 8,
    maxLength: 20,
  })
  @Field(() => String, {
    name: 'password',
    nullable: true,
    description: 'The password of the user',
  })
  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  readonly password: string;

  /**
   * 유저 성별
   */
  @ApiProperty({
    name: 'sex',
    description: '유저 성별',
    enum: Sex,
    type: Sex,
    example: Sex.FEMALE,
  })
  @Field(() => Sex, { name: 'sex', description: '유저 성별' })
  @IsEnum(Sex)
  readonly sex: Sex;

  /**
   * 유저 역할
   */
  @ApiProperty({
    name: 'role',
    description: 'user role',
    type: UserRole,
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  @Field(() => UserRole, { name: 'role' })
  readonly role: UserRole;

  /**
   * 유저 프로파일 이미지
   */
  @ApiProperty({
    name: 'photo',
    description: 'user profile image url',
    type: String,
    example: 'https://example.com/profile.png',
  })
  @Field(() => String, {
    name: 'photo',
    description: 'user profile image url.',
  })
  @IsOptional()
  @IsUrl({
    message: 'user profile image must be a url',
  })
  @Field({ nullable: true })
  readonly photo?: string;

  /**
   * refresh token
   */
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  readonly currentHashedRefreshToken?: string;

  @IsString()
  @Optional()
  @Field()
  readonly created_at?: string;

  @IsString()
  @Optional()
  @Field()
  readonly updated_at?: string;
}
