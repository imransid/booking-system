import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Booking } from "../entities/booking"; // Assuming you have a Booking entity

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => [Booking], { defaultValue: [] })
  Booking?: Booking[];
}

@ObjectType()
export class Auth {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  token: string;

}
