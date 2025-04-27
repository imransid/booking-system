import { Injectable } from "@nestjs/common";
import { PrismaBookingService } from "../../../../../prisma/prisma-hr.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UnauthorizedException, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {
  CreateUserInput,
  UpdateUserInput,
  LoginInput,
  UsersPaginatedResult,
} from "../dto/user.input";
import { JwtPayload } from "../interfaces/jwtPayload.interface";
import { User } from "../entities/user"; // Assuming User entity is created

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaBookingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(data: LoginInput) {
    const { email, password } = data;

    // Check if the email exists
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid username/password");
    }

    // Compare the password with the hash stored in the DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Password invalid.");
    }

    // Generate JWT token payload
    const payLoad: JwtPayload = {
      id: user.id,
      userType: "ADMIN",
    };

    // Generate JWT token
    const accessToken = await this.jwtService.sign(payLoad, {
      secret: this.configService.get("JWT_SECRET"),
    });

    user;
    return {
      id: user.id,
      name: user.firstName,
      token: accessToken,
    };
  }

  // Create a new user
  async createUser(data: CreateUserInput): Promise<User> {
    const { email, password } = data;

    // Check if the email already exists
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException("Email already in use");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword, // Store the hashed password
      },
    });

    return newUser;
  }

  // Find all users with pagination support
  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<UsersPaginatedResult> {
    const skip = (page - 1) * limit;

    // Fetch users with pagination
    const users = await this.prismaService.user.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get the total count of users
    const totalCount = await this.prismaService.user.count();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / limit);

    // Return the paginated result
    return {
      users,
      totalPages,
      currentPage: page,
      totalCount,
    };
  }

  // Find a user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Update user information
  async updateUser(id: number, data: UpdateUserInput): Promise<User> {
    // Check if user exists
    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // If password is updated, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  // Delete a user
  async deleteUser(id: number): Promise<User> {
    // Check if user exists
    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Delete user
    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });

    return deletedUser;
  }
}
