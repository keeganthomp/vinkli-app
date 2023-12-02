import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Control, useController, FieldValues, Path } from 'react-hook-form';
import { TextStyle, View } from 'react-native';
import Label from './InputLabel';
import {
  defaultTextInputStyle,
  textInputPlaceholderTextColor,
} from '@const/input';

export type PickerSelectItem = {
  label: string;
  value: any;
};

type FormSelectInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  items: PickerSelectItem[];
  label?: string;
  defaultValue?: TFieldValues[Path<TFieldValues>];
};

function FormSelectInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  items,
  defaultValue,
  ...pickerSelectProps
}: FormSelectInputProps<TFieldValues>) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <View>
      <Label label={label} />
      <RNPickerSelect
        onValueChange={onChange}
        items={items}
        value={value}
        placeholder={{}}
        style={{
          placeholder: {
            color: textInputPlaceholderTextColor,
          },
          inputIOS: defaultTextInputStyle as TextStyle,
        }}
        {...pickerSelectProps}
      />
    </View>
  );
}

export default FormSelectInput;
