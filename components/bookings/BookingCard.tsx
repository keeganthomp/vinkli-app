import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Booking, BookingStatus } from '@graphql/types';
import moment from 'moment';
import theme from '@theme';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { bookingTypeMap } from '@const/maps';
import Tag from '@components/Tag';
import { bookingStatusColor } from '@const/colors';
import { bookingStatusMap } from '@const/maps';
import { useQuery } from '@apollo/client';
import { FETCH_CURRENT_USER } from '@graphql/queries/user';
import { GetUserQuery } from '@graphql/types';

type Props = {
  booking: Booking;
  href: string;
};

const statusTagsToShow = [BookingStatus.Completed, BookingStatus.Pending];

const SPACING = 6;

export default function BookingCard({ booking, href }: Props) {
  const customer = booking.customer;
  const shouldShowStatusTag = statusTagsToShow.includes(booking.status);
  const { data: userData, loading, error } = useQuery<GetUserQuery>(FETCH_CURRENT_USER);

  const isArtist = userData?.user?.userType === 'ARTIST';

  const name = isArtist ? customer?.name : booking.artist?.name;

  return (
    <Link
      asChild
      href={{
        pathname: href as any,
      }}
    >
      <Pressable
        style={{
          height: 125,
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
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: SPACING + 1,
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                fontWeight: '500',
                fontSize: 20,
                color: '#333',
              }}
            >
              {bookingTypeMap[booking.type]}
            </Text>
            {shouldShowStatusTag && (
              <Tag
                style={{
                  backgroundColor: bookingStatusColor[booking.status],
                  borderWidth: 0,
                }}
                textStyle={{
                  color: '#fff',
                }}
                text={bookingStatusMap[booking.status]}
              />
            )}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: SPACING,
            }}
          >
            <Feather name="calendar" size={15} color="#333" />
            <Text
              style={{
                marginLeft: 4,
                color: '#333',
                fontWeight: '300',
              }}
            >
              {booking.startDate
                ? moment(booking.startDate).calendar()
                : 'No Date Set'}
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
                size={16}
                color="#333"
              />
              <Text
                style={{
                  marginLeft: 6,
                  color: '#333',
                  fontWeight: '300',
                }}
              >
                {name}
              </Text>
            </View>
          )}
        </View>
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
