import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
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
} & TextInputProps;

function FormTextInput<TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = '',
  rules,
  label,
  defaultValue,
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

  return (
    <View>
      <Label label={label} />
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        style={defaultTextInputStyle}
        {...textInputProps}
        placeholderTextColor={textInputPlaceholderTextColor}
      />
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </View>
  );
}

export default FormTextInput;
