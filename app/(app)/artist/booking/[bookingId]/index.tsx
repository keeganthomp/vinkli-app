import {
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GET_ARTIST_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import { useState, useRef } from 'react';
import { Booking, ArtistBookingQuery } from '@graphql/types';
import ArtistHeader from '@components/artist/ArtistScreenHeader';
import TattooInfo from '@components/bookings/BookingDetail/TattooInfo';
import BookingActions from '@components/bookings/BookingDetail/BookingActions';
import BookingHeader from '@components/bookings/BookingDetail/BookingHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostBookingForm from '@components/artist/PostBookingForm';
import theme from '@theme';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';

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

  const openPostBookingForm = () => {
    SheetManager.show(sheetIds.artistPostBookingSheet);
  };

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
          backgroundColor: theme.appBackground,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: theme.appBackground,
        }}
      >
        <ArtistHeader title="Booking Detail" onBackPress={goBack} canGoBack />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          style={{
            height: '100%',
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingBottom: 150,
          }}
        >
          <BookingHeader booking={booking} />
          <BookingActions
            onBookingComplete={openPostBookingForm}
            booking={booking}
          />
          <TattooInfo tattoo={booking?.tattoo} />
        </ScrollView>
      </View>
  );
}
