
import { gql } from '@apollo/client';

export const TATTOO_FRAGMENT = gql`
  fragment TattooFragment on Tattoo {
    id
    createdAt
    updatedAt
    customerId
    title
    description
    tattooStyle
    tattooColor
    imageUrls
  }
`;
