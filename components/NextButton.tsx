import Button, { ButtonProps, getTextColor } from '@components/Button';
import { Entypo } from '@expo/vector-icons';

const NextButton = ({
  onPress,
  label,
  disabled = false,
  variant = 'primary',
  style = {},
}: ButtonProps) => {
  const color = getTextColor(variant, disabled);
  return (
    <Button
      label={label}
      onPress={onPress}
      disabled={disabled}
      variant={variant}
      style={{
        borderRadius: 4,
        height: 38,
        ...style,
      }}
      icon={
        <Entypo
          name="chevron-thin-right"
          size={16}
          color={color}
        />
      }
    />
  );
};

export default NextButton;
