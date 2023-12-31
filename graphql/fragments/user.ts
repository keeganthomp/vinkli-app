import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    createdAt
    updatedAt
    userType
    email
    phone
    name
    stripeAccountId
    hasOnboardedToStripe
    hourlyRate
    consultationFee
  }
`;

export const ARTIST_FRAGMENT = gql`
  fragment ArtistFragment on Artist {
    id
    createdAt
    updatedAt
    email
    phone
    name
    stripeAccountId
    hasOnboardedToStripe
    hourlyRate
    consultationFee
  }
`;
