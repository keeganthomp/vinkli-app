import React from 'react';
import { TextInput, TextInputProps, ViewStyle, View } from 'react-native';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import Label from './InputLabel';
import {
  defaultTextInputStyle,
  textInputPlaceholderTextColor,
} from '@const/input';
import InputAccessory from './InputAccessory';

const genRandomId = () => Math.random().toString(36).substring(7);

type FormNumberInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: object;
  label?: string;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  containerStyle?: ViewStyle;
} & TextInputProps;

function FormNumberInput<TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = '',
  rules,
  label,
  defaultValue,
  containerStyle = {},
  ...textInputProps
}: FormNumberInputProps<TFieldValues>) {
  const inputAccessoryViewID = genRandomId();
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

  const handleChange = (text: string) => {
    // Ensure only numeric values are allowed
    const numericValue = text.replace(/[^0-9]/g, '');

    // Convert to number and check against maxAmount
    const numeric = parseInt(numericValue, 10);
    if (!isNaN(numeric) && numeric <= maxAmount) {
      onChange(numericValue);
    } else if (isNaN(numeric)) {
      onChange('');
    }
  };

  return (
    <View style={{ ...containerStyle }}>
      <Label label={label} />
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
        value={value}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder={placeholder || 'Enter number'}
        style={defaultTextInputStyle}
        placeholderTextColor={textInputPlaceholderTextColor}
        returnKeyType="done"
        {...textInputProps}
      />
      <InputAccessory id={inputAccessoryViewID} />
    </View>
  );
}

export default FormNumberInput;
