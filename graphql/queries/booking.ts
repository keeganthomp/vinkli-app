import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';
import { BOOKING_FRAGMENT } from '../fragments/booking';
import { TATTOO_FRAGMENT } from '../fragments/tattoo';

export const GET_CUSTOMER_BOOKINGS = gql`
  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${TATTOO_FRAGMENT}
  query customerBookings($status: BookingStatus) {
    customerBookings(status: $status) {
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

export const GET_CUSTOMER_BOOKING = gql`
  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${TATTOO_FRAGMENT}
  query customerBooking($id: ID!) {
    customerBooking(id: $id) {
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

export const GET_ARTIST_BOOKINGS = gql`
  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${TATTOO_FRAGMENT}
  query artistBookings($statuses: [BookingStatus]) {
    artistBookings(statuses: $statuses) {
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

export const GET_ARTIST_BOOKING = gql`
  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${TATTOO_FRAGMENT}
  query artistBooking($id: ID!) {
    artistBooking(id: $id) {
      ...BookingFragment
      payment {
        paymentIntentId
        chargeId
        status
      }
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
