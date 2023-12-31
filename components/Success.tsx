import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  title: string;
  subTitle: string;
};

const Success = ({ title, subTitle }: Props) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: '400',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          paddingTop: 5,
          fontSize: 18,
          fontWeight: '300',
        }}
      >
        {subTitle}
      </Text>
      <AntDesign
        style={{
          paddingTop: 10,
        }}
        name="checkcircle"
        size={55}
        color="black"
      />
    </View>
  );
};

export default Success;
