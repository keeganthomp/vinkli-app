import React from 'react';
import { TextInput, TextInputProps, View, Text, ViewStyle } from 'react-native';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import Label from './InputLabel';
import {
  defaultTextInputStyle,
  textInputPlaceholderTextColor,
} from '@const/input';

type FormTextInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: object;
  label?: string;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  containerStyle?: ViewStyle;
} & TextInputProps;

function FormTextInput<TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = '',
  rules,
  label,
  defaultValue,
  containerStyle = {},
  ...textInputProps
}: FormTextInputProps<TFieldValues>) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const valueAsString = typeof value === 'number' ? value.toString() : value;

  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <Label label={label} />
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        value={valueAsString}
        placeholder={placeholder}
        style={defaultTextInputStyle}
        {...textInputProps}
        placeholderTextColor={textInputPlaceholderTextColor}
        returnKeyType={textInputProps.multiline ? 'default' : 'done'}
      />
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </View>
  );
}

export default FormTextInput;
