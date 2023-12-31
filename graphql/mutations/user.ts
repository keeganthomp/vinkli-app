import { gql } from '@apollo/client';
import { USER_FRAGMENT, ARTIST_FRAGMENT } from '../fragments/user';

export const GEN_STRIPE_CONNECT_ONBOARDING_LINK = gql`
  mutation generateStripeConnectOnboardingLink {
    generateStripeConnectOnboardingLink
  }
`;

export const UPDATE_ARTIST_RATES = gql`
  ${ARTIST_FRAGMENT}
  mutation updateArtistRates($hourlyRate: Int!, $consultationFee: Int!) {
    updateArtistRates(
      hourlyRate: $hourlyRate
      consultationFee: $consultationFee
    ) {
      ...ArtistFragment
    }
  }
`;

export const ONBOARD_USER = gql`
  ${USER_FRAGMENT}
  mutation onboardUser($input: OnboardUserInput!) {
    onboardUser(input: $input) {
      ...UserFragment
    }
  }
`;
