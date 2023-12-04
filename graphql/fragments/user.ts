import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    createdAt
    updatedAt
    email
    firstName
    lastName
    userType
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
    firstName
    lastName
    stripeAccountId
    hasOnboardedToStripe
    hourlyRate
    consultationFee
  }
`;
