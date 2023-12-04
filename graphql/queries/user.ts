import { gql } from '@apollo/client';
import { USER_FRAGMENT, ARTIST_FRAGMENT } from '../fragments/user';

export const GET_USER = gql`
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
