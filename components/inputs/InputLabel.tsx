import { Text } from 'react-native';

const Label = ({ label }: { label?: string }) => {
  if (!label) return null;
  return (
    <Text
      style={{
        paddingBottom: 5,
        fontWeight: '500',
        fontSize: 15
      }}
    >
      {label}
    </Text>
  );
};

export default Label;
