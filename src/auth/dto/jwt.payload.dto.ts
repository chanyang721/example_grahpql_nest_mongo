import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class PayloadDto {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
