import React from 'react';
import {
  defaultTextInputStyle,
  textInputPlaceholderTextColor,
} from '@const/input';
import { TextInput, TextInputProps, ViewStyle, View } from 'react-native';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import Label from './InputLabel';

type FormDollarInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: object;
  label?: string;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  containerStyle?: ViewStyle;
} & TextInputProps;

function FormDollarInputProps<TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = '',
  rules,
  label,
  defaultValue,
  containerStyle = {},
  ...textInputProps
}: FormDollarInputProps<TFieldValues>) {
  const maxAmount = 100000;

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  // Function to format the input as a currency with commas
  const formatCurrency = (text: string) => {
    // Remove all non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');

    // Format with commas
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return numericValue ? `$${formattedValue}` : '';
  };

  const handleChange = (text: string) => {
    // If the input is empty or just the dollar sign, clear the value
    if (text === '' || text === '$') {
      onChange('');
      return;
    }
  
    // Remove all non-numeric characters and convert to number
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
  
    // Check if the numeric value is within the max amount
    if (!isNaN(numericValue) && numericValue <= maxAmount) {
      onChange(numericValue.toString()); // Pass the numeric value as a string to onChange
    } else if (isNaN(numericValue)) {
      // If the parsed value is NaN, which means the input is not a valid number, reset to default
      onChange('');
    }
  };

  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <Label label={label} />
      <TextInput
        value={formatCurrency(value)}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder="$0"
        style={defaultTextInputStyle}
        placeholderTextColor={textInputPlaceholderTextColor}
        returnKeyType="done"
        {...textInputProps}
      />
    </View>
  );
}

export default FormDollarInputProps;
