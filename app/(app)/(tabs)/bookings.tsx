import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { UserBookingsQuery, Booking } from '@graphql/types';
import { GET_USER_BOOKINGS } from '@graphql/queries/booking';
import { FETCH_CURRENT_USER } from '@graphql/queries/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { BookingStatus } from '@graphql/types';
import BookingCard from '@components/bookings/BookingCard';
import BookingListHeader from '@components/bookings/BookingsListHeader';
import EmptyList from '@components/EmptyList';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import { GetUserQuery } from '@graphql/types';

const defaultFilters = [BookingStatus.Confirmed];

export default function ArtistBookings() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [activeFilter, setActiveFilter] = useState<BookingStatus>();
  const { data: userData, loading: isFetchingUser } =
    useQuery<GetUserQuery>(FETCH_CURRENT_USER);
  const {
    data: bookingData,
    loading: loadingBookings,
    error: bookingError,
    refetch,
  } = useQuery<UserBookingsQuery>(GET_USER_BOOKINGS, {
    variables: {
      statuses: defaultFilters,
    },
  });

  const user = userData?.user;
  const isArtist = user?.userType === 'ARTIST';

  const bookings = bookingData?.userBookings || [];

  const handleClearFilter = async () => {
    setActiveFilter(undefined);
    setIsRefetching(true);
    // handle refetch based on filter
    await refetch({
      status: undefined,
    });
    setIsRefetching(false);
  };

  const handleStatusFilterSelect = async (status: BookingStatus) => {
    console.log('status', status)
    if (activeFilter === status) {
      setActiveFilter(undefined);
    } else {
      setActiveFilter(status);
    }
    // handle refetch based on filter
    setIsRefetching(true);
    await refetch({
      status: status,
    });
    setIsRefetching(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const openFilterModal = () => {
    if (isRefetching || refreshing || loadingBookings) return;
    SheetManager.show(sheetIds.bookingFilters, {
      payload: {
        activeFilter,
        clearFilter: handleClearFilter,
        selectFilter: handleStatusFilterSelect,
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <>
        {isArtist && (
          <BookingListHeader
            activeFilter={activeFilter}
            openFilterModal={openFilterModal}
          />
        )}
        {loadingBookings || isFetchingUser || isRefetching ? (
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
        ) : (
          <FlatList
            ListEmptyComponent={() => (
              <EmptyList
                message={
                  activeFilter
                    ? 'No bookings match this criteria'
                    : 'No bookings to show'
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={bookings}
            renderItem={({ item: booking }) => (
              <BookingCard
                booking={booking}
                href={`/(app)/booking/${booking.id}`}
              />
            )}
            keyExtractor={(item: Booking) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 44,
            }}
          />
        )}
      </>
    </View>
  );
}
