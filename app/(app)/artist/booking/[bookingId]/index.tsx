import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GET_ARTIST_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import { Booking, ArtistBookingQuery } from '@graphql/types';
import ArtistHeader from '@components/artist/ArtistHeader';
import BookingDetail from '@components/bookings/BookingDetail';
import BookingActions from '@components/bookings/BookingDetail/BookingActions';
import BookingHeader from '@components/bookings/BookingDetail/BookingHeader';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ArtistBookingDetail() {
  const insets = useSafeAreaInsets();
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

  const openPaymentModal = () => {
    router.push(`/artist/booking/${bookingId}/collect-payment`);
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
          paddingTop: insets.top,
        }}
      >
        <ArtistHeader onBackPress={goBack} canGoBack />
        <BookingHeader booking={booking} />
        <BookingActions booking={booking} openPaymentModal={openPaymentModal} />
        <BookingDetail booking={booking} />
      </View>
      <Toast />
    </>
  );
}
