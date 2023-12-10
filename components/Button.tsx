import { Pressable, Text, ViewStyle, View } from 'react-native';

export type ButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'primary' | 'outlined';
};

const disabledColor = '#999999';

export const getBackgroundColor = (
  variant: ButtonProps['variant'],
  disabled?: boolean,
) => {
  if (disabled) {
    switch (variant) {
      case 'primary':
        return disabledColor;
      case 'outlined':
        return 'transparent';
    }
  }
  switch (variant) {
    case 'primary':
      return '#333';
    case 'outlined':
      return 'transparent';
  }
};

export const getTextColor = (variant: ButtonProps['variant'], disabled?: boolean) => {
  if (disabled) {
    switch (variant) {
      case 'primary':
        return '#fff';
      case 'outlined':
        return disabledColor;
    }
  }
  switch (variant) {
    case 'primary':
      return '#fff';
    case 'outlined':
      return '#333';
  }
};

export const getBorderColor = (
  variant: ButtonProps['variant'],
  disabled?: boolean,
) => {
  if (variant === 'primary') return 'transparent';
  if (disabled) return '#d3d3d3';
  return '#33333390';
};

const Button = ({
  onPress,
  label,
  disabled = false,
  style = {},
  icon,
  variant = 'primary',
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        width: '100%',
        height: 40,
        backgroundColor: getBackgroundColor(variant, disabled),
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: variant === 'outlined' ? 1 : 0,
        borderColor: getBorderColor(variant, disabled),
        ...style,
      }}
    >
      <Text
        style={{
          color: getTextColor(variant, disabled),
          fontWeight: '500',
        }}
      >
        {label}
      </Text>
      {icon && (
        <View
          style={{
            position: 'absolute',
            right: 14,
          }}
        >
          {icon}
        </View>
      )}
    </Pressable>
  );
};

export default Button;
