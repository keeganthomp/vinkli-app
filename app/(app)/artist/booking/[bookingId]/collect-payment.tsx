import { View, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GET_ARTIST_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import { Booking, ArtistBookingQuery } from '@graphql/types';
import ArtistHeader from '@components/artist/ArtistHeader';

export default function ArtistBookingCollectPayment() {
  const { bookingId } = useLocalSearchParams();
  const {
    data: bookingData,
    loading,
    error,
  } = useQuery<ArtistBookingQuery>(GET_ARTIST_BOOKING, {
    variables: {
      id: bookingId,
    },
  });

  const booking = bookingData?.artistBooking as Booking;

  const goBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <ArtistHeader
          title="Collect Payment"
          onClosePress={goBack}
          modalHeader
        />
        <Text>WEEEE</Text>
      </View>
    </>
  );
}
