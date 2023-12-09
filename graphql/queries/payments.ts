import { gql } from '@apollo/client';
import { PAYMENT_FRAGMENT } from '@graphql/fragments/payment';
import { BOOKING_FRAGMENT } from '@graphql/fragments/booking';

export const GET_STRIPE_TERMINAL_TOKEN = gql`
  query stripeTerminalConnectionToken {
    stripeTerminalConnectionToken
  }
`;

export const GET_PAYMENT_LINK = gql`
  query getPaymentLink($bookingId: ID!) {
    getPaymentLink(bookingId: $bookingId)
  }
`;

export const GET_PAYMENTS = gql`
  ${PAYMENT_FRAGMENT}
  ${BOOKING_FRAGMENT}
  query getPayments {
    getPayments {
      ...PaymentFragment
      booking {
        ...BookingFragment
      }
    }
  }
`;
