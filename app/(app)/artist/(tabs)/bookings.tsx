import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { ArtistBookingsQuery, Booking } from '@graphql/types';
import { GET_ARTIST_BOOKINGS } from '@graphql/queries/booking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { BookingStatus } from '@graphql/types';
import BookingCard from '@components/bookings/BookingCard';
import BookingListHeader from '@components/bookings/BookingsListHeader';
import EmptyList from '@components/EmptyList';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';

const defaultFilters = [BookingStatus.Confirmed];

export default function ArtistBookings() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [activeFilter, setActiveFilter] = useState<BookingStatus>();
  const {
    data: bookingData,
    loading: loadingBookings,
    error: bookingError,
    refetch,
  } = useQuery<ArtistBookingsQuery>(GET_ARTIST_BOOKINGS, {
    variables: {
      statuses: defaultFilters,
    },
  });

  const bookings = bookingData?.artistBookings || [];

  const handleClearFilter = async () => {
    closeFilterModal();
    setActiveFilter(undefined);
    setIsRefetching(true);
    // handle refetch based on filter
    await refetch({
      statuses: defaultFilters,
    });
    setIsRefetching(false);
  };

  const handleStatusFilterSelect = async (status: BookingStatus) => {
    closeFilterModal();
    if (activeFilter === status) {
      setActiveFilter(undefined);
    } else {
      setActiveFilter(status);
    }
    // handle refetch based on filter
    setIsRefetching(true);
    await refetch({
      statuses: status ? [status] : defaultFilters,
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

  const closeFilterModal = () => {
    // filterModalRef.current?.close();
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <>
        <BookingListHeader
          activeFilter={activeFilter}
          openFilterModal={openFilterModal}
        />
        {loadingBookings || isRefetching ? (
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
                href={`/artist/booking/${booking.id}`}
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
