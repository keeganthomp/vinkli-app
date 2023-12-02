import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme';
import { router } from 'expo-router';

const SIDE_WIDTH = 24;

type Props = {
  title: string;
  canGoBack?: boolean;
  onBackPress?: () => void;
};

const CustomerHeader = ({
  title,
  canGoBack = false,
  onBackPress = () => {},
}: Props) => {
  const goToProfile = () => {
    router.push('/customer/profile');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        backgroundColor: theme.appBackground,
      }}
    >
      {canGoBack ? (
        <Pressable onPress={onBackPress}>
          <Ionicons
            name="chevron-back"
            size={SIDE_WIDTH}
            color="black"
            style={{ left: -4 }} // align with edge of container
          />
        </Pressable>
      ) : (
        <View style={{ width: 24 }} />
      )}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
      <Pressable onPress={goToProfile}>
        <Ionicons
          name="person-circle-outline"
          size={SIDE_WIDTH}
          color="black"
        />
      </Pressable>
    </View>
  );
};

export default CustomerHeader;
