import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { HospitalService } from "./hospital.service";
import {
  CreateHospitalInput,
  UpdateHospitalInput,
  HospitalsPaginatedResult,
} from "../dto/hospital.input";
import { Hospital } from "../entities/hospital";
import { NotFoundException } from "@nestjs/common";
import { GraphQLException } from "exceptions/graphql-exception";

@Resolver(() => Hospital)
export class HospitalResolver {
  constructor(private readonly hospitalService: HospitalService) {}

  @Mutation(() => Hospital)
  async createHospital(
    @Args("createHospitalInput") createHospitalInput: CreateHospitalInput
  ): Promise<Hospital> {
    try {
      return await this.hospitalService.create(createHospitalInput);
    } catch (error) {
      throw new GraphQLException(
        "Failed to create hospital: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  @Query(() => HospitalsPaginatedResult)
  async hospitals(
    @Args("page", { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args("limit", { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number
  ): Promise<HospitalsPaginatedResult> {
    try {
      return await this.hospitalService.findAll(page, limit);
    } catch (error) {
      throw new GraphQLException(
        "Failed to fetch hospitals: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  @Query(() => Hospital)
  async hospital(
    @Args("id", { type: () => Int }) id: number
  ): Promise<Hospital> {
    try {
      return await this.hospitalService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(
          `Hospital with ID ${id} not found`,
          "NOT_FOUND"
        );
      }
      throw new GraphQLException(
        "Failed to fetch hospital: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  @Mutation(() => Hospital)
  async updateHospital(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateHospitalInput") updateHospitalInput: UpdateHospitalInput
  ): Promise<Hospital> {
    try {
      return await this.hospitalService.update(id, updateHospitalInput);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(
          `Hospital with ID ${id} not found`,
          "NOT_FOUND"
        );
      }
      throw new GraphQLException(
        "Failed to update hospital: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  @Mutation(() => Hospital)
  async removeHospital(
    @Args("id", { type: () => Int }) id: number
  ): Promise<Hospital> {
    try {
      return await this.hospitalService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(
          `Hospital with ID ${id} not found`,
          "NOT_FOUND"
        );
      }
      throw new GraphQLException(
        "Failed to remove hospital: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }
}
