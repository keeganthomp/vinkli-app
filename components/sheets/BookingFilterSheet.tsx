import React, { useRef, useState } from 'react';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import BookingFilters from '@components/bookings/BookingFilters';
import { BookingStatus } from '@graphql/types';

const BookingFiltersSheet = (props: SheetProps) => {
  const { activeFilter, clearFilter, selectFilter } = props.payload || {};
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedFilter, setSelectedFilter] = useState<BookingStatus | undefined>(
    activeFilter || undefined,
  );

  const handleFilterSelect = (filter: BookingStatus) => {
    setSelectedFilter(filter);
    selectFilter(filter);
    actionSheetRef.current?.hide();
  };

  const handleClearFilter = () => {
    setSelectedFilter(undefined);
    clearFilter();
    actionSheetRef.current?.hide();
  }

  return (
    <ActionSheet
      id={sheetIds.bookingFilters}
      ref={actionSheetRef}
      isModal={false}
      statusBarTranslucent
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      containerStyle={{
        paddingBottom: 20,
      }}
    >
      <BookingFilters
        onSelect={handleFilterSelect}
        clearFilter={handleClearFilter}
        activeFilter={selectedFilter}
      />
    </ActionSheet>
  );
};

export default BookingFiltersSheet;
