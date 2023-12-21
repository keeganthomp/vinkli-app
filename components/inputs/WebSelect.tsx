import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@web/components/ui/select';
import {
  useController,
  FieldValues,
  Control,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { View, ViewStyle, TextStyle } from 'react-native';
import Label from './InputLabel';
import { DEFAULT_INPUT_HEIGHT, textInputPlaceholderTextColor } from '@const/input';

type SelectOption = {
  label: string;
  value: string;
};

type WebSelectProps<TFieldValues extends FieldValues> = {
  options: SelectOption[];
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: Pick<RegisterOptions<TFieldValues>, 'required'>;
  label?: string;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  buttonLabel?: string;
};

function WebSelect<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  label,
  buttonLabel = 'Select an option',
  options,
  containerStyle = {},
  labelStyle = {},
}: WebSelectProps<TFieldValues>) {
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
    <View style={containerStyle}>
      {label && <Label label={label} style={labelStyle} />}
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger
          style={{
            color: !value ? textInputPlaceholderTextColor : '#333',
            height: DEFAULT_INPUT_HEIGHT,
            fontSize: 16,
            fontWeight: 300,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          <SelectValue placeholder={buttonLabel} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              style={{
                fontWeight: 300,
              }}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </View>
  );
}

export default WebSelect;
