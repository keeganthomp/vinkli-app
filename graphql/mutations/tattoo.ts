import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';
import { BOOKING_FRAGMENT } from '../fragments/booking';
import { TATTOO_FRAGMENT } from '../fragments/tattoo';

export const GET_CUSTOMER_TATTOOS = gql`
  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${TATTOO_FRAGMENT}
  query customerTattoos {
    customerTattoos {
      ...TattooFragment
      customer {
        ...UserFragment
      }
      consultation {
        ...BookingFragment
        artist {
          ...UserFragment
        }
      }
      sessions {
        ...BookingFragment
        artist {
          ...UserFragment
        }
      }
    }
  }
`;
