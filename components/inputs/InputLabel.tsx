import { Text, TextStyle, Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

const Label = ({ label, style = {} }: { label?: string; style?: TextStyle }) => {
  if (!label) return null;
  return (
    <Text
      style={{
        paddingBottom: isWeb ? 2 : 4,
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
