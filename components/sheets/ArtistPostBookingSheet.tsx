import PostBookingForm from '@components/artist/PostBookingForm';
import React, { useRef } from 'react';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';

const ArtistPostBookingSheet = ({ payload }: SheetProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const booking = payload?.booking;

  const closeModal = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      id={sheetIds.artistPostBookingSheet}
      ref={actionSheetRef}
      // snapPoints={[200]}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      useBottomSafeAreaPadding
      defaultOverlayOpacity={0.3}
    >
      <PostBookingForm bookingId={booking?.id} closeModal={closeModal} />
    </ActionSheet>
  );
};

export default ArtistPostBookingSheet;
