import { gql } from "@apollo/client";

export const BOOK_APPOINTMENT_MUTATION = gql`
  mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
      id
      contactNumber
      bookingTime
      bookingDate
      bookingService
      hospitalId
      userID
      createdAt
      updatedAt
    }
  }
`;
