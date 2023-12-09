import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GET_ARTIST_BOOKING } from '@graphql/queries/booking';
import { useQuery } from '@apollo/client';
import {
  Booking,
  ArtistBookingQuery,
  GetPaymentLinkQuery,
} from '@graphql/types';
import ArtistHeader from '@components/artist/ArtistHeader';
import { GET_PAYMENT_LINK } from '@graphql/queries/payments';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@utils/toast';
import CollectPaymentInfo from '@components/payments/CollectPaymentInfo';
import PaymentReceived from '@components/payments/PaymentReceived';
import Error from '@components/Error';

export default function ArtistBookingCollectPayment() {
  const { bookingId } = useLocalSearchParams();
  const {
    data: bookingData,
    loading,
    error: errorFetchingBooking,
  } = useQuery<ArtistBookingQuery>(GET_ARTIST_BOOKING, {
    variables: {
      id: bookingId,
    },
    // poll for success when opened
    // TODO: conditionaly do this only when the booking is not paid
    pollInterval: 2500,
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

  const booking = bookingData?.artistBooking as Booking;
  const paymentLink = paymentLinkData?.getPaymentLink;

  const goBack = () => {
    router.back();
  };

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
      <ArtistHeader title="Collect Payment" onClosePress={goBack} modalHeader />
      {!booking.paymentReceived ? (
        <CollectPaymentInfo booking={booking} paymentLink={paymentLink || ''} />
      ) : (
        <PaymentReceived booking={booking} />
      )}
      <Toast topOffset={25} config={toastConfig} />
    </View>
  );
}
