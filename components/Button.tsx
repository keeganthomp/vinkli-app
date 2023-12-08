import { Pressable, Text, ViewStyle, View } from 'react-native';

export type ButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
};

const Button = ({
  onPress,
  label,
  disabled = false,
  style = {},
  icon,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        width: '100%',
        height: 40,
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
          fontWeight: '500',
        }}
      >
        {label}
      </Text>
      {icon && (
        <View
          style={{
            position: 'absolute',
            right: 10,
          }}
        >
          {icon}
        </View>
      )}
    </Pressable>
  );
};

export default Button;
