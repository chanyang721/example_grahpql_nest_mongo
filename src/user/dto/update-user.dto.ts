import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.dto';
@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
