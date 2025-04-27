import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BookingService } from "./booking.service";
import {
  CreateBookingInput,
  UpdateBookingInput,
  BookingsPaginatedResult,
} from "../dto/booking.input";
import { Booking } from "../entities/booking";
import { NotFoundException } from "@nestjs/common";
import { GraphQLException } from "exceptions/graphql-exception";

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation(() => Booking)
  async createBooking(
    @Args("createBookingInput") createBookingInput: CreateBookingInput
  ): Promise<Booking> {
    try {
      return await this.bookingService.create(createBookingInput);
    } catch (error) {
      throw new GraphQLException(
        "Failed to create booking: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  @Query(() => BookingsPaginatedResult)
  async bookings(
    @Args("page", { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args("limit", { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number
  ): Promise<BookingsPaginatedResult> {
    try {
      return await this.bookingService.findAll(page, limit);
    } catch (error) {
      throw new GraphQLException(
        "Failed to fetch bookings: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  @Query(() => Booking)
  async booking(@Args("id", { type: () => Int }) id: number): Promise<Booking> {
    try {
      return await this.bookingService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(
          `Booking with ID ${id} not found`,
          "NOT_FOUND"
        );
      }
      throw new GraphQLException(
        "Failed to fetch booking: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  @Mutation(() => Booking)
  async updateBooking(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateBookingInput") updateBookingInput: UpdateBookingInput
  ): Promise<Booking> {
    try {
      return await this.bookingService.update(id, updateBookingInput);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(
          `Booking with ID ${id} not found`,
          "NOT_FOUND"
        );
      }
      throw new GraphQLException(
        "Failed to update booking: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  @Mutation(() => Booking)
  async removeBooking(
    @Args("id", { type: () => Int }) id: number
  ): Promise<Booking> {
    try {
      return await this.bookingService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(
          `Booking with ID ${id} not found`,
          "NOT_FOUND"
        );
      }
      throw new GraphQLException(
        "Failed to remove booking: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }
}
