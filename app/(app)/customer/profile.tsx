import { View, Text, Pressable } from 'react-native';
import { useSession } from '@context/auth';
import { router } from 'expo-router';
import { supabase } from '@lib/supabase';
import { GET_USER } from '@graphql/queries/user';
import { useQuery } from '@apollo/client';
import { GetUserQuery } from '@graphql/types';
import { AntDesign } from '@expo/vector-icons';
import Button from '@components/Button';
import apolloClient from '@lib/apolloClient';

const SPACING = 16;

const Info = ({ label, value }: { label: string; value: string }) => (
  <View
    style={{
      paddingBottom: SPACING,
    }}
  >
    <Text
      style={{
        fontWeight: 'bold',
      }}
    >
      {label}
    </Text>
    <Text>{value}</Text>
  </View>
);

export default function CustomerProfile() {
  const { session, setSession } = useSession();
  const {
    data: userData,
    loading: loadingUser,
    error: userError,
  } = useQuery<GetUserQuery>(GET_USER, {
    variables: {
      id: session?.user.id,
    },
    skip: !session,
    fetchPolicy: 'cache-first',
  });

  const logout = () => {
    supabase.auth.signOut();
    setSession(null);
    apolloClient.clearStore();
    router.replace('/sign-in');
  };

  const user = userData?.user;
  const name = user?.firstName ? `${user?.firstName} ${user?.lastName}` : '';

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingTop: 16,
        }}
      >
        <Pressable onPress={router.back}>
          <AntDesign name="closecircle" size={24} color="#999999" />
        </Pressable>
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        Profile
      </Text>
      <View
        style={{
          paddingTop: 16,
        }}
      >
        <Info label="Name" value={name} />
        <Info label="Email" value={user?.email as string} />
      </View>
      <Button onPress={logout} label="Log out" />
    </View>
  );
}
