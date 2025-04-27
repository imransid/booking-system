import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UserService } from "./user.service";
import {
  CreateUserInput,
  UpdateUserInput,
  LoginInput,
  UsersPaginatedResult,
} from "../dto/user.input";
import { Auth, User } from "../entities/user"; // Assuming you have a User entity
import { NotFoundException } from "@nestjs/common";
import { GraphQLException } from "exceptions/graphql-exception"; // Assuming GraphQLException exists

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Mutation to create a new user
  @Mutation(() => User)
  async createUser(
    @Args("createUserInput") createUserInput: CreateUserInput
  ): Promise<User> {
    try {
      return await this.userService.createUser(createUserInput);
    } catch (error) {
      throw new GraphQLException(
        "Failed to create user: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  // Query to get a list of users with pagination
  @Query(() => UsersPaginatedResult)
  async users(
    @Args("page", { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args("limit", { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number
  ): Promise<UsersPaginatedResult> {
    try {
      return await this.userService.findAll(page, limit);
    } catch (error) {
      throw new GraphQLException(
        "Failed to fetch users: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  // Query to get a single user by ID
  @Query(() => User)
  async user(@Args("id", { type: () => Int }) id: number): Promise<User> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(`User with ID ${id} not found`, "NOT_FOUND");
      }
      throw new GraphQLException(
        "Failed to fetch user: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  // Mutation to update a user
  @Mutation(() => User)
  async updateUser(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateUserInput") updateUserInput: UpdateUserInput
  ): Promise<User> {
    try {
      return await this.userService.updateUser(id, updateUserInput);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(`User with ID ${id} not found`, "NOT_FOUND");
      }
      throw new GraphQLException(
        "Failed to update user: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  // Mutation to delete a user
  @Mutation(() => User)
  async removeUser(@Args("id", { type: () => Int }) id: number): Promise<User> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new GraphQLException(`User with ID ${id} not found`, "NOT_FOUND");
      }
      throw new GraphQLException(
        "Failed to remove user: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }

  // Mutation for user login
  @Mutation(() => Auth)
  async loginUser(@Args("loginInput") loginInput: LoginInput) {
    try {
      let user = await this.userService.login(loginInput);

      if (user) {
        return {
          token: user.token,
          id: user.id,
          name: user.name,
        };
      } else {
        throw new GraphQLException(
          "Failed to log in user: ",
          "INTERNAL_SERVER_ERROR"
        );
      }
    } catch (error) {
      throw new GraphQLException(
        "Failed to log in user: " + error.toString(),
        "INTERNAL_SERVER_ERROR"
      );
    }
  }
}
