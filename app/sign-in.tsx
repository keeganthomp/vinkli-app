import React, { useMemo } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
  Platform,
} from 'react-native';
import { supabase } from '@lib/supabase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import VerifyOTPModal from '@web/components/VerifyOTPModal';
import { PHONE_REGEX } from '@utils/regex';
import { useLazyQuery } from '@apollo/client';
import { CHECK_IF_USER_ONBOARDED } from '@graphql/queries/user';
import { CheckIfUserOnboardedQuery } from '@graphql/types';
import { router } from 'expo-router';
import PhoneInput from '@components/inputs/PhoneInput';
import { SheetManager } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';

const isWeb = Platform.OS === 'web';

const isValidPhone = (phone: string) => {
  return PHONE_REGEX.test(phone);
};

export default function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = React.useState(false);
  const [checkIfUserRegistered] = useLazyQuery<CheckIfUserOnboardedQuery>(
    CHECK_IF_USER_ONBOARDED,
  );
  const [phoneNum, setPhoneNum] = React.useState('');

  const formattedPhoneNum = useMemo(() => {
    const phone = phoneNum.replace(/\D/g, '');
    return phone;
  }, [phoneNum]);

  const openVerifyOTPModal = () => {
    if (isWeb) {
      setIsVerifyingOTP(true);
    } else {
      console.log('wooo')
      SheetManager.show(sheetIds.verifyOTP, {
        payload: {
          phoneNumber: formattedPhoneNum,
        },
      });
    }
  };
  const closeModal = () => {
    setIsVerifyingOTP(false);
  };

  async function checkIfUserNeedsRegistration() {
    try {
      // see if user needs onboarding
      const validUserResp = await checkIfUserRegistered({
        variables: {
          phone: formattedPhoneNum,
        },
      });
      const hasOnboarded = validUserResp?.data?.checkIfUserOnboarded;
      // if they are onboarded, redirect to app
      if (hasOnboarded) {
        router.replace('/(app)');
        return;
      }
      // if they need onboarding, take them to register
      router.replace('/register');
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Error checking user status',
        text2: err?.message || 'Something went wrong',
      });
    }
  }

  async function signInWithOTP() {
    setIsAuthenticating(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: formattedPhoneNum,
    });
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error signing in',
        text2: error.message,
      });
      setIsAuthenticating(false);
      return;
    }
    if (data) {
      openVerifyOTPModal();
    }
  }

  return (
    <>
      {isAuthenticating ? (
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
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
          <PhoneInput value={phoneNum} onChange={setPhoneNum} />
          <Pressable
            style={{
              marginTop: 20,
              backgroundColor: !isValidPhone(formattedPhoneNum)
                ? 'lightgray'
                : '#000',
              height: 44,
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={!isValidPhone(formattedPhoneNum)}
            onPress={signInWithOTP}
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
        </KeyboardAwareScrollView>
      )}
      {/* OTP pin input */}
      {isWeb && (
        <VerifyOTPModal
          isOpen={isVerifyingOTP}
          onClose={closeModal}
          phoneNumber={isValidPhone(formattedPhoneNum) ? formattedPhoneNum : ''}
          onSubmit={checkIfUserNeedsRegistration}
        />
      )}
    </>
  );
}
