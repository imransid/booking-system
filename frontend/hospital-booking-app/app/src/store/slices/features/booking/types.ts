import { BookingInput } from "@/app/src/hooks/useBooking";

export interface IBookingType {
  errors: string;
  booking: BookingInput[];
}
