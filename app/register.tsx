import { Alert, View, Pressable, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { supabase } from '@lib/supabase';
import { UserType } from '@graphql/types';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import FormTextInput from '@components/inputs/FormTextInput';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { EMAIL_REGEX, FULL_NAME_REGEX } from '@utils/regex';

type SignUpForm = {
  email: string;
  password: string;
  userType: UserType;
  name: string;
};

const SigninLink = () => {
  return (
    <Pressable
      onPress={() => router.replace('/sign-in')}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
      }}
    >
      <Text>Already have an account? Sign in</Text>
    </Pressable>
  );
};

export default function Signup() {
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<SignUpForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      userType: UserType.Customer,
    },
  });
  const selectedUserType = watch('userType');

  const toggleUserType = () => {
    const newType =
      selectedUserType === UserType.Customer
        ? UserType.Artist
        : UserType.Customer;
    setValue('userType', newType);
  };

  const handleSignup = async (data: SignUpForm) => {
    const { name, ...signupFormValues } = data;
    try {
      const { data: user, error } = await supabase.auth.signUp({
        ...signupFormValues,
        options: {
          data: {
            user_type: selectedUserType,
            name,
          },
        },
      });
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Error signing up',
          text2: error.message,
        });
        return;
      }
      Alert.alert('Check your email for the confirmation link & login!');
      router.replace('/sign-in');
    } catch (error) {
      console.log('Error signing up:', error);
      Alert.alert('Error signing up');
    }
  };

  const SPACING = 18;

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
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
        Register
      </Text>
      <FormTextInput
        control={control}
        name="name"
        label="Name"
        placeholder="Jane Doe"
        rules={{
          required: 'Name is required',
          pattern: {
            value: FULL_NAME_REGEX,
            message: 'Please enter your first and last name',
          },
        }}
        containerStyle={{
          paddingBottom: SPACING,
        }}
      />
      <FormTextInput
        control={control}
        autoCapitalize="none"
        textContentType="oneTimeCode"
        inputMode="email"
        placeholder="jane@email.com"
        name="email"
        label="Email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Please enter valid email',
          },
        }}
        containerStyle={{
          paddingBottom: SPACING,
        }}
      />
      <FormTextInput
        control={control}
        secureTextEntry={true}
        autoCapitalize="none"
        name="password"
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
          paddingBottom: SPACING + 5,
        }}
      />
      <View
        style={{
          paddingBottom: SPACING,
          display: 'flex',
        }}
      >
        <Pressable
          onPress={toggleUserType}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Checkbox
            value={selectedUserType === UserType.Artist}
            onValueChange={toggleUserType}
            style={{
              alignSelf: 'center',
              width: 17,
              height: 17,
              borderRadius: 3,
              borderWidth: 1,
              padding: 2,
            }}
            color={selectedUserType === UserType.Artist ? '#000' : undefined}
          />
          <Text
            style={{
              paddingLeft: 7,
            }}
          >
            I am a tattoo artist
          </Text>
        </Pressable>
      </View>
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
        onPress={handleSubmit(handleSignup)}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 18,
          }}
        >
          Sign up
        </Text>
      </Pressable>
      <SigninLink />
    </KeyboardAwareScrollView>
  );
}
