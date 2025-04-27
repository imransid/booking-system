import { Module } from "@nestjs/common";
import { PrismaBookingService } from "./prisma-hr.service";

@Module({
  providers: [PrismaBookingService],
  exports: [PrismaBookingService],
})
export class PrismaModule {}
