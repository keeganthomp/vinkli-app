import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Booking } from '@graphql/types';
import moment from 'moment';
import theme from '@theme';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { bookingTypeMap } from '@const/maps';
import Tag from '@components/Tag';

type Props = {
  booking: Booking;
  href: string;
};

export default function BookingCard({ booking, href }: Props) {
  const customer = booking.customer;
  const status = booking.paymentReceived ? 'Paid' : booking.status;
  return (
    <Link
      asChild
      href={{
        pathname: href as any,
      }}
    >
      <Pressable
        style={{
          height: 135,
          backgroundColor: theme.accentGray,
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexGrow: 1,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            {bookingTypeMap[booking.type]}
          </Text>
          <Tag text={status} />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Feather name="calendar" size={18} color="black" />
          <Text
            style={{
              marginLeft: 4,
            }}
          >
            {booking.startDate ? moment(booking.startDate).calendar() : 'No Date Set'}
          </Text>
        </View>
        {customer && (
          <View
            style={{
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
              size={19}
              color="black"
            />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {customer.name}
            </Text>
          </View>
        )}
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '300',
              color: theme.textGray,
            }}
          >
            booked {moment(booking.createdAt).fromNow()}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
