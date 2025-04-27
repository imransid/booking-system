import {
  InputType,
  Field,
  PartialType,
  Int,
  ObjectType,
} from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { User } from "../entities/user"; // assuming User is imported from the appropriate path

// Create User Input Model
@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}

// Update User Input Model (PartialType)
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  @IsString()
  id: number;
}

// Paginated Result Model for Users
@ObjectType()
export class UsersPaginatedResult {
  @Field(() => [User], { defaultValue: [] })
  users: User[] = [];

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalCount: number;

  constructor(
    users: User[],
    totalPages: number,
    currentPage: number,
    totalCount: number
  ) {
    this.users = users ?? [];
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.totalCount = totalCount;
  }
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
