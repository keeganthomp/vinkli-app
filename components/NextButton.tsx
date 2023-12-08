import Button, { ButtonProps } from '@components/Button';
import { Entypo } from '@expo/vector-icons';

const NextButton = ({
  onPress,
  label,
  disabled = false,
  style = {},
}: ButtonProps) => {
  return (
    <Button
      label={label}
      onPress={onPress}
      disabled={disabled}
      style={{
        marginTop: 20,
        borderRadius: 4,
        height: 38,
      }}
      icon={
        <Entypo
          name="chevron-thin-right"
          size={16}
          color="#fff"
        />
      }
    />
  );
};

export default NextButton;
