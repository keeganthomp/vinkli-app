import React from 'react';
import { Pressable, Text } from 'react-native';
import { supabase } from '@lib/supabase';
import { useSession } from '@context/auth';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import FormTextInput from '@components/inputs/FormTextInput';
import { useForm } from 'react-hook-form';

type LoginForm = {
  email: string;
  password: string;
};

const RegisterLink = () => {
  return (
    <Pressable
      onPress={() => router.replace('/register')}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
      }}
    >
      <Text>Don't have an account? Register</Text>
    </Pressable>
  );
};

export default function Login() {
  const { setSession } = useSession();

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function signInWithEmail(data: LoginForm) {
    try {
      const authResponse = await supabase.auth.signInWithPassword(data);
      if (authResponse?.error) {
        Toast.show({
          type: 'error',
          text1: 'Error signing in',
          text2: authResponse.error.message,
        });
        return;
      }
      const session = authResponse?.data?.session;
      if (session) {
        setSession(session);
        router.replace('/');
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error signing in',
        text2: error?.message || 'Something went wrong',
      });
    }
  }

  const SPACING = 18;

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          paddingBottom: 24,
        }}
      >
        Sign In
      </Text>
      <FormTextInput
        name="email"
        textContentType="oneTimeCode"
        autoCapitalize="none"
        inputMode="email"
        control={control}
        label="Email"
        placeholder="jane@email.com"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter valid email',
          },
        }}
        containerStyle={{
          paddingBottom: SPACING,
        }}
      />
      <FormTextInput
        name="password"
        secureTextEntry={true}
        autoCapitalize="none"
        control={control}
        label="Password"
        placeholder="password123!"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
        containerStyle={{
          paddingBottom: SPACING,
        }}
      />
      <Pressable
        style={{
          marginTop: 20,
          backgroundColor: isSubmitting || !isValid ? 'lightgray' : '#000',
          height: 44,
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={isSubmitting || !isValid}
        onPress={handleSubmit(signInWithEmail)}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 18,
          }}
        >
          Sign in
        </Text>
      </Pressable>
      <RegisterLink />
    </KeyboardAwareScrollView>
  );
}
