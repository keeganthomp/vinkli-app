import React, { useRef } from 'react';
import { Text, Pressable, FlatList, View } from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';

export type PickerOption<T> = {
  label: string;
  value: T;
};

type PickerRowProps<T> = {
  item: PickerOption<T>;
  onPress: (value: T) => void;
  isLast?: boolean;
};

export type PickerSheetProps<TValue> = SheetProps & {
  sheetId: string;
  options: PickerOption<TValue>[];
  onValueChange?: (value: TValue) => void;
};

const PickerRow = <T,>({ item, onPress, isLast }: PickerRowProps<T>) => {
  const handlePress = () => {
    onPress(item.value);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: '#eee',
        height: 50,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '300', color: '#333' }}>
        {item.label}
      </Text>
    </Pressable>
  );
};

const PickerSheet = ({ sheetId, options, onValueChange }: PickerSheetProps<any>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      isModal={false}
      snapPoints={[100]}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={false}
      useBottomSafeAreaPadding
      defaultOverlayOpacity={0.3}
    >
      <FlatList
        data={options}
        renderItem={({ item, index }) => (
          <PickerRow
            item={item}
            onPress={(value) => {
              onValueChange?.(value);
              actionSheetRef.current?.hide();
            }}
            isLast={index === options.length - 1}
          />
        )}
        keyExtractor={(item) => item.value}
        contentContainerStyle={{
          paddingHorizontal: 12,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#eee',
            }}
          />
        )}
      />
    </ActionSheet>
  );
};

export default PickerSheet;
