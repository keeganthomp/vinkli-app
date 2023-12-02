import { View } from 'react-native';
import Header from '@components/artist/ArtistHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { GET_ARTIST_FINANCIALS } from '@graphql/queries/financials';
import { ArtistFinancialsQuery } from '@graphql/types';
import Readers from '@components/CardReader';

export default function ArtistPayments() {
  const insets = useSafeAreaInsets();
  const {
    data: financialsData,
    loading: loadingFinancials,
    error: errorFetchingFinancials,
  } = useQuery<ArtistFinancialsQuery>(GET_ARTIST_FINANCIALS);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <Header title="Payments" />
      <Readers />
    </View>
  );
}
