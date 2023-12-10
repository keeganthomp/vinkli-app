import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  Animated,
} from 'react-native';
import CustomerHeader from '@components/customer/CustomerHeader';
import { useQuery } from '@apollo/client';
import { Booking, CustomerBookingsQuery } from '@graphql/types';
import { GET_CUSTOMER_BOOKINGS } from '@graphql/queries/booking';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';

import BookingCard from '@components/bookings/BookingCard';
import Button from '@components/Button';
import theme from '@theme';

const NoBookings = () => (
  <View>
    <Text>No Bookings</Text>
  </View>
);

export default function CustomerBookings() {
  const insets = useSafeAreaInsets();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollY = useRef(new Animated.Value(1)).current;
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: bookingData,
    loading: loadingBookings,
    error: fetchBookingsError,
    refetch,
  } = useQuery<CustomerBookingsQuery>(GET_CUSTOMER_BOOKINGS);

  const bookings = bookingData?.customerBookings || [];

  const goToCreateBooking = () => {
    router.push('/customer/booking/create');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Configure the animation
  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [55, -30], // Adjust values for off-screen and on-screen positions
  });

  const showButton = () => {
    Animated.timing(scrollY, {
      toValue: 1, // the final value to animate to
      duration: 75, // duration of the animation
      useNativeDriver: true, // use native driver for better performance
    }).start();
  };

  const hideButton = () => {
    Animated.timing(scrollY, {
      toValue: 0, // the final value to animate to
      duration: 75, // duration of the animation
      useNativeDriver: true, // use native driver for better performance
    }).start();
  };

  useEffect(() => {
    if (!isScrolling) {
      showButton();
    } else {
      hideButton();
    }
  }, [isScrolling]);

  if (fetchBookingsError) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
        }}
      >
        <CustomerHeader title="Bookings" />
        <Text
          style={{
            color: theme.error,
          }}
        >
          Error fetching bookings
        </Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          height: '100%',
        }}
      >
        <CustomerHeader title="Bookings" />
        {loadingBookings ? (
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator
              style={{
                marginTop: 20,
              }}
              size="large"
              color="black"
            />
          </View>
        ) : (
          <>
            <FlatList
              onScrollBeginDrag={() => setIsScrolling(true)}
              onMomentumScrollEnd={() => setIsScrolling(false)}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={NoBookings}
              showsVerticalScrollIndicator={false}
              data={bookings}
              renderItem={({ item: booking }) => (
                <BookingCard
                  booking={booking}
                  href={`/customer/booking/${booking.id}`}
                />
              )}
              keyExtractor={(item: Booking) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
              contentContainerStyle={{
                paddingBottom: insets.bottom + 60,
              }}
            />
          </>
        )}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            transform: [{ translateY }],
          }}
        >
          <Button onPress={goToCreateBooking} label="Create Booking" />
        </Animated.View>
      </View>
    </>
  );
}
