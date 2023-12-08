import { gql } from '@apollo/client';

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
