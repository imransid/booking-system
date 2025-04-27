import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaBookingService } from "../../../../../prisma/prisma-hr.service";
import {
  CreateBookingInput,
  UpdateBookingInput,
  BookingsPaginatedResult,
} from "../dto/booking.input";
import { Booking } from "../entities/booking";

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaBookingService) {}

  // Create a new booking
  async create(createBookingInput: CreateBookingInput): Promise<Booking> {
    const { hospitalId, userID, ...rest } = createBookingInput;

    return this.prisma.booking.create({
      data: {
        ...rest,
        hospital: {
          connect: { id: hospitalId },
        },
        user: {
          connect: { id: userID },
        },
      },
    });
  }

  // Get all bookings with pagination
  async findAll(page = 1, limit = 10): Promise<BookingsPaginatedResult> {
    const skip = (page - 1) * limit;

    const [bookings, totalCount] = await Promise.all([
      this.prisma.booking.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc", // ordering by createdAt (you can change this)
        },
      }),
      this.prisma.booking.count(),
    ]);

    return {
      bookings,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  // Get a single booking by its ID
  async findOne(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  // Update a booking
  async update(
    id: number,
    updateBookingInput: UpdateBookingInput
  ): Promise<Booking> {
    await this.findOne(id); // ensures the record exists
    return this.prisma.booking.update({
      where: { id },
      data: updateBookingInput,
    });
  }

  // Remove a booking by its ID
  async remove(id: number): Promise<Booking> {
    await this.findOne(id); // ensures the record exists
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
