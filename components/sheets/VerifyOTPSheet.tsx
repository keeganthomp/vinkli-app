import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSession } from '@context/auth';
import { supabase } from '@lib/supabase';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

function VerifyOTPSheet({ payload }: SheetProps) {
  const phoneNumber = payload?.phoneNumber;
  const insets = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const inputRefs = Array.from({ length: 6 }, () => useRef<TextInput>(null));
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const { setSession } = useSession();

  const handleInputBoxChange = (value: string, index: number) => {
    if (value === '' || /^[0-9]$/i.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index !== otp.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleInputBoxBackSpace = (index: number) => {
    const newOtp = [...otp];
    newOtp[index] = '';
    setOtp(newOtp);
    if (index !== 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const resetBoxes = () => {
    setOtp(new Array(6).fill(''));
    inputRefs[0].current?.focus();
  };

  const closeModal = () => {
    actionSheetRef.current?.hide();
    resetBoxes();
    setIsVerifying(false);
  };

  useEffect(() => {
    const isValidOTP = otp.every((digit) => !!digit);
    if (isValidOTP && phoneNumber) {
      setIsVerifying(true);
      supabase.auth
        .verifyOtp({
          phone: phoneNumber,
          token: otp.join(''),
          type: 'sms',
        })
        .then((authResponse) => {
          const session = authResponse?.data?.session;
          if (session) {
            setSession(session);
            router.replace('/(app)');
            return;
          }
          // something went wrong
          Toast.show({
            type: 'error',
            text1: 'Error signing in',
            text2: 'Something went wrong',
          });
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Error signing in',
            text2: err?.message || 'Something went wrong',
          });
        })
        .finally(() => {
          // clear input boxes
          setOtp(new Array(6).fill(''));
          closeModal();
          setIsVerifying(false);
        });
    }
  }, [otp, phoneNumber]);

  return (
    <ActionSheet
      id={sheetIds.verifyOTP}
      ref={actionSheetRef}
      isModal={true}
      statusBarTranslucent
      gestureEnabled={false}
      defaultOverlayOpacity={0.3}
      containerStyle={{
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Verification code</Text>
        <Text style={styles.description}>
          Please enter the code you received via text
        </Text>
        {isVerifying ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.inputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.inputBox}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => {
                  if (!text) {
                    handleInputBoxBackSpace(index);
                  } else {
                    handleInputBoxChange(text, index);
                  }
                }}
                ref={inputRefs[index]}
              />
            ))}
          </View>
        )}
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  description: {
    fontSize: 12,
    fontWeight: '300',
  },
  inputContainer: {
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBox: {
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default VerifyOTPSheet;
