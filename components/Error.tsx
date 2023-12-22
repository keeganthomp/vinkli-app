import theme from '@theme';
import { View, Text, Pressable } from 'react-native';
import { supabase } from '@lib/supabase';
import { useSession } from '@context/auth';
import apolloClient from '@lib/apolloClient';
import { router } from 'expo-router';
import { EvilIcons } from '@expo/vector-icons';

type Props = {
  message?: string;
  onRefresh?: () => void;
  hasLogout?: boolean;
};

const ErrorCard = ({
  hasLogout = true,
  message = 'Please try again later',
  onRefresh,
}: Props) => {
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
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Something went wrong
        </Text>
        <Text
          style={{
            paddingTop: 5,
            fontSize: 15,
          }}
        >
          {message}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {!!onRefresh && (
            <Pressable
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingTop: 10,
                marginBottom: 4,
              }}
              onPress={() => onRefresh()}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '300',
                }}
              >
                Try again
              </Text>
              <EvilIcons name="refresh" size={20} />
            </Pressable>
          )}
          {hasLogout && (
            <Pressable
              style={{
                padding: 5,
              }}
              onPress={logout}
            >
              <Text
                style={{
                  color: theme.red,
                  fontSize: 13,
                }}
              >
                Logout
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default ErrorCard;
