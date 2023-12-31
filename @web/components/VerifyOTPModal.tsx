import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@web/components/ui/dialog';
import { ActivityIndicator } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@lib/supabase';
import { useSession } from '@context/auth';
import Toast from 'react-native-toast-message';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber?: string;
  onSubmit?: () => void;
};

export function VerifyOTPModalWeb({
  isOpen,
  onClose,
  phoneNumber,
  onSubmit,
}: Props) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const { setSession } = useSession();
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null),
  );

  const handleInputBoxChange = (
    element: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = element.target.value;
    // Check if the last character is a number
    if (value === '' || /^[0-9]$/i.test(value.charAt(value.length - 1))) {
      const newOtp = [...otp];
      newOtp[index] = value.substring(value.length - 1, value.length);
      setOtp(newOtp);

      // Automatically focus the next input box, or blur the last one
      if (value) {
        if (index < 5) {
          inputRefs[index + 1].current?.focus();
        } else {
          element.target.blur(); // Remove focus when the last box is filled
        }
      }
    }
  };

  const handlInputBoxBackSpace = (
    element: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (element.key === 'Backspace' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const resetBoxes = () => {
    setOtp(new Array(6).fill(''));
    inputRefs[0].current?.focus();
  };

  const handleClose = () => {
    onClose();
    resetBoxes();
  };

  useEffect(() => {
    const isValidOTP = otp.every((digit) => !!digit);
    // submit code and show laoder here
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
            onSubmit?.()
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
          setOtp(new Array(6).fill(''))
          setIsVerifying(false);
        });
    }
  }, [otp]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm px-12">
        <DialogHeader className="flex items-center">
          <DialogTitle>Verification code</DialogTitle>
          <DialogDescription>
            Please enter the code you recieved via text
          </DialogDescription>
        </DialogHeader>
        {isVerifying ? (
          <ActivityIndicator />
        ) : (
          <div>
            {/* Number input boxes */}
            <div className="flex justify-between h-12 gap-1 w-full">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputBoxChange(e, index)}
                  onKeyDown={(e) => handlInputBoxBackSpace(e, index)}
                  ref={inputRefs[index]}
                  className="w-10 text-center text-lg border border-gray-200 rounded"
                />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default VerifyOTPModalWeb;
