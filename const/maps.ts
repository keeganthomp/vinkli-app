import {
  TattooColor,
  TattooStyle,
  BookingType,
  BookingStatus,
  PaymentStatus,
} from '@graphql/types';

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

export const bookingTypeMap: Record<BookingType, string> = {
  [BookingType.TattooSession]: 'Session',
  [BookingType.Consultation]: 'Consultation',
};

export const bookingStatusMap: Record<BookingStatus, string> = {
  [BookingStatus.Pending]: 'Pending',
  [BookingStatus.Completed]: 'Completed',
  [BookingStatus.Cancelled]: 'Cancelled',
  [BookingStatus.Confirmed]: 'Confirmed',
  [BookingStatus.Rejected]: 'Rejected',
};

export const paymentStatusMap: Record<PaymentStatus, string> = {
  [PaymentStatus.Pending]: 'Pending',
  [PaymentStatus.Success]: 'Processed',
  [PaymentStatus.Failed]: 'Failed',
};
