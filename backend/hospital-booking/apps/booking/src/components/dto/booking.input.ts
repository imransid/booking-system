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
  IsArray,
  IsUrl,
  IsInt,
  IsDate,
} from "class-validator";
import { Booking } from "../entities/booking";

// Create Booking Input Model
@InputType()
export class CreateBookingInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  bookingTime: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  bookingDate: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  bookingService: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  hospitalId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  userID: number;
}

// Update Booking Input Model (PartialType)
@InputType()
export class UpdateBookingInput extends PartialType(CreateBookingInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  id: number;
}

// Paginated Result Model for Bookings
@ObjectType()
export class BookingsPaginatedResult {
  @Field(() => [Booking], { defaultValue: [] })
  bookings: Booking[] = [];

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalCount: number;

  constructor(
    bookings: Booking[],
    totalPages: number,
    currentPage: number,
    totalCount: number
  ) {
    this.bookings = bookings ?? [];
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.totalCount = totalCount;
  }
}
