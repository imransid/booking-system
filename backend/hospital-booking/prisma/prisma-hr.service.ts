import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { PrismaClient } from "./generated/booking";

@Injectable()
export class PrismaBookingService extends PrismaClient implements OnModuleInit {
  [x: string]: any;
  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }
}
