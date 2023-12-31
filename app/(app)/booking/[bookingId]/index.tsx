import {
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GET_USER_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Booking, UserBookingQuery } from '@graphql/types';
import ArtistHeader from '@components/artist/ArtistScreenHeader';
import TattooInfo from '@components/bookings/BookingDetail/TattooInfo';
import BookingActions from '@components/bookings/BookingDetail/BookingActions';
import BookingHeader from '@components/bookings/BookingDetail/BookingHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '@theme';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import PostBookingFormModal from '@web/components/PostBookingFormModal';
import ErrorCard from '@components/Error';
import { GetUserQuery } from '@graphql/types';
import { FETCH_CURRENT_USER } from '@graphql/queries/user';

const isWeb = Platform.OS === 'web';

export default function ArtistBookingDetail() {
  const {
    data: userData,
    loading: isFetchingUser,
    error: errorFetchingUser,
  } = useQuery<GetUserQuery>(FETCH_CURRENT_USER);
  const insets = useSafeAreaInsets();
  const { bookingId } = useLocalSearchParams();
  const [isPostFormModalOpen, setIsPostFormModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: bookingData,
    loading,
    error,
    refetch,
  } = useQuery<UserBookingQuery>(GET_USER_BOOKING, {
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
    if (isWeb) {
      setIsPostFormModalOpen(true);
      return;
    }
    SheetManager.show(sheetIds.artistPostBookingSheet, {
      payload: {
        booking: bookingData?.userBooking,
      },
    });
  };

  const booking = bookingData?.userBooking as Booking;

  const goBack = () => {
    router.back();
  };

  if (loading || isFetchingUser) {
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

  if (error) {
    return <ErrorCard message={error.message || 'Error fetching booking'} />;
  }

  const isArtist = userData?.user?.userType === 'ARTIST';

  return (
    <>
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
          {isArtist && (
            <BookingActions
              onBookingComplete={openPostBookingForm}
              booking={booking}
            />
          )}
          <TattooInfo tattoo={booking?.tattoo} />
        </ScrollView>
      </View>
      {isWeb && (
        <PostBookingFormModal
          isOpen={isPostFormModalOpen}
          onClose={() => setIsPostFormModalOpen(false)}
          booking={booking}
        />
      )}
    </>
  );
}
