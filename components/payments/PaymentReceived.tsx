import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { Booking, BookingType } from '@graphql/types';
import { formatCentsToDollars } from '@utils/money';
import Button from '@components/Button';
import { router } from 'expo-router';
import moment from 'moment';
import { useMemo } from 'react';

type Props = {
  booking: Booking;
};

const PaymentReceived = ({ booking }: Props) => {
  const title = useMemo(() => {
    if (booking?.type === BookingType.Consultation) {
      return 'Consultation';
    }
    // it is a tattoo session
    return booking.duration ? `${booking.duration} hour session` : 'Session';
  }, [booking?.type, booking?.duration]);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Summary */}
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '300',
            paddingBottom: 5,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '300',
            textAlign: 'center',
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
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: 'bold',
            paddingBottom: 3,
            textAlign: 'center',
          }}
        >
          {formatCentsToDollars(booking.totalDue)}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '300',
          }}
        >
          Payment received
        </Text>
        <Ionicons
          style={{
            marginVertical: 20,
          }}
          name="checkmark-circle-sharp"
          size={100}
          color="#333"
        />
      </View>
        <Button
          label="Back to bookings"
          onPress={() => {
            router.push('/artist/bookings');
          }}
        />
    </View>
  );
};

export default PaymentReceived;
