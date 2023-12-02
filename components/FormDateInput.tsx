import React, { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import {
  defaultTextInputStyle,
  textInputPlaceholderTextColor,
} from '@const/input';
import Label from './InputLabel';

type FormDatePickerProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  label?: string;
};

function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = 'Select a date',
  label,
  ...dateTimePickerProps
}: FormDatePickerProps<TFieldValues>) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  const dateValue = useMemo(() => {
    if (!value) return placeholder;
    return new Date(value).toLocaleDateString();
  }, [value]);

  const textStyle = {
    ...(defaultTextInputStyle as any),
    color: value ? 'black' : textInputPlaceholderTextColor,
  };

  return (
    <View>
      <Label label={label} />
      <Pressable onPress={showDatePicker}>
        <Text style={textStyle}>{dateValue}</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={value || new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        {...dateTimePickerProps}
      />
    </View>
  );
}

export default FormDatePicker;
