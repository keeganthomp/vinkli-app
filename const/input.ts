import { TextInputProps, Platform } from 'react-native';
import { TattooColor, TattooStyle } from '@graphql/types';

const isWeb = Platform.OS === 'web';

export const defaultTextInputStyle: TextInputProps['style'] = {
  fontSize: 16,
  paddingTop: 0,
  fontWeight: '300',
  color: '#333',
};
if (isWeb) {
  // defaultTextInputStyle.outline = 'none';
}

export const textInputPlaceholderTextColor = '#999999';

export const tattooColorOptions: any[] = [
  {
    label: 'Black & Grey',
    value: TattooColor.BlackAndGrey,
  },
  {
    label: 'Color',
    value: TattooColor.Color,
  },
];

export const tattooStyleOptions: any[] = [
  {
    label: 'Blackwork',
    value: TattooStyle.Blackwork,
  },
  {
    label: 'Traditional American',
    value: TattooStyle.TraditionalAmerican,
  },
  {
    label: 'Japanese Irezumi',
    value: TattooStyle.JapaneseIrezumi,
  },
  {
    label: 'Realism',
    value: TattooStyle.Realism,
  },
  {
    label: 'Watercolor',
    value: TattooStyle.Watercolor,
  },
  {
    label: 'Tribal',
    value: TattooStyle.Tribal,
  },
  {
    label: 'New School',
    value: TattooStyle.NewSchool,
  },
  {
    label: 'Dotwork',
    value: TattooStyle.Dotwork,
  },
];
