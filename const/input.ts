import { TextInputProps } from 'react-native';
import { tattooColorMap, tattooStyleMap } from './maps';
import theme from '@theme';

export const DEFAULT_INPUT_LINE_HEIGHT = 20;

export const DEFAULT_INPUT_HEIGHT = 30;

export const textInputPlaceholderTextColor = '#999999';

export const defaultTextInputStyle: TextInputProps['style'] & {
  outline?: string;
} = {
  fontSize: 16,
  paddingTop: 0,
  fontWeight: '300',
  color: '#333',
  // outline: 'none',
  borderColor: theme.accentGray,
  lineHeight: DEFAULT_INPUT_LINE_HEIGHT,
};

/**
 * input options for dropdowns/selects/etc.
 */
export const tattooColorOptions = Object.entries(tattooColorMap).map(
  ([key, value]) => ({ label: value, value: key }),
);
export const tattooStyleOptions = Object.entries(tattooStyleMap).map(
  ([key, value]) => ({ label: value, value: key }),
);
