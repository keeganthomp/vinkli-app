import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import { View, Text } from 'react-native';
import { useRef } from 'react';
import sheetIds from '@const/sheets';

const SetupPaymentsSheet = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <ActionSheet
      id={sheetIds.setupPaymentsSheet}
      ref={actionSheetRef}
      isModal={false}
      statusBarTranslucent
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      containerStyle={{
        paddingBottom: 20,
      }}
    >
      <View>
        <Text>Set up payments first</Text>
      </View>
    </ActionSheet>
  );
};

export default SetupPaymentsSheet;
