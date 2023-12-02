import { gql } from '@apollo/client';
import {
  CHARGE_FRAGMENT,
  REFUND_FRAGMENT,
  BALANCE_FRAGMENT,
  PAYOUT_FRAGMENT,
} from '../fragments/financials';

export const GET_ARTIST_FINANCIALS = gql`
  ${CHARGE_FRAGMENT}
  ${REFUND_FRAGMENT}
  ${BALANCE_FRAGMENT}
  ${PAYOUT_FRAGMENT}
  query artistFinancials {
    artistFinancials {
      charges {
        ...ChargeFragment
      }
      balance {
        ...BalanceFragment
      }
      payouts {
        ...PayoutFragment
      }
      refunds {
        ...RefundFragment
      }
    }
  }
`;
