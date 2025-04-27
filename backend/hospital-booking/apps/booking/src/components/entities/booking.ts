import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Hospital } from "./hospital";
import { User } from "./user";

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field()
  contactNumber: string;

  @Field()
  bookingTime: Date;

  @Field()
  bookingDate: Date;

  @Field()
  bookingService: string;

  @Field(() => Int)
  hospitalId: number;

  @Field(() => Hospital)
  hospital?: Hospital;

  @Field(() => Int)
  userID: number;

  @Field(() => User)
  user?: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
