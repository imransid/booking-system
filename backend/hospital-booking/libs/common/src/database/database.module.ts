import { Module } from "@nestjs/common";
import { PrismabookingService } from "../../../../prisma/prisma-booking.service";

@Module({
  providers: [PrismabookingService],
})
export class DatabaseModule {}
