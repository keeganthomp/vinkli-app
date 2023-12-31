import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';
import { BOOKING_FRAGMENT } from '../fragments/booking';
import { TATTOO_FRAGMENT } from '../fragments/tattoo';

export const GET_USER_BOOKINGS = gql`
  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${TATTOO_FRAGMENT}
  query userBookings($status: BookingStatus) {
    userBookings(status: $status) {
      ...BookingFragment
      customer {
        ...UserFragment
      }
      artist {
        ...UserFragment
      }
      tattoo {
        ...TattooFragment
      }
    }
  }
`;

export const GET_USER_BOOKING = gql`
  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${TATTOO_FRAGMENT}
  query userBooking($id: ID!) {
    userBooking(id: $id) {
      ...BookingFragment
      customer {
        ...UserFragment
      }
      artist {
        ...UserFragment
      }
      tattoo {
        ...TattooFragment
      }
    }
  }
`;