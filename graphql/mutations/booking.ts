import { gql } from '@apollo/client';
import { BOOKING_FRAGMENT } from '@graphql/fragments/booking';

export const CREATE_CUSTOMER_BOOKING = gql`
  ${BOOKING_FRAGMENT}
  mutation CustomerCreateBooking($input: CustomerCreateBookingInput!) {
    customerCreateBooking(input: $input) {
      ...BookingFragment
    }
  }
`;

export const CREATE_ARTIST_BOOKING = gql`
  ${BOOKING_FRAGMENT}
  mutation ArtistCreateBooking($input: ArtistCreateBookingInput!) {
    artistCreateBooking(input: $input) {
      ...BookingFragment
    }
  }
`;

export const ARTIST_UPDATE_BOOKING_STATUS = gql`
  ${BOOKING_FRAGMENT}
  mutation ArtistUpdateBookingStatus(
    $id: ID!
    $status: BookingStatus!
    $duration: Int
  ) {
    artistUpdateBookingStatus(id: $id, status: $status, duration: $duration) {
      ...BookingFragment
    }
  }
`;
