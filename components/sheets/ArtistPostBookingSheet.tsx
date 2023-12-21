import PostBookingForm from "@components/artist/PostBookingForm";
import React, { useRef } from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';

const ArtistPostBookingSheet = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <ActionSheet
      id={sheetIds.artistPostBookingSheet}
      ref={actionSheetRef}
      isModal={false}
      snapPoints={[200]}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      useBottomSafeAreaPadding
      defaultOverlayOpacity={0.3}
    >
      <PostBookingForm />
    </ActionSheet>
  );
};

export default ArtistPostBookingSheet;
