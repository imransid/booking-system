import {
  InputType,
  Field,
  Int,
  ObjectType,
  PartialType,
} from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  IsInt,
} from "class-validator";
import { Hospital } from "../entities/hospital";

// Create Hospital Input Model
@InputType()
export class CreateHospitalInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => [String])
  @IsNotEmpty()
  @IsArray()
  services: string[];

  @Field()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}

// Update Hospital Input Model (PartialType)
@InputType()
export class UpdateHospitalInput extends PartialType(CreateHospitalInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  id: number;
}

// Paginated Result Model
@ObjectType()
export class HospitalsPaginatedResult {
  @Field(() => [Hospital], { defaultValue: [] })
  hospitals: Hospital[] = [];

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalCount: number;

  constructor(
    hospitals: Hospital[],
    totalPages: number,
    currentPage: number,
    totalCount: number
  ) {
    this.hospitals = hospitals ?? [];
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.totalCount = totalCount;
  }
}
