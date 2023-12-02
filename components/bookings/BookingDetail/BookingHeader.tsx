import { Text, View } from 'react-native';
import { Booking, BookingType } from '@graphql/types';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { useMemo } from 'react';
import { Octicons } from '@expo/vector-icons';

type Props = {
  booking: Booking;
};

const bookingTypeMap: Record<BookingType, string> = {
  [BookingType.TattooSession]: 'Tattoo',
  [BookingType.Consultation]: 'Consultation',
};

export default function BookingHeader({ booking }: Props) {
  const customer = booking.customer;

  const appointmentDate = useMemo(() => {
    if (!booking?.date) return null;
    const bookingDateObj = new Date(booking.date);
    return moment(bookingDateObj).calendar();
  }, [booking?.date]);

  if (!customer) return null;
  return (
    <View
      style={{
        borderRadius: 6,
        paddingTop: 8,
        paddingHorizontal: 12,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
        }}
      >
        {bookingTypeMap[booking.type]}
      </Text>
      {appointmentDate && (
        <View
          style={{
            paddingTop: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Feather name="calendar" size={18} color="black" />
          <Text
            style={{
              fontSize: 18,
              marginLeft: 5,
            }}
          >
            {appointmentDate}
          </Text>
        </View>
      )}
      <View
        style={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Octicons
          style={{
            paddingLeft: 1,
          }}
          name="person"
          size={18}
          color="black"
        />
        <Text
          style={{
            fontSize: 18,
            marginLeft: 7,
          }}
        >
          {customer.firstName} {customer.lastName}
        </Text>
      </View>
    </View>
  );
}
