import Modal from 'react-native-modal';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { useSession } from '@context/auth';
import { supabase } from '@lib/supabase';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { OTP_REGEX } from '@utils/regex';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
};

const checkValidOTP = (otp: string) => {
  return OTP_REGEX.test(otp);
};

function VerifyOTPModal({ isOpen, onClose, phoneNumber }: Props) {
  const otpInputRef = useRef<TextInput | null>(null);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { setSession } = useSession();

  const resetInput = () => {
    setOtp('');
  };

  const closeModal = () => {
    Keyboard.dismiss();
    onClose();
  };

  useEffect(() => {
    const isValidOTP = checkValidOTP(otp);
    if (isValidOTP && phoneNumber) {
      Keyboard.dismiss();
      setIsVerifying(true);
      supabase.auth
        .verifyOtp({
          phone: phoneNumber,
          token: otp,
          type: 'sms',
        })
        .then((authResponse) => {
          const session = authResponse?.data?.session;
          if (session) {
            closeModal();
            setSession(session);
            router.replace('/(app)');
          } else {
            // something went wrong
            Toast.show({
              type: 'error',
              text1: 'Error signing in',
              text2: 'Something went wrong',
            });
          }
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Error signing in',
            text2: err?.message || 'Something went wrong',
          });
        })
        .finally(() => {
          resetInput();
          setIsVerifying(false);
        });
    }
  }, [otp, phoneNumber]);

  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isOpen}
      onModalShow={() => {
        otpInputRef.current?.focus();
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
            <TextInput
              ref={otpInputRef}
              style={styles.inputBox}
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              placeholder="123456"
            />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: '70%',
    height: 40,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    letterSpacing: 24,
    paddingHorizontal: 4,
    display: 'flex',
    textAlign: 'center',
  },
});

export default VerifyOTPModal;
