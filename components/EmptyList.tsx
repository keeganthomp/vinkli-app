import { View, Text } from 'react-native';

type Props = {
  message?: string;
};

const EmptyList = ({ message = 'No items to show' }: Props) => (
  <View
    style={{
      paddingTop: 20,
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        fontWeight: '300',
        color: '#333',
      }}
    >
      {message}
    </Text>
  </View>
);

export default EmptyList;
