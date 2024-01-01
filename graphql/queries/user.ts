import { gql } from '@apollo/client';
import { USER_FRAGMENT, ARTIST_FRAGMENT } from '../fragments/user';

export const FETCH_CURRENT_USER = gql`
  ${USER_FRAGMENT}
  query GetUser {
    user {
      ...UserFragment
    }
  }
`;

export const GET_ARTIST = gql`
  ${ARTIST_FRAGMENT}
  query artist {
    artist {
      ...ArtistFragment
    }
  }
`;

export const GET_PUBLIC_ARTIST_PROFILE = gql`
  ${ARTIST_FRAGMENT}
  query publicArtistProfile($artistId: ID!) {
    publicArtistProfile(artistId: $artistId) {
      ...ArtistFragment
    }
  }
`;

export const CHECK_IF_USER_ONBOARDED = gql`
  query checkIfUserOnboarded($phone: String!) {
    checkIfUserOnboarded(phone: $phone)
  }
`;

export const GET_EXISTING_CUSTOMER = gql`
  ${USER_FRAGMENT}
  query existingCustomer($phone: String!) {
    existingCustomer(phone: $phone) {
      ...UserFragment
    }
  }
`;
