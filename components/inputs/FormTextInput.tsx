import React from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  Control,
  useController,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import Label from './InputLabel';
import {
  defaultTextInputStyle,
  textInputPlaceholderTextColor,
} from '@const/input';
import InputAccessory from './InputAccessory';

const genRandomId = () => Math.random().toString(36).substring(7);

type FormTextInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: Pick<
    RegisterOptions<TFieldValues>,
    'maxLength' | 'minLength' | 'validate' | 'required' | 'pattern'
  >;
  label?: string;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
} & TextInputProps;

function FormTextInput<TFieldValues extends FieldValues>({
  name,
  control,
  placeholder = '',
  rules,
  label,
  defaultValue,
  containerStyle = {},
  labelStyle = {},
  ...textInputProps
}: FormTextInputProps<TFieldValues>) {
  const inputAccessoryViewID = genRandomId();
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
      <Label label={label} style={labelStyle} />
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
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
      {/* Bar above keyboard */}
      <InputAccessory id={inputAccessoryViewID} />
    </View>
  );
}

export default FormTextInput;
