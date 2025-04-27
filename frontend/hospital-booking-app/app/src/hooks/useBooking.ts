import { useState } from "react";
import { useMutation } from "@apollo/client";
import { BOOK_APPOINTMENT_MUTATION } from "../mutation/booking.mutations";
import ToastPopUp from "../utils/Toast";
import { useDispatch } from "react-redux";
import { successfullyTransactionsAction } from "../store/slices/features/booking/slice";

export interface BookingInput {
  contactNumber: string;
  bookingService: string;
  bookingDate: Date;
  bookingTime: Date;
  hospitalId: number;
  userID: number;
}

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [bookAppointmentMutation] = useMutation(BOOK_APPOINTMENT_MUTATION);

  const handleBooking = async (input: BookingInput) => {
    try {
      setLoading(true);
      setErrorMessage(null); // Clear any previous error messages

      const response = await bookAppointmentMutation({
        variables: { createBookingInput: input },
      });

      dispatch(successfullyTransactionsAction(response.data.createBooking));

      ToastPopUp("Your appointment has been booked successfully!");
      return response.data.createBooking;
    } catch (error: any) {
      console.error("Booking Failed:", error);

      // Handle error based on the error message or code
      if (error.message.includes("Service Unavailable")) {
        ToastPopUp(
          "The hospital service is currently unavailable. Please try again later."
        );
      } else {
        ToastPopUp("An unexpected error occurred. Please try again later.");
      }

      setErrorMessage(
        "An error occurred while booking your appointment. Please try again."
      );

      throw error; // Optionally re-throw the error if needed for other handling
    } finally {
      setLoading(false);
    }
  };

  return { handleBooking, loading, errorMessage };
};
