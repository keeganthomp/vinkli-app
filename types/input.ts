import { ViewStyle } from 'react-native';
import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export type ControlledInput<TFieldValues extends FieldValues> = {
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
};
