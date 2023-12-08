import { Text, View } from 'react-native';
import { Booking } from '@graphql/types';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { useMemo } from 'react';
import { Octicons } from '@expo/vector-icons';
import { bookingTypeMap } from '@const/maps';

type Props = {
  booking: Booking;
};

export default function BookingHeader({ booking }: Props) {
  const customer = booking.customer;

  const appointmentDate = useMemo(() => {
    if (!booking?.startDate) return null;
    const bookingDateObj = new Date(booking.startDate);
    return moment(bookingDateObj).format('LLLL');
  }, [booking?.startDate]);


  if (!customer) return null;
  return (
    <View
      style={{
        borderRadius: 6,
        paddingTop: 12,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
        }}
      >
        {bookingTypeMap[booking.type]}
      </Text>
      {appointmentDate && (
        <View
          style={{
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Feather name="calendar" size={18} color="black" />
          <Text
            style={{
              fontSize: 17,
              marginLeft: 5,
            }}
          >
            {appointmentDate}
          </Text>
        </View>
      )}
      <View
        style={{
          paddingTop: 12,
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
            fontSize: 17,
            marginLeft: 7,
          }}
        >
          {customer.name}
        </Text>
      </View>
    </View>
  );
}
