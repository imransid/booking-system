import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaBookingService } from "../../../../../prisma/prisma-hr.service";
import {
  CreateHospitalInput,
  UpdateHospitalInput,
  HospitalsPaginatedResult,
} from "../dto/hospital.input";
import { Hospital } from "../entities/hospital";

@Injectable()
export class HospitalService {
  constructor(private readonly prisma: PrismaBookingService) {}

  async create(createHospitalInput: CreateHospitalInput): Promise<Hospital> {
    return this.prisma.hospital.create({
      data: createHospitalInput,
    });
  }

  async findAll(page = 1, limit = 10): Promise<HospitalsPaginatedResult> {
    const skip = (page - 1) * limit;

    const [hospitals, totalCount] = await Promise.all([
      this.prisma.hospital.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc", // or any other default ordering
        },
      }),
      this.prisma.hospital.count(),
    ]);

    return {
      hospitals,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  async findOne(id: number): Promise<Hospital> {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
    });

    if (!hospital) {
      throw new NotFoundException(`Hospital with ID ${id} not found`);
    }

    return hospital;
  }

  async update(
    id: number,
    updateHospitalInput: UpdateHospitalInput
  ): Promise<Hospital> {
    await this.findOne(id); // ensures the record exists
    return this.prisma.hospital.update({
      where: { id },
      data: updateHospitalInput,
    });
  }

  async remove(id: number): Promise<Hospital> {
    await this.findOne(id); // ensures the record exists
    return this.prisma.hospital.delete({
      where: { id },
    });
  }
}
