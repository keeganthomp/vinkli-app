import { gql } from '@apollo/client';

export const PAYMENT_FRAGMENT = gql`
  fragment PaymentFragment on Payment {
    chargeId
    paymentIntentId
    createdAt
    amount
    status
    bookingId
  }
`;
