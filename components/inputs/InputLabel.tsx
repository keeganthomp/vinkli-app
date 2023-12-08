import { Text, TextStyle } from 'react-native';

const Label = ({ label, style = {} }: { label?: string; style?: TextStyle }) => {
  if (!label) return null;
  return (
    <Text
      style={{
        paddingBottom: 5,
        fontWeight: '500',
        fontSize: 15,
        ...style,
      }}
    >
      {label}
    </Text>
  );
};

export default Label;
