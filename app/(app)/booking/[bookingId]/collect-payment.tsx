import { View, ActivityIndicator, Platform, Text } from 'react-native';
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
import { GetUserQuery } from '@graphql/types';
import { FETCH_CURRENT_USER } from '@graphql/queries/user';
import NextButton from '@components/NextButton';
import theme from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const isWeb = Platform.OS === 'web';

export default function ArtistBookingCollectPayment() {
  const insets = useSafeAreaInsets();
  const { data: userData, loading: isFetchingUser } = useQuery<GetUserQuery>(
    FETCH_CURRENT_USER,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
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

  const goToProfile = () => {
    router.push('/(app)/(tabs)/profile');
  };

  const hasOnboarded =
    !!userData?.user?.stripeAccountId && userData?.user?.hasOnboardedToStripe;
  const missingStripProduct =
    errorGettingPaymentLink?.message?.includes('product not found');

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

  if (!hasOnboarded || missingStripProduct) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: theme.appBackground,
        }}
      >
        <ArtistHeader title="Collect Payment" onBackPress={router.back} canGoBack />
        <View
          style={{
            paddingTop: 75,
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              paddingBottom: 5,
            }}
          >
            Complete payment onboarding to accept payments.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              paddingBottom: 20,
              fontWeight: '300',
              fontSize: 13,
            }}
          >
            Make sure to set prices for your services.
          </Text>
          <NextButton
            onPress={goToProfile}
            label="Complete payment onboarding"
          />
        </View>
      </View>
    );
  }

  if (loading || paymentLinkLoading) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: insets.top,
          backgroundColor: theme.appBackground,
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
        paddingTop: insets.top,
        backgroundColor: theme.appBackground,
      }}
    >
      <ArtistHeader title="Collect Payment" onBackPress={router.back} canGoBack />
      {!booking.paymentReceived ? (
        <CollectPaymentInfo booking={booking} paymentLink={paymentLink || ''} />
      ) : (
        <PaymentReceived booking={booking} />
      )}
      <Toast topOffset={25} config={toastConfig} />
    </View>
  );
}
