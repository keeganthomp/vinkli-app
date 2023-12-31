import { View, ActivityIndicator, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GET_USER_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import { Booking, UserBookingQuery, GetPaymentLinkQuery } from '@graphql/types';
import ArtistHeader from '@components/artist/ArtistScreenHeader';
import { GET_PAYMENT_LINK } from '@graphql/queries/payments';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';
import CollectPaymentInfo from '@components/payments/CollectPaymentInfo';
import PaymentReceived from '@components/payments/PaymentReceived';
import Error from '@components/Error';
import { useEffect } from 'react';

const isWeb = Platform.OS === 'web';

export default function ArtistBookingCollectPayment() {
  const { bookingId } = useLocalSearchParams();
  const {
    data: bookingData,
    loading,
    error: errorFetchingBooking,
    startPolling,
    stopPolling,
  } = useQuery<UserBookingQuery>(GET_USER_BOOKING, {
    variables: {
      id: bookingId,
    },
  });
  const {
    data: paymentLinkData,
    loading: paymentLinkLoading,
    error: errorGettingPaymentLink,
    refetch: refetchPaymentLink,
  } = useQuery<GetPaymentLinkQuery>(GET_PAYMENT_LINK, {
    variables: {
      bookingId,
    },
  });

  const booking = bookingData?.userBooking as Booking;
  const paymentLink = paymentLinkData?.getPaymentLink;

  useEffect(() => {
    const pollInterval = 2500;
    // Check if the booking data has been loaded and if it's not paid
    if (bookingData && !bookingData?.userBooking?.paymentReceived) {
      // Start polling if the booking is not paid
      startPolling(pollInterval);
    } else {
      // Stop polling in other cases (e.g., if the booking is paid or there's no data)
      stopPolling();
    }
    // Cleanup function to stop polling when component unmounts
    return () => {
      stopPolling();
    };
  }, [bookingData, startPolling, stopPolling]);

  if (loading || paymentLinkLoading) {
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

  if (errorFetchingBooking || errorGettingPaymentLink) {
    return (
      <Error
        message={
          errorFetchingBooking?.message || errorGettingPaymentLink?.message
        }
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ArtistHeader
        title="Collect Payment"
        onClosePress={router.back}
        modalHeader
      />
      {!booking.paymentReceived ? (
        <CollectPaymentInfo booking={booking} paymentLink={paymentLink || ''} />
      ) : (
        <PaymentReceived booking={booking} />
      )}
      <Toast topOffset={25} config={toastConfig} />
    </View>
  );
}
