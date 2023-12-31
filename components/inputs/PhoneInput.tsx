import { TextInputMask } from 'react-native-masked-text';
import {
  textInputPlaceholderTextColor,
  defaultTextInputStyle,
} from '@const/input';
import { useRef } from 'react';
import Label from './InputLabel';

interface PhoneInputProps {
  label?: string;
  onChange: (val: string) => void;
  value: string;
}

const PhoneInput = ({ value, onChange, label }: PhoneInputProps) => {
  const phoneInputRef = useRef<TextInputMask>(null);
  return (
    <>
      {label && <Label label={label} />}
      <TextInputMask
        inputMode='numeric'
        ref={phoneInputRef}
        type={'custom'}
        placeholder="+1 (234) 567-8910"
        options={{
          mask: '+1 (999) 999-9999',
        }}
        placeholderTextColor={textInputPlaceholderTextColor}
        style={{
          ...(defaultTextInputStyle as object),
        }}
        value={value}
        onChangeText={onChange}
      />
    </>
  );
};

export default PhoneInput;
