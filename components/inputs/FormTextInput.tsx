import React from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  ViewStyle,
  TextStyle,
  Platform,
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
  DEFAULT_INPUT_HEIGHT,
  DEFAULT_INPUT_LINE_HEIGHT,
} from '@const/input';
import InputAccessory from './InputAccessory';
import theme from '@theme';
import { ControlledInput } from 'types/input';

const isWeb = Platform.OS === 'web';

const genRandomId = () => Math.random().toString(36).substring(7);

function calculateHeightBasedOnText(text: string) {
  const numberOfLines = (text.match(/\n/g) || []).length + 1; // +1 for the current line
  const lineHeight = DEFAULT_INPUT_LINE_HEIGHT; // This should be the line height of your TextInput
  const padding = 10; // This should be the total vertical padding of your TextInput
  const incomingHeight = numberOfLines * lineHeight + padding;
  const newHeight =
    incomingHeight > DEFAULT_INPUT_HEIGHT
      ? incomingHeight
      : DEFAULT_INPUT_HEIGHT;
  return newHeight;
}

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
  hasBorder?: boolean;
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
  hasBorder = false,
  ...textInputProps
}: FormTextInputProps<TFieldValues>) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [height, setHeight] = React.useState(DEFAULT_INPUT_HEIGHT);
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

  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <Label label={label} style={labelStyle} />
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
        onBlur={handleBlur}
        onChangeText={(text) => {
          onChange(text);
          // Calculate the new height based on the text
          const newHeight = calculateHeightBasedOnText(text);
          setHeight(newHeight);
        }}
        value={valueAsString}
        placeholder={placeholder}
        {...textInputProps}
        style={{
          ...(defaultTextInputStyle as object),
          borderWidth: hasBorder ? 1 : 0,
          height,
          paddingTop: isWeb && textInputProps.multiline ? 5 : 0,
          borderColor: error ? theme.red : isFocused ? '#333' : theme.lightGray,
        }}
        placeholderTextColor={textInputPlaceholderTextColor}
        enterKeyHint={textInputProps.multiline ? 'enter' : 'done'}
        onFocus={() => setIsFocused(true)}
        onContentSizeChange={(event) => {
          const incomingHeight = event.nativeEvent.contentSize.height;
          console.log('incomingHeight', incomingHeight);
          const newHeight =
            incomingHeight > DEFAULT_INPUT_HEIGHT
              ? incomingHeight
              : DEFAULT_INPUT_HEIGHT;
          setHeight(newHeight);
        }}
      />
      {error && <Text style={{ color: theme.red }}>{error.message}</Text>}
      {/* Bar above keyboard */}
      <InputAccessory id={inputAccessoryViewID} />
    </View>
  );
}

export default FormTextInput;
