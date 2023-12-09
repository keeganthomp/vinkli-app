import { BookingStatus, PaymentStatus } from '@graphql/types';

export const bookingStatusColor: Record<BookingStatus, string> = {
  [BookingStatus.Pending]: 'orange',
  [BookingStatus.Completed]: 'green',
  [BookingStatus.Cancelled]: 'red',
  [BookingStatus.Confirmed]: 'green',
  [BookingStatus.Rejected]: 'red',
};

export const paymentStatusColor: Record<PaymentStatus, string> = {
  [PaymentStatus.Pending]: 'orange',
  [PaymentStatus.Success]: 'green',
  [PaymentStatus.Failed]: 'red',
};
