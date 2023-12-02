import theme from '@theme';
import { View, Text, Pressable } from 'react-native';
import { supabase } from '@lib/supabase';
import { useSession } from '@context/auth';
import apolloClient from '@lib/apolloClient';
import { router } from 'expo-router';

const ErrorCard = ({
  message = 'Please try again later',
}: {
  message: string;
}) => {
  const { setSession } = useSession();

  const logout = () => {
    supabase.auth.signOut();
    setSession(null);
    apolloClient.clearStore();
    router.replace('/sign-in');
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.appBackground,
      }}
    >
      <View
        style={{
          width: '90%',
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 10,
          elevation: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Something went wrong
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: theme.accentGray,
            width: 50,
            marginVertical: 8,
          }}
        />
        <Text>{message}</Text>
        <View
          style={{
            paddingTop: 16,
          }}
        >
          <Pressable onPress={logout}>
            <Text
              style={{
                color: 'red',
                fontSize: 12
              }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ErrorCard;
