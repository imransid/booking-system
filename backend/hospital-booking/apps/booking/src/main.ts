import { NestFactory } from "@nestjs/core";
import { bookingModule } from "./booking.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    bookingModule
    // {
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: ["amqp://user:password@rabbitmq:5672"],
    //     queue: "booking_queue",
    //     queueOptions: {
    //       durable: false,
    //     },
    //   },
    // }
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
