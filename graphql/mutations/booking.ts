import { gql } from '@apollo/client';
import { BOOKING_FRAGMENT } from '../fragments/booking';
import { USER_FRAGMENT } from '../fragments/user';

export const CREATE_CUSTOMER_BOOKING = gql`
  ${BOOKING_FRAGMENT}
  ${USER_FRAGMENT}
  mutation customerCreateBooking($input: CustomerCreateBookingInput!) {
    customerCreateBooking(input: $input) {
      booking {
        ...BookingFragment
        customer {
          ...UserFragment
        }
        artist {
          ...UserFragment
        }
      }
      customerInfo {
        isNewCustomer
        isConfirmed
        inviteSent
      }
    }
  }
`;

export const CREATE_ARTIST_BOOKING = gql`
  ${BOOKING_FRAGMENT}
  mutation artistCreateBooking($input: ArtistCreateBookingInput!) {
    artistCreateBooking(input: $input) {
      ...BookingFragment
    }
  }
`;

export const ARTIST_UPDATE_BOOKING_STATUS = gql`
  ${BOOKING_FRAGMENT}
  mutation artistUpdateBookingStatus(
    $id: ID!
    $status: BookingStatus!
    $duration: Int
  ) {
    artistUpdateBookingStatus(id: $id, status: $status, duration: $duration) {
      ...BookingFragment
    }
  }
`;
