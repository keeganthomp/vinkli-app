import { View, Pressable, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { UserType, OnboardUserMutation } from '@graphql/types';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import FormTextInput from '@components/inputs/FormTextInput';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FULL_NAME_REGEX } from '@utils/regex';
import { useMutation } from '@apollo/client';
import { ONBOARD_USER } from '@graphql/mutations/user';
import { CHECK_IF_USER_ONBOARDED } from '@graphql/queries/user';
import { useSession } from '@context/auth';

type OnboardingForm = {
  name: string;
  userType: UserType;
};

export default function OnboardingForm() {
  const { session } = useSession();
  const [onboardUser] = useMutation<OnboardUserMutation>(ONBOARD_USER, {
    refetchQueries: [
      {
        query: CHECK_IF_USER_ONBOARDED,
        variables: {
          phone: session?.user?.phone,
        },
      },
    ],
  });
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<OnboardingForm>({
    defaultValues: {
      name: '',
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

  const handleOnboarding = async (data: OnboardingForm) => {
    const { name, userType } = data;
    try {
      await onboardUser({
        variables: {
          input: {
            name: name.trim(),
            userType,
          },
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Congrats! You are registered',
        text2: 'You are good to go',
      });
      router.replace('/(app)');
    } catch (error) {
      console.log('Error onboarding user:', error);
      Toast.show({
        type: 'error',
        text1: 'Error Onboarding user',
        text2: 'Please try again',
      });
    }
  };

  const SPACING = 15;

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
          paddingBottom: 3,
        }}
      >
        Welcome to Vinkli
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '300',
          paddingBottom: 18,
          color: '#666',
        }}
      >
        We need a few details before you get started
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
        onPress={handleSubmit(handleOnboarding)}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 18,
          }}
        >
          Register
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}
