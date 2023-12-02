
import { gql } from '@apollo/client';

export const BOOKING_FRAGMENT = gql`
  fragment BookingFragment on Booking {
    id
    createdAt
    updatedAt
    artistId
    userId
    tattooId
    title
    description
    status
    date
    type
  }
`;
