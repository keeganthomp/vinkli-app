import { Alert, View, Pressable, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { supabase } from '@lib/supabase';
import { UserType } from '@graphql/types';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import FormTextInput from '@components/inputs/FormTextInput';
import Toast from 'react-native-toast-message';
import Button from '@components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type SignUpForm = {
  email: string;
  password: string;
  userType: UserType;
  firstName: string;
  lastName: string;
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
      firstName: '',
      lastName: '',
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
    const { firstName, lastName, ...signupFormValues } = data;
    try {
      const { data: user, error } = await supabase.auth.signUp({
        ...signupFormValues,
        options: {
          data: {
            user_type: selectedUserType,
            first_name: firstName,
            last_name: lastName,
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
        name="firstName"
        label="First Name"
        placeholder="Jane"
        rules={{
          required: 'First Name is required',
        }}
        containerStyle={{
          paddingBottom: SPACING,
        }}
      />
      <FormTextInput
        control={control}
        name="lastName"
        label="Last Name"
        placeholder="Doe"
        rules={{
          required: 'Last Name is required',
        }}
        containerStyle={{
          paddingBottom: SPACING,
        }}
      />
      <FormTextInput
        control={control}
        autoCapitalize="none"
        textContentType="oneTimeCode"
        keyboardType="email-address"
        placeholder="jane@email.com"
        name="email"
        label="Email"
        rules={{
          required: 'Email is required',
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
