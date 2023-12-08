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
import { bookingTypeMap } from '@const/maps';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import { formatCentsToDollars } from '@utils/money';

const screenWidth = Dimensions.get('screen').width;

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

  console.log('cost', booking.cost);

  const totalDueInCents = (booking?.cost || 0) * (booking.duration || 0);

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ArtistHeader title="Collect Payment" onClosePress={goBack} modalHeader />
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '300',
              textAlign: 'center',
              paddingBottom: 5,
            }}
          >
            {booking.duration} hour {bookingTypeMap[booking.type]}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '300',
            }}
          >
            {moment(booking.startDate).format('LLL')}
          </Text>
        </View>

        <View
          style={{
            paddingTop: 28,
            paddingBottom: 28,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: 'bold',
              paddingBottom: 10,
            }}
          >
            {formatCentsToDollars(totalDueInCents)}
          </Text>
          <View
            style={{
              width: screenWidth * 0.65,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <QRCode
              size={screenWidth * 0.65}
              backgroundColor="transparent"
              value={paymentLink}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              paddingBottom: 5,
              fontWeight: '300',
            }}
          >
            {booking.customer?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '300',
            }}
          >
            {booking.customer?.email}
          </Text>
        </View>
      </View>
    </View>
  );
}
