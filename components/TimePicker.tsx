import { View, Pressable, Text } from 'react-native';
import { generateTimeOptions, TimeOption } from '@utils/time';
import { useCallback } from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const timeOptions = generateTimeOptions({
  minHour: 9,
  maxHour: 21,
});

export type TimeOptionProps = {
  time: TimeOption;
  onPress: () => void;
  selected: boolean;
};

type Props = {
  closeModal: () => void;
  onTimeSelect: (time: TimeOption) => void;
  selectedTime?: TimeOption | null;
};

type ConfirmButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  text?: string;
};

const ConfrimTimeButton = ({ onPress, disabled, text = 'Confirm' }: ConfirmButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 46,
        backgroundColor: disabled ? '#999999' : '#333',
        borderRadius: 6,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontWeight: '500',
          fontSize: 15,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const TimeButton = ({ time, onPress, selected }: TimeOptionProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 46,
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: selected ? 0 : 1,
        backgroundColor: selected ? '#33333390' : 'transparent',
        borderColor: '#33333390',
      }}
    >
      <Text
        style={{
          color: selected ? '#fff' : '#000',
          fontWeight: '500',
        }}
      >
        {time.displayTime}
      </Text>
    </Pressable>
  );
};

const TimePicker = ({ closeModal, selectedTime, onTimeSelect }: Props) => {
  const insets = useSafeAreaInsets();

  const renderTimeOption = useCallback(
    ({ item }: { item: TimeOption }) => (
      <TimeButton
        time={item}
        onPress={() => onTimeSelect(item)}
        selected={selectedTime?.value === item.value}
      />
    ),
    [selectedTime],
  );

  const keyExtractor = useCallback((item: TimeOption) => {
    return item.displayTime;
  }, []);

  return (
    <>
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        data={timeOptions}
        renderItem={renderTimeOption}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        style={{}}
        contentContainerStyle={{
          paddingTop: 14,
          paddingHorizontal: 14,
          paddingBottom: insets.bottom + 80,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 14,
            }}
          />
        )}
      />
      <View
        style={{
          position: 'absolute',
          paddingBottom: insets.bottom,
          bottom: 0,
          width: '100%',
          paddingHorizontal: 14,
          backgroundColor: '#fff',
          paddingTop: 12,
        }}
      >
        <ConfrimTimeButton text='Confirm Time' disabled={!selectedTime} onPress={closeModal} />
      </View>
    </>
  );
};

export default TimePicker;
