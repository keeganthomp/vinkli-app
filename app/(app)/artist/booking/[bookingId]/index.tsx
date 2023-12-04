import {
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GET_ARTIST_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Booking, ArtistBookingQuery } from '@graphql/types';
import ArtistHeader from '@components/artist/ArtistHeader';
import BookingInfo from '@components/bookings/BookingDetail/BookingInfo';
import BookingActions from '@components/bookings/BookingDetail/BookingActions';
import BookingHeader from '@components/bookings/BookingDetail/BookingHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ArtistBookingDetail() {
  const insets = useSafeAreaInsets();
  const { bookingId } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: bookingData,
    loading,
    error,
    refetch,
  } = useQuery<ArtistBookingQuery>(GET_ARTIST_BOOKING, {
    variables: {
      id: bookingId,
    },
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
          paddingTop: insets.top,
        }}
      >
        <ArtistHeader onBackPress={goBack} canGoBack />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingBottom: 150,
          }}
        >
          <BookingHeader booking={booking} />
          <BookingActions
            booking={booking}
            openPaymentModal={openPaymentModal}
          />
          <BookingInfo booking={booking} />
        </ScrollView>
      </View>
    </>
  );
}
