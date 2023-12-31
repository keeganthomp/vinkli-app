import { Text, View } from 'react-native';
import { Booking } from '@graphql/types';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { useMemo } from 'react';
import { Octicons } from '@expo/vector-icons';
import { bookingTypeMap } from '@const/maps';
import { AntDesign } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import { FETCH_CURRENT_USER } from '@graphql/queries/user';
import { GetUserQuery } from '@graphql/types';

type Props = {
  booking: Booking;
};

export default function BookingHeader({ booking }: Props) {
  // fetching this here to cache it as early as possible
  const { data: userData } = useQuery<GetUserQuery>(FETCH_CURRENT_USER);
  const customer = booking.customer;

  const appointmentDate = useMemo(() => {
    if (!booking?.startDate) return null;
    const bookingDateObj = new Date(booking.startDate);
    return moment(bookingDateObj).format('LL');
  }, [booking?.startDate]);

  const appointmentTime = useMemo(() => {
    if (!booking?.startDate) return null;
    const bookingDateObj = new Date(booking.startDate);
    return moment(bookingDateObj).format('LT');
  }, [booking?.startDate]);

  if (!customer || !userData) return null;

  const isArtist = userData.user?.userType === 'ARTIST';

  const nameToShow = isArtist ? customer.name : booking?.artist?.name;

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
      {appointmentTime && (
        <View
          style={{
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <AntDesign name="clockcircleo" size={18} color="black" />
          <Text
            style={{
              fontSize: 17,
              marginLeft: 5,
            }}
          >
            {appointmentTime}
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
          {nameToShow}
        </Text>
      </View>
    </View>
  );
}
