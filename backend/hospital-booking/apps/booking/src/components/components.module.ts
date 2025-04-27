import { Module } from "@nestjs/common";
import { PrismaModule } from "../../../../prisma/prisma.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { HospitalResolver } from "./hospital/hospital.resolver";
import { HospitalService } from "./hospital/hospital.service";

import { BookingResolver } from "./booking/booking.resolver";
import { BookingService } from "./booking/booking.service";

import { UserResolver } from "./user/user.resolver";
import { UserService } from "./user/user.service";
@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  providers: [
    JwtService,
    ConfigService,
    HospitalResolver,
    HospitalService,
    BookingResolver,
    BookingService,
    UserResolver,
    UserService,
  ],
})
export class ComponentsModule {}
