import { Controller, Get } from "@nestjs/common";

@Controller()
export class bookingController {
  constructor() {}

  @Get()
  getHello(): string {
    return "WELCOME : TO booking)";
  }
}
