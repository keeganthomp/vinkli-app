import { View, Text, Dimensions } from 'react-native';
import { Booking, BookingType } from '@graphql/types';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import { formatCentsToDollars } from '@utils/money';
import { useMemo } from 'react';
import Button from '@components/Button';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('screen').width;

type Props = {
  booking: Booking;
  paymentLink: string;
};

export default function ArtistCollectPayment({ booking, paymentLink }: Props) {
  const qrCodeWidth = screenWidth * 0.65;

  const sendPaymentToCustomer = async () => {
    Toast.show({
      type: 'success',
      text1: 'Payment info sent',
      text2: 'Sent payment options to customer',
    });
  };

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
      <View
        style={{
          width: qrCodeWidth,
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
        {/* Total and QR code */}
        <View
          style={{
            paddingTop: 28,
            paddingBottom: 28,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: 'bold',
              paddingBottom: 10,
              textAlign: 'center',
            }}
          >
            {formatCentsToDollars(booking?.totalDue)}
          </Text>
          <View
            style={{
              width: qrCodeWidth,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <QRCode
              size={qrCodeWidth}
              backgroundColor="transparent"
              value={paymentLink}
            />
          </View>
        </View>
        {/* Customer info */}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              paddingBottom: 5,
              fontWeight: '300',
            }}
          >
            {booking.customer?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '300',
            }}
          >
            {booking.customer?.email}
          </Text>
          <Button
            style={{
              marginTop: 12,
              height: 36,
            }}
            label="Send to customer"
            onPress={sendPaymentToCustomer}
          />
        </View>
      </View>
    </View>
  );
}
