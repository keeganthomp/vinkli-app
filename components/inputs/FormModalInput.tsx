import { View, Text, Pressable, ViewStyle } from 'react-native';
import Label from '@components/inputs/InputLabel';

type Props = {
  openPicker: () => void;
  value?: string | null;
  label?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
};

const PickerField = ({
  value,
  placeholder,
}: {
  value?: string | null;
  placeholder: string;
}) => {
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: '300',
        color: value ? '#333' : '#999',
      }}
    >
      {value || placeholder}
    </Text>
  );
};

export default function ModalInput({
  label,
  openPicker,
  placeholder = 'Select an option',
  value,
  containerStyle = {},
}: Props) {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <Label label={label} />
      <Pressable onPress={openPicker}>
        <PickerField value={value} placeholder={placeholder} />
      </Pressable>
    </View>
  );
}
