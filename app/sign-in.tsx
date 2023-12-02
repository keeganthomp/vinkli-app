import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { supabase } from '@lib/supabase';
import { useSession } from '@context/auth';
import { router } from 'expo-router';
import theme from '@theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

const RegisterLink = () => {
  return (
    <Pressable
      onPress={() => router.replace('/register')}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
      }}
    >
      <Text>Don't have an account? Register</Text>
    </Pressable>
  );
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useSession();

  const disabled = loading || !email || !password;

  async function signInWithEmail() {
    setLoading(true);
    const authResponse = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (authResponse?.error) {
      Toast.show({
        type: 'error',
        text1: 'Error signing in',
        text2: authResponse.error.message,
      });
      setLoading(false);
      return;
    }
    const session = authResponse?.data?.session;
    if (session) {
      setSession(session);
      router.replace('/');
      setLoading(false);
    }
  }

  const SPACING = 16;

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12,
      }}
    >
      <View
        style={{
          paddingBottom: SPACING,
        }}
      >
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          style={{
            fontSize: 16,
            borderBottomWidth: 1,
            borderColor: theme.lightGray,
            paddingBottom: 5,
          }}
        />
      </View>
      <View
        style={{
          paddingBottom: SPACING,
        }}
      >
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={{
            fontSize: 16,
            borderBottomWidth: 1,
            borderColor: theme.lightGray,
            paddingBottom: 5,
          }}
        />
      </View>
      <Pressable
        style={{
          backgroundColor: loading ? 'lightgray' : '#000',
          height: 36,
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={disabled}
        onPress={signInWithEmail}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Sign in
        </Text>
      </Pressable>
      <RegisterLink />
    </KeyboardAwareScrollView>
  );
}
