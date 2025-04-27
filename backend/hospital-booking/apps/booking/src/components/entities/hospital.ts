import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Hospital {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [String])
  services: string[];

  @Field()
  imageUrl: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
