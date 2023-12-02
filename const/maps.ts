import { TattooColor, TattooStyle } from '@graphql/types';

export const tattooColorMap: Record<TattooColor, string> = {
  [TattooColor.BlackAndGrey]: 'Black & Grey',
  [TattooColor.Color]: 'Color',
};

export const tattooStyleMap: Record<TattooStyle, string> = {
  [TattooStyle.Blackwork]: 'Blackwork',
  [TattooStyle.TraditionalAmerican]: 'Traditional American',
  [TattooStyle.JapaneseIrezumi]: 'Japanese Irezumi',
  [TattooStyle.Realism]: 'Realism',
  [TattooStyle.Watercolor]: 'Watercolor',
  [TattooStyle.Tribal]: 'Tribal',
  [TattooStyle.NewSchool]: 'New School',
  [TattooStyle.Dotwork]: 'Dotwork',
};
