import { gql } from '@apollo/client';

// Charge Fragment
export const CHARGE_FRAGMENT = gql`
  fragment ChargeFragment on Charge {
    id
    amount
    createdAt
    paid
    paymentType
    description
  }
`;

// Balance Fragment
export const BALANCE_FRAGMENT = gql`
  fragment BalanceFragment on Balance {
    available {
      amount
      currency
      sourceTypes {
        card
        fpx
        bank_account
      }
    }
    reserved {
      amount
      currency
      sourceTypes {
        card
        fpx
        bank_account
      }
    }
    instantAvailable {
      amount
      currency
      sourceTypes {
        card
        fpx
        bank_account
      }
    }
    pending {
      amount
      currency
      sourceTypes {
        card
        fpx
        bank_account
      }
    }
  }
`;

// Payout Fragment
export const PAYOUT_FRAGMENT = gql`
  fragment PayoutFragment on Payout {
    id
    amount
    createdAt
    description
    sourceType
    status
    arrivalDate
  }
`;

// Refund Fragment
export const REFUND_FRAGMENT = gql`
  fragment RefundFragment on Refund {
    id
    amount
    chargeId
    createdAt
    currency
    status
  }
`;
