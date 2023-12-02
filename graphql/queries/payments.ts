import { gql } from '@apollo/client';

export const GET_STRIPE_TERMINAL_TOKEN = gql`
  query stripeTerminalConnectionToken {
    stripeTerminalConnectionToken
  }
`;
