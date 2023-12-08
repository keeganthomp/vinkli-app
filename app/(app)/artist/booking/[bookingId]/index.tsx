import {
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GET_ARTIST_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import { useState, useRef } from 'react';
import { Booking, ArtistBookingQuery } from '@graphql/types';
import ArtistHeader from '@components/artist/ArtistHeader';
import TattooInfo from '@components/bookings/BookingDetail/TattooInfo';
import BookingActions from '@components/bookings/BookingDetail/BookingActions';
import BookingHeader from '@components/bookings/BookingDetail/BookingHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from '@components/modals/Modal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PostBookingForm from '@components/artist/PostBookingForm';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const screenHeight = Dimensions.get('screen').height;

export default function ArtistBookingDetail() {
  const insets = useSafeAreaInsets();
  const postBookingFormModalRef = useRef<BottomSheetModal>(null);
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
    postBookingFormModalRef.current?.present();
  };
  const closePostBookingForm = () => {
    postBookingFormModalRef.current?.close();
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
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
        }}
      >
        <ArtistHeader onBackPress={goBack} canGoBack />
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
      <Modal
        ref={postBookingFormModalRef}
        detached
        enableDynamicSizing={false}
        height={175}
        bottomInset={screenHeight / 2.5}
        containerStyle={{
          marginHorizontal: 12,
        }}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <PostBookingForm
            bookingId={bookingId as string}
            closeModal={closePostBookingForm}
          />
        </View>
      </Modal>
    </BottomSheetModalProvider>
  );
}
