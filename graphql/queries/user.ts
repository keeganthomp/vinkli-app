import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments/user';

export const GET_USER = gql`
  ${USER_FRAGMENT}
  query GetUser {
    user {
      ...UserFragment
    }
  }
`;
