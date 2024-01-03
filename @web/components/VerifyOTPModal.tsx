import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@web/components/ui/dialog';
import { ActivityIndicator, Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@lib/supabase';
import { useSession } from '@context/auth';
import { OTP_REGEX } from '@utils/regex';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber?: string;
  onStartAuth?: () => void;
  onValidOTP?: () => void;
  onInvalidOTP?: () => void;
};

const checkValidOTP = (otp: string) => {
  return OTP_REGEX.test(otp);
};

export function VerifyOTPModalWeb({
  isOpen,
  onClose,
  phoneNumber,
  onStartAuth,
  onValidOTP,
  onInvalidOTP,
}: Props) {
  const [otp, setOtp] = useState('');
  const { setSession } = useSession();

  const resetOtp = () => {
    setOtp('');
  };

  const handleClose = () => {
    onClose();
    resetOtp();
  };

  useEffect(() => {
    const isValidOTP = checkValidOTP(otp);
    // submit code and show laoder here
    if (isValidOTP && phoneNumber) {
      Keyboard.dismiss();
      onStartAuth?.();
      supabase.auth
        .verifyOtp({
          phone: phoneNumber,
          token: otp,
          type: 'sms',
        })
        .then((authResponse) => {
          const session = authResponse?.data?.session;
          if (session) {
            setSession(session);
            onValidOTP?.();
            return;
          }
          // something went wrong
          onInvalidOTP?.();
        })
        .catch((err) => {
          onInvalidOTP?.();
        })
        .finally(() => {
          // clear input boxes
          resetOtp();
        });
    }
  }, [otp]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95%] md:w-full px-10 flex flex-col justify-center">
        <DialogHeader className="flex items-center">
          <DialogTitle>Verification code</DialogTitle>
          <DialogDescription>
            Please enter the code you recieved via text
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center flex-col items-center">
          <input
            type="text"
            placeholder="123456"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full md:w-[300px] border-b focus:outline-none focus:border-gray-700 text-center text-2x text-lg tracking-[32px] pb-1"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VerifyOTPModalWeb;
