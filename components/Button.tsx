import { Pressable, Text, ViewStyle } from 'react-native';

export type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

const Button = ({ onPress, label, disabled = false, style = {} }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        height: 46,
        backgroundColor: disabled ? '#999999' : '#000',
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
