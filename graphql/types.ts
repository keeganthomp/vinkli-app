import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Artist = {
  __typename?: 'Artist';
  consultationFee?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  email?: Maybe<Scalars['String']['output']>;
  hasOnboardedToStripe?: Maybe<Scalars['Boolean']['output']>;
  hourlyRate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  stripeAccountId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ArtistCreateBookingInput = {
  customerName?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  phone: Scalars['String']['input'];
  startDate: Scalars['Date']['input'];
  tattoo?: InputMaybe<TattooForBookingInput>;
  tattooId?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BookingType>;
};

export type ArtistCreateTattooInput = {
  color?: InputMaybe<TattooColor>;
  customerEmail: Scalars['String']['input'];
  date?: InputMaybe<Scalars['Date']['input']>;
  description: Scalars['String']['input'];
  imagePaths?: InputMaybe<Array<Scalars['String']['input']>>;
  placement?: InputMaybe<Scalars['String']['input']>;
  style?: InputMaybe<TattooStyle>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArtistFinancials = {
  __typename?: 'ArtistFinancials';
  balance: Balance;
  charges: Array<Charge>;
  payouts: Array<Payout>;
  refunds: Array<Refund>;
};

export type ArtistPayment = {
  __typename?: 'ArtistPayment';
  amount: Scalars['Int']['output'];
  artist?: Maybe<User>;
  artistId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['Date']['output'];
  currency: Scalars['String']['output'];
  customer: User;
  customerId: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  stripeChargeId: Scalars['String']['output'];
  stripeRefundId?: Maybe<Scalars['String']['output']>;
  stripeRefundReversalId?: Maybe<Scalars['String']['output']>;
  stripeTransferId: Scalars['String']['output'];
  stripeTransferReversalId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ArtistPaymentPayload = {
  __typename?: 'ArtistPaymentPayload';
  payments: Array<ArtistPayment>;
  totalReceived: Scalars['Int']['output'];
};

export type Balance = {
  __typename?: 'Balance';
  available: Array<BalanceObject>;
  instantAvailable?: Maybe<Array<BalanceObject>>;
  pending: Array<BalanceObject>;
  reserved?: Maybe<Array<BalanceObject>>;
};

export type BalanceObject = {
  __typename?: 'BalanceObject';
  amount: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
  sourceTypes?: Maybe<BalanceSourceTypes>;
};

export type BalanceSourceTypes = {
  __typename?: 'BalanceSourceTypes';
  bank_account?: Maybe<Scalars['Int']['output']>;
  card?: Maybe<Scalars['Int']['output']>;
  fpx?: Maybe<Scalars['Int']['output']>;
};

export type Booking = {
  __typename?: 'Booking';
  artist?: Maybe<User>;
  artistId?: Maybe<Scalars['ID']['output']>;
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  customer?: Maybe<User>;
  duration?: Maybe<Scalars['Float']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  payment?: Maybe<Payment>;
  paymentReceived: Scalars['Boolean']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
  status: BookingStatus;
  tattoo?: Maybe<Tattoo>;
  tattooId: Scalars['ID']['output'];
  totalDue?: Maybe<Scalars['Int']['output']>;
  type: BookingType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId: Scalars['ID']['output'];
};

export enum BookingStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum BookingType {
  Consultation = 'CONSULTATION',
  TattooSession = 'TATTOO_SESSION'
}

export type Charge = {
  __typename?: 'Charge';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paid: Scalars['Boolean']['output'];
  paymentType?: Maybe<PaymentType>;
};

export type CustomerBookingResponse = {
  __typename?: 'CustomerBookingResponse';
  booking: Booking;
  customerInfo: CustomerInfo;
};

export type CustomerCreateBookingInput = {
  artistId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  tattoo: TattooForBookingInput;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BookingType>;
};

export type CustomerCreateTattooInput = {
  artistId?: InputMaybe<Scalars['ID']['input']>;
  color?: InputMaybe<TattooColor>;
  description: Scalars['String']['input'];
  imagePaths?: InputMaybe<Array<Scalars['String']['input']>>;
  placement?: InputMaybe<Scalars['String']['input']>;
  style?: InputMaybe<TattooStyle>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  inviteSent: Scalars['Boolean']['output'];
  isConfirmed: Scalars['Boolean']['output'];
  isNewCustomer: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  artistCreateBooking: Booking;
  artistUpdateBookingStatus: Booking;
  customerCreateBooking: CustomerBookingResponse;
  customerCreateTattoo: Tattoo;
  deleteBooking?: Maybe<Booking>;
  generateStripeConnectOnboardingLink: Scalars['String']['output'];
  onboardUser: User;
  updateArtistRates: Artist;
};


export type MutationArtistCreateBookingArgs = {
  input: ArtistCreateBookingInput;
};


export type MutationArtistUpdateBookingStatusArgs = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  status: BookingStatus;
};


export type MutationCustomerCreateBookingArgs = {
  input: CustomerCreateBookingInput;
};


export type MutationCustomerCreateTattooArgs = {
  input: CustomerCreateTattooInput;
};


export type MutationDeleteBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationOnboardUserArgs = {
  input: OnboardUserInput;
};


export type MutationUpdateArtistRatesArgs = {
  consultationFee?: InputMaybe<Scalars['Int']['input']>;
  hourlyRate?: InputMaybe<Scalars['Int']['input']>;
};

export type OnboardUserInput = {
  name: Scalars['String']['input'];
  userType: UserType;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  booking: Booking;
  bookingId: Scalars['ID']['output'];
  chargeId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  paymentIntentId?: Maybe<Scalars['String']['output']>;
  status: PaymentStatus;
};

export enum PaymentStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export enum PaymentType {
  AchCreditTransfer = 'ach_credit_transfer',
  AchDebit = 'ach_debit',
  AcssDebit = 'acss_debit',
  Alipay = 'alipay',
  AuBecsDebit = 'au_becs_debit',
  Bancontact = 'bancontact',
  Card = 'card',
  CardPresent = 'card_present',
  Eps = 'eps',
  Giropay = 'giropay',
  Ideal = 'ideal',
  Klarna = 'klarna',
  Multibanco = 'multibanco',
  P24 = 'p24',
  SepaDebit = 'sepa_debit',
  Sofort = 'sofort',
  StripeAccount = 'stripe_account',
  Wechat = 'wechat'
}

export type Payout = {
  __typename?: 'Payout';
  amount: Scalars['Int']['output'];
  arrivalDate: Scalars['Date']['output'];
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  sourceType: SourceType;
  status: PayoutStatus;
};

export enum PayoutStatus {
  Canceled = 'canceled',
  Failed = 'failed',
  InTransit = 'in_transit',
  Paid = 'paid',
  Pending = 'pending'
}

export type Query = {
  __typename?: 'Query';
  artist: Artist;
  artistFinancials: ArtistFinancials;
  checkIfUserOnboarded: Scalars['Boolean']['output'];
  customerTattoos: Array<Tattoo>;
  existingCustomer?: Maybe<User>;
  getPaymentLink: Scalars['String']['output'];
  getPayments: Array<Payment>;
  publicArtistProfile: Artist;
  stripeTerminalConnectionToken: Scalars['String']['output'];
  user: User;
  userBooking: Booking;
  userBookings: Array<Booking>;
  users: Array<Maybe<User>>;
};


export type QueryCheckIfUserOnboardedArgs = {
  phone: Scalars['String']['input'];
};


export type QueryExistingCustomerArgs = {
  phone: Scalars['String']['input'];
};


export type QueryGetPaymentLinkArgs = {
  bookingId: Scalars['ID']['input'];
};


export type QueryPublicArtistProfileArgs = {
  artistId: Scalars['ID']['input'];
};


export type QueryUserBookingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserBookingsArgs = {
  status?: InputMaybe<BookingStatus>;
};

export type Refund = {
  __typename?: 'Refund';
  amount: Scalars['Int']['output'];
  chargeId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: RefundStatus;
};

export enum RefundStatus {
  Canceled = 'canceled',
  Failed = 'failed',
  Pending = 'pending',
  RequiresAction = 'requires_action',
  Succeeded = 'succeeded'
}

export enum SourceType {
  BankAccount = 'bank_account',
  Card = 'card',
  Fpx = 'fpx'
}

export type Tattoo = {
  __typename?: 'Tattoo';
  artist?: Maybe<User>;
  color?: Maybe<TattooColor>;
  consultation?: Maybe<Booking>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  customer?: Maybe<User>;
  customerId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrls: Array<Scalars['String']['output']>;
  placement?: Maybe<Scalars['String']['output']>;
  sessions?: Maybe<Array<Booking>>;
  style?: Maybe<TattooStyle>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum TattooColor {
  BlackAndGrey = 'BLACK_AND_GREY',
  Color = 'COLOR'
}

export type TattooForBookingInput = {
  color?: InputMaybe<TattooColor>;
  date?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imagePaths?: InputMaybe<Array<Scalars['String']['input']>>;
  placement?: InputMaybe<Scalars['String']['input']>;
  style?: InputMaybe<TattooStyle>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum TattooStyle {
  Blackwork = 'BLACKWORK',
  Dotwork = 'DOTWORK',
  JapaneseIrezumi = 'JAPANESE_IREZUMI',
  NewSchool = 'NEW_SCHOOL',
  Realism = 'REALISM',
  TraditionalAmerican = 'TRADITIONAL_AMERICAN',
  Tribal = 'TRIBAL',
  Watercolor = 'WATERCOLOR'
}

export type User = {
  __typename?: 'User';
  consultationFee?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  email?: Maybe<Scalars['String']['output']>;
  hasOnboardedToStripe?: Maybe<Scalars['Boolean']['output']>;
  hourlyRate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  stripeAccountId?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  userType?: Maybe<UserType>;
};

export enum UserType {
  Artist = 'ARTIST',
  Customer = 'CUSTOMER'
}

export type BookingFragmentFragment = { __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean };

export type ChargeFragmentFragment = { __typename?: 'Charge', id: string, amount: number, createdAt: any, paid: boolean, paymentType?: PaymentType | null, description?: string | null };

export type BalanceFragmentFragment = { __typename?: 'Balance', available: Array<{ __typename?: 'BalanceObject', amount: number, currency: string, sourceTypes?: { __typename?: 'BalanceSourceTypes', card?: number | null, fpx?: number | null, bank_account?: number | null } | null }>, reserved?: Array<{ __typename?: 'BalanceObject', amount: number, currency: string, sourceTypes?: { __typename?: 'BalanceSourceTypes', card?: number | null, fpx?: number | null, bank_account?: number | null } | null }> | null, instantAvailable?: Array<{ __typename?: 'BalanceObject', amount: number, currency: string, sourceTypes?: { __typename?: 'BalanceSourceTypes', card?: number | null, fpx?: number | null, bank_account?: number | null } | null }> | null, pending: Array<{ __typename?: 'BalanceObject', amount: number, currency: string, sourceTypes?: { __typename?: 'BalanceSourceTypes', card?: number | null, fpx?: number | null, bank_account?: number | null } | null }> };

export type PayoutFragmentFragment = { __typename?: 'Payout', id: string, amount: number, createdAt: any, description?: string | null, sourceType: SourceType, status: PayoutStatus, arrivalDate: any };

export type RefundFragmentFragment = { __typename?: 'Refund', id: string, amount: number, chargeId: string, createdAt: any, currency: string, status: RefundStatus };

export type PaymentFragmentFragment = { __typename?: 'Payment', chargeId: string, paymentIntentId?: string | null, createdAt: any, amount: number, status: PaymentStatus, bookingId: string };

export type TattooFragmentFragment = { __typename?: 'Tattoo', id: string, createdAt?: any | null, updatedAt?: any | null, customerId?: string | null, title?: string | null, description?: string | null, style?: TattooStyle | null, color?: TattooColor | null, imageUrls: Array<string>, placement?: string | null };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null };

export type ArtistFragmentFragment = { __typename?: 'Artist', id: string, createdAt: any, updatedAt: any, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null };

export type CustomerCreateBookingMutationVariables = Exact<{
  input: CustomerCreateBookingInput;
}>;


export type CustomerCreateBookingMutation = { __typename?: 'Mutation', customerCreateBooking: { __typename?: 'CustomerBookingResponse', booking: { __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean, customer?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null, artist?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null }, customerInfo: { __typename?: 'CustomerInfo', isNewCustomer: boolean, isConfirmed: boolean, inviteSent: boolean } } };

export type ArtistCreateBookingMutationVariables = Exact<{
  input: ArtistCreateBookingInput;
}>;


export type ArtistCreateBookingMutation = { __typename?: 'Mutation', artistCreateBooking: { __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean } };

export type ArtistUpdateBookingStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: BookingStatus;
  duration?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ArtistUpdateBookingStatusMutation = { __typename?: 'Mutation', artistUpdateBookingStatus: { __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean } };

export type CustomerTattoosQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerTattoosQuery = { __typename?: 'Query', customerTattoos: Array<{ __typename?: 'Tattoo', id: string, createdAt?: any | null, updatedAt?: any | null, customerId?: string | null, title?: string | null, description?: string | null, style?: TattooStyle | null, color?: TattooColor | null, imageUrls: Array<string>, placement?: string | null, customer?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null, consultation?: { __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean, artist?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null } | null, sessions?: Array<{ __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean, artist?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null }> | null }> };

export type GenerateStripeConnectOnboardingLinkMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateStripeConnectOnboardingLinkMutation = { __typename?: 'Mutation', generateStripeConnectOnboardingLink: string };

export type UpdateArtistRatesMutationVariables = Exact<{
  hourlyRate: Scalars['Int']['input'];
  consultationFee: Scalars['Int']['input'];
}>;


export type UpdateArtistRatesMutation = { __typename?: 'Mutation', updateArtistRates: { __typename?: 'Artist', id: string, createdAt: any, updatedAt: any, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } };

export type OnboardUserMutationVariables = Exact<{
  input: OnboardUserInput;
}>;


export type OnboardUserMutation = { __typename?: 'Mutation', onboardUser: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } };

export type UserBookingsQueryVariables = Exact<{
  status?: InputMaybe<BookingStatus>;
}>;


export type UserBookingsQuery = { __typename?: 'Query', userBookings: Array<{ __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean, customer?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null, artist?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null, tattoo?: { __typename?: 'Tattoo', id: string, createdAt?: any | null, updatedAt?: any | null, customerId?: string | null, title?: string | null, description?: string | null, style?: TattooStyle | null, color?: TattooColor | null, imageUrls: Array<string>, placement?: string | null } | null }> };

export type UserBookingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserBookingQuery = { __typename?: 'Query', userBooking: { __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean, customer?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null, artist?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null, tattoo?: { __typename?: 'Tattoo', id: string, createdAt?: any | null, updatedAt?: any | null, customerId?: string | null, title?: string | null, description?: string | null, style?: TattooStyle | null, color?: TattooColor | null, imageUrls: Array<string>, placement?: string | null } | null } };

export type ArtistFinancialsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistFinancialsQuery = { __typename?: 'Query', artistFinancials: { __typename?: 'ArtistFinancials', charges: Array<{ __typename?: 'Charge', id: string, amount: number, createdAt: any, paid: boolean, paymentType?: PaymentType | null, description?: string | null }>, balance: { __typename?: 'Balance', available: Array<{ __typename?: 'BalanceObject', amount: number, currency: string, sourceTypes?: { __typename?: 'BalanceSourceTypes', card?: number | null, fpx?: number | null, bank_account?: number | null } | null }>, reserved?: Array<{ __typename?: 'BalanceObject', amount: number, currency: string, sourceTypes?: { __typename?: 'BalanceSourceTypes', card?: number | null, fpx?: number | null, bank_account?: number | null } | null }> | null, instantAvailable?: Array<{ __typename?: 'BalanceObject', amount: number, currency: string, sourceTypes?: { __typename?: 'BalanceSourceTypes', card?: number | null, fpx?: number | null, bank_account?: number | null } | null }> | null, pending: Array<{ __typename?: 'BalanceObject', amount: number, currency: string, sourceTypes?: { __typename?: 'BalanceSourceTypes', card?: number | null, fpx?: number | null, bank_account?: number | null } | null }> }, payouts: Array<{ __typename?: 'Payout', id: string, amount: number, createdAt: any, description?: string | null, sourceType: SourceType, status: PayoutStatus, arrivalDate: any }>, refunds: Array<{ __typename?: 'Refund', id: string, amount: number, chargeId: string, createdAt: any, currency: string, status: RefundStatus }> } };

export type StripeTerminalConnectionTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type StripeTerminalConnectionTokenQuery = { __typename?: 'Query', stripeTerminalConnectionToken: string };

export type GetPaymentLinkQueryVariables = Exact<{
  bookingId: Scalars['ID']['input'];
}>;


export type GetPaymentLinkQuery = { __typename?: 'Query', getPaymentLink: string };

export type GetPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaymentsQuery = { __typename?: 'Query', getPayments: Array<{ __typename?: 'Payment', chargeId: string, paymentIntentId?: string | null, createdAt: any, amount: number, status: PaymentStatus, bookingId: string, booking: { __typename?: 'Booking', id: string, createdAt?: any | null, updatedAt?: any | null, artistId?: string | null, userId: string, tattooId: string, status: BookingStatus, startDate?: any | null, endDate?: any | null, type: BookingType, completedAt?: any | null, duration?: number | null, totalDue?: number | null, paymentReceived: boolean } }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } };

export type ArtistQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistQuery = { __typename?: 'Query', artist: { __typename?: 'Artist', id: string, createdAt: any, updatedAt: any, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } };

export type PublicArtistProfileQueryVariables = Exact<{
  artistId: Scalars['ID']['input'];
}>;


export type PublicArtistProfileQuery = { __typename?: 'Query', publicArtistProfile: { __typename?: 'Artist', id: string, createdAt: any, updatedAt: any, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } };

export type CheckIfUserOnboardedQueryVariables = Exact<{
  phone: Scalars['String']['input'];
}>;


export type CheckIfUserOnboardedQuery = { __typename?: 'Query', checkIfUserOnboarded: boolean };

export type ExistingCustomerQueryVariables = Exact<{
  phone: Scalars['String']['input'];
}>;


export type ExistingCustomerQuery = { __typename?: 'Query', existingCustomer?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, userType?: UserType | null, email?: string | null, phone: string, name?: string | null, stripeAccountId?: string | null, hasOnboardedToStripe?: boolean | null, hourlyRate?: number | null, consultationFee?: number | null } | null };

export const BookingFragmentFragmentDoc = gql`
    fragment BookingFragment on Booking {
  id
  createdAt
  updatedAt
  artistId
  userId
  tattooId
  status
  startDate
  endDate
  type
  completedAt
  duration
  totalDue
  paymentReceived
}
    `;
export const ChargeFragmentFragmentDoc = gql`
    fragment ChargeFragment on Charge {
  id
  amount
  createdAt
  paid
  paymentType
  description
}
    `;
export const BalanceFragmentFragmentDoc = gql`
    fragment BalanceFragment on Balance {
  available {
    amount
    currency
    sourceTypes {
      card
      fpx
      bank_account
    }
  }
  reserved {
    amount
    currency
    sourceTypes {
      card
      fpx
      bank_account
    }
  }
  instantAvailable {
    amount
    currency
    sourceTypes {
      card
      fpx
      bank_account
    }
  }
  pending {
    amount
    currency
    sourceTypes {
      card
      fpx
      bank_account
    }
  }
}
    `;
export const PayoutFragmentFragmentDoc = gql`
    fragment PayoutFragment on Payout {
  id
  amount
  createdAt
  description
  sourceType
  status
  arrivalDate
}
    `;
export const RefundFragmentFragmentDoc = gql`
    fragment RefundFragment on Refund {
  id
  amount
  chargeId
  createdAt
  currency
  status
}
    `;
export const PaymentFragmentFragmentDoc = gql`
    fragment PaymentFragment on Payment {
  chargeId
  paymentIntentId
  createdAt
  amount
  status
  bookingId
}
    `;
export const TattooFragmentFragmentDoc = gql`
    fragment TattooFragment on Tattoo {
  id
  createdAt
  updatedAt
  customerId
  title
  description
  style
  color
  imageUrls
  placement
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  createdAt
  updatedAt
  userType
  email
  phone
  name
  stripeAccountId
  hasOnboardedToStripe
  hourlyRate
  consultationFee
}
    `;
export const ArtistFragmentFragmentDoc = gql`
    fragment ArtistFragment on Artist {
  id
  createdAt
  updatedAt
  email
  phone
  name
  stripeAccountId
  hasOnboardedToStripe
  hourlyRate
  consultationFee
}
    `;
export const CustomerCreateBookingDocument = gql`
    mutation customerCreateBooking($input: CustomerCreateBookingInput!) {
  customerCreateBooking(input: $input) {
    booking {
      ...BookingFragment
      customer {
        ...UserFragment
      }
      artist {
        ...UserFragment
      }
    }
    customerInfo {
      isNewCustomer
      isConfirmed
      inviteSent
    }
  }
}
    ${BookingFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export type CustomerCreateBookingMutationFn = Apollo.MutationFunction<CustomerCreateBookingMutation, CustomerCreateBookingMutationVariables>;

/**
 * __useCustomerCreateBookingMutation__
 *
 * To run a mutation, you first call `useCustomerCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCustomerCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [customerCreateBookingMutation, { data, loading, error }] = useCustomerCreateBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCustomerCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CustomerCreateBookingMutation, CustomerCreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CustomerCreateBookingMutation, CustomerCreateBookingMutationVariables>(CustomerCreateBookingDocument, options);
      }
export type CustomerCreateBookingMutationHookResult = ReturnType<typeof useCustomerCreateBookingMutation>;
export type CustomerCreateBookingMutationResult = Apollo.MutationResult<CustomerCreateBookingMutation>;
export type CustomerCreateBookingMutationOptions = Apollo.BaseMutationOptions<CustomerCreateBookingMutation, CustomerCreateBookingMutationVariables>;
export const ArtistCreateBookingDocument = gql`
    mutation artistCreateBooking($input: ArtistCreateBookingInput!) {
  artistCreateBooking(input: $input) {
    ...BookingFragment
  }
}
    ${BookingFragmentFragmentDoc}`;
export type ArtistCreateBookingMutationFn = Apollo.MutationFunction<ArtistCreateBookingMutation, ArtistCreateBookingMutationVariables>;

/**
 * __useArtistCreateBookingMutation__
 *
 * To run a mutation, you first call `useArtistCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArtistCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [artistCreateBookingMutation, { data, loading, error }] = useArtistCreateBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArtistCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<ArtistCreateBookingMutation, ArtistCreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArtistCreateBookingMutation, ArtistCreateBookingMutationVariables>(ArtistCreateBookingDocument, options);
      }
export type ArtistCreateBookingMutationHookResult = ReturnType<typeof useArtistCreateBookingMutation>;
export type ArtistCreateBookingMutationResult = Apollo.MutationResult<ArtistCreateBookingMutation>;
export type ArtistCreateBookingMutationOptions = Apollo.BaseMutationOptions<ArtistCreateBookingMutation, ArtistCreateBookingMutationVariables>;
export const ArtistUpdateBookingStatusDocument = gql`
    mutation artistUpdateBookingStatus($id: ID!, $status: BookingStatus!, $duration: Int) {
  artistUpdateBookingStatus(id: $id, status: $status, duration: $duration) {
    ...BookingFragment
  }
}
    ${BookingFragmentFragmentDoc}`;
export type ArtistUpdateBookingStatusMutationFn = Apollo.MutationFunction<ArtistUpdateBookingStatusMutation, ArtistUpdateBookingStatusMutationVariables>;

/**
 * __useArtistUpdateBookingStatusMutation__
 *
 * To run a mutation, you first call `useArtistUpdateBookingStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArtistUpdateBookingStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [artistUpdateBookingStatusMutation, { data, loading, error }] = useArtistUpdateBookingStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useArtistUpdateBookingStatusMutation(baseOptions?: Apollo.MutationHookOptions<ArtistUpdateBookingStatusMutation, ArtistUpdateBookingStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArtistUpdateBookingStatusMutation, ArtistUpdateBookingStatusMutationVariables>(ArtistUpdateBookingStatusDocument, options);
      }
export type ArtistUpdateBookingStatusMutationHookResult = ReturnType<typeof useArtistUpdateBookingStatusMutation>;
export type ArtistUpdateBookingStatusMutationResult = Apollo.MutationResult<ArtistUpdateBookingStatusMutation>;
export type ArtistUpdateBookingStatusMutationOptions = Apollo.BaseMutationOptions<ArtistUpdateBookingStatusMutation, ArtistUpdateBookingStatusMutationVariables>;
export const CustomerTattoosDocument = gql`
    query customerTattoos {
  customerTattoos {
    ...TattooFragment
    customer {
      ...UserFragment
    }
    consultation {
      ...BookingFragment
      artist {
        ...UserFragment
      }
    }
    sessions {
      ...BookingFragment
      artist {
        ...UserFragment
      }
    }
  }
}
    ${TattooFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${BookingFragmentFragmentDoc}`;

/**
 * __useCustomerTattoosQuery__
 *
 * To run a query within a React component, call `useCustomerTattoosQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerTattoosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerTattoosQuery({
 *   variables: {
 *   },
 * });
 */
export function useCustomerTattoosQuery(baseOptions?: Apollo.QueryHookOptions<CustomerTattoosQuery, CustomerTattoosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerTattoosQuery, CustomerTattoosQueryVariables>(CustomerTattoosDocument, options);
      }
export function useCustomerTattoosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerTattoosQuery, CustomerTattoosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerTattoosQuery, CustomerTattoosQueryVariables>(CustomerTattoosDocument, options);
        }
export function useCustomerTattoosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CustomerTattoosQuery, CustomerTattoosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CustomerTattoosQuery, CustomerTattoosQueryVariables>(CustomerTattoosDocument, options);
        }
export type CustomerTattoosQueryHookResult = ReturnType<typeof useCustomerTattoosQuery>;
export type CustomerTattoosLazyQueryHookResult = ReturnType<typeof useCustomerTattoosLazyQuery>;
export type CustomerTattoosSuspenseQueryHookResult = ReturnType<typeof useCustomerTattoosSuspenseQuery>;
export type CustomerTattoosQueryResult = Apollo.QueryResult<CustomerTattoosQuery, CustomerTattoosQueryVariables>;
export const GenerateStripeConnectOnboardingLinkDocument = gql`
    mutation generateStripeConnectOnboardingLink {
  generateStripeConnectOnboardingLink
}
    `;
export type GenerateStripeConnectOnboardingLinkMutationFn = Apollo.MutationFunction<GenerateStripeConnectOnboardingLinkMutation, GenerateStripeConnectOnboardingLinkMutationVariables>;

/**
 * __useGenerateStripeConnectOnboardingLinkMutation__
 *
 * To run a mutation, you first call `useGenerateStripeConnectOnboardingLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateStripeConnectOnboardingLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateStripeConnectOnboardingLinkMutation, { data, loading, error }] = useGenerateStripeConnectOnboardingLinkMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateStripeConnectOnboardingLinkMutation(baseOptions?: Apollo.MutationHookOptions<GenerateStripeConnectOnboardingLinkMutation, GenerateStripeConnectOnboardingLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateStripeConnectOnboardingLinkMutation, GenerateStripeConnectOnboardingLinkMutationVariables>(GenerateStripeConnectOnboardingLinkDocument, options);
      }
export type GenerateStripeConnectOnboardingLinkMutationHookResult = ReturnType<typeof useGenerateStripeConnectOnboardingLinkMutation>;
export type GenerateStripeConnectOnboardingLinkMutationResult = Apollo.MutationResult<GenerateStripeConnectOnboardingLinkMutation>;
export type GenerateStripeConnectOnboardingLinkMutationOptions = Apollo.BaseMutationOptions<GenerateStripeConnectOnboardingLinkMutation, GenerateStripeConnectOnboardingLinkMutationVariables>;
export const UpdateArtistRatesDocument = gql`
    mutation updateArtistRates($hourlyRate: Int!, $consultationFee: Int!) {
  updateArtistRates(hourlyRate: $hourlyRate, consultationFee: $consultationFee) {
    ...ArtistFragment
  }
}
    ${ArtistFragmentFragmentDoc}`;
export type UpdateArtistRatesMutationFn = Apollo.MutationFunction<UpdateArtistRatesMutation, UpdateArtistRatesMutationVariables>;

/**
 * __useUpdateArtistRatesMutation__
 *
 * To run a mutation, you first call `useUpdateArtistRatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArtistRatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArtistRatesMutation, { data, loading, error }] = useUpdateArtistRatesMutation({
 *   variables: {
 *      hourlyRate: // value for 'hourlyRate'
 *      consultationFee: // value for 'consultationFee'
 *   },
 * });
 */
export function useUpdateArtistRatesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArtistRatesMutation, UpdateArtistRatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArtistRatesMutation, UpdateArtistRatesMutationVariables>(UpdateArtistRatesDocument, options);
      }
export type UpdateArtistRatesMutationHookResult = ReturnType<typeof useUpdateArtistRatesMutation>;
export type UpdateArtistRatesMutationResult = Apollo.MutationResult<UpdateArtistRatesMutation>;
export type UpdateArtistRatesMutationOptions = Apollo.BaseMutationOptions<UpdateArtistRatesMutation, UpdateArtistRatesMutationVariables>;
export const OnboardUserDocument = gql`
    mutation onboardUser($input: OnboardUserInput!) {
  onboardUser(input: $input) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type OnboardUserMutationFn = Apollo.MutationFunction<OnboardUserMutation, OnboardUserMutationVariables>;

/**
 * __useOnboardUserMutation__
 *
 * To run a mutation, you first call `useOnboardUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOnboardUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [onboardUserMutation, { data, loading, error }] = useOnboardUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOnboardUserMutation(baseOptions?: Apollo.MutationHookOptions<OnboardUserMutation, OnboardUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OnboardUserMutation, OnboardUserMutationVariables>(OnboardUserDocument, options);
      }
export type OnboardUserMutationHookResult = ReturnType<typeof useOnboardUserMutation>;
export type OnboardUserMutationResult = Apollo.MutationResult<OnboardUserMutation>;
export type OnboardUserMutationOptions = Apollo.BaseMutationOptions<OnboardUserMutation, OnboardUserMutationVariables>;
export const UserBookingsDocument = gql`
    query userBookings($status: BookingStatus) {
  userBookings(status: $status) {
    ...BookingFragment
    customer {
      ...UserFragment
    }
    artist {
      ...UserFragment
    }
    tattoo {
      ...TattooFragment
    }
  }
}
    ${BookingFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${TattooFragmentFragmentDoc}`;

/**
 * __useUserBookingsQuery__
 *
 * To run a query within a React component, call `useUserBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBookingsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUserBookingsQuery(baseOptions?: Apollo.QueryHookOptions<UserBookingsQuery, UserBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBookingsQuery, UserBookingsQueryVariables>(UserBookingsDocument, options);
      }
export function useUserBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBookingsQuery, UserBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBookingsQuery, UserBookingsQueryVariables>(UserBookingsDocument, options);
        }
export function useUserBookingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserBookingsQuery, UserBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserBookingsQuery, UserBookingsQueryVariables>(UserBookingsDocument, options);
        }
export type UserBookingsQueryHookResult = ReturnType<typeof useUserBookingsQuery>;
export type UserBookingsLazyQueryHookResult = ReturnType<typeof useUserBookingsLazyQuery>;
export type UserBookingsSuspenseQueryHookResult = ReturnType<typeof useUserBookingsSuspenseQuery>;
export type UserBookingsQueryResult = Apollo.QueryResult<UserBookingsQuery, UserBookingsQueryVariables>;
export const UserBookingDocument = gql`
    query userBooking($id: ID!) {
  userBooking(id: $id) {
    ...BookingFragment
    customer {
      ...UserFragment
    }
    artist {
      ...UserFragment
    }
    tattoo {
      ...TattooFragment
    }
  }
}
    ${BookingFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${TattooFragmentFragmentDoc}`;

/**
 * __useUserBookingQuery__
 *
 * To run a query within a React component, call `useUserBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBookingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserBookingQuery(baseOptions: Apollo.QueryHookOptions<UserBookingQuery, UserBookingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBookingQuery, UserBookingQueryVariables>(UserBookingDocument, options);
      }
export function useUserBookingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBookingQuery, UserBookingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBookingQuery, UserBookingQueryVariables>(UserBookingDocument, options);
        }
export function useUserBookingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserBookingQuery, UserBookingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserBookingQuery, UserBookingQueryVariables>(UserBookingDocument, options);
        }
export type UserBookingQueryHookResult = ReturnType<typeof useUserBookingQuery>;
export type UserBookingLazyQueryHookResult = ReturnType<typeof useUserBookingLazyQuery>;
export type UserBookingSuspenseQueryHookResult = ReturnType<typeof useUserBookingSuspenseQuery>;
export type UserBookingQueryResult = Apollo.QueryResult<UserBookingQuery, UserBookingQueryVariables>;
export const ArtistFinancialsDocument = gql`
    query artistFinancials {
  artistFinancials {
    charges {
      ...ChargeFragment
    }
    balance {
      ...BalanceFragment
    }
    payouts {
      ...PayoutFragment
    }
    refunds {
      ...RefundFragment
    }
  }
}
    ${ChargeFragmentFragmentDoc}
${BalanceFragmentFragmentDoc}
${PayoutFragmentFragmentDoc}
${RefundFragmentFragmentDoc}`;

/**
 * __useArtistFinancialsQuery__
 *
 * To run a query within a React component, call `useArtistFinancialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistFinancialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistFinancialsQuery({
 *   variables: {
 *   },
 * });
 */
export function useArtistFinancialsQuery(baseOptions?: Apollo.QueryHookOptions<ArtistFinancialsQuery, ArtistFinancialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistFinancialsQuery, ArtistFinancialsQueryVariables>(ArtistFinancialsDocument, options);
      }
export function useArtistFinancialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistFinancialsQuery, ArtistFinancialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistFinancialsQuery, ArtistFinancialsQueryVariables>(ArtistFinancialsDocument, options);
        }
export function useArtistFinancialsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArtistFinancialsQuery, ArtistFinancialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArtistFinancialsQuery, ArtistFinancialsQueryVariables>(ArtistFinancialsDocument, options);
        }
export type ArtistFinancialsQueryHookResult = ReturnType<typeof useArtistFinancialsQuery>;
export type ArtistFinancialsLazyQueryHookResult = ReturnType<typeof useArtistFinancialsLazyQuery>;
export type ArtistFinancialsSuspenseQueryHookResult = ReturnType<typeof useArtistFinancialsSuspenseQuery>;
export type ArtistFinancialsQueryResult = Apollo.QueryResult<ArtistFinancialsQuery, ArtistFinancialsQueryVariables>;
export const StripeTerminalConnectionTokenDocument = gql`
    query stripeTerminalConnectionToken {
  stripeTerminalConnectionToken
}
    `;

/**
 * __useStripeTerminalConnectionTokenQuery__
 *
 * To run a query within a React component, call `useStripeTerminalConnectionTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useStripeTerminalConnectionTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStripeTerminalConnectionTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useStripeTerminalConnectionTokenQuery(baseOptions?: Apollo.QueryHookOptions<StripeTerminalConnectionTokenQuery, StripeTerminalConnectionTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StripeTerminalConnectionTokenQuery, StripeTerminalConnectionTokenQueryVariables>(StripeTerminalConnectionTokenDocument, options);
      }
export function useStripeTerminalConnectionTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StripeTerminalConnectionTokenQuery, StripeTerminalConnectionTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StripeTerminalConnectionTokenQuery, StripeTerminalConnectionTokenQueryVariables>(StripeTerminalConnectionTokenDocument, options);
        }
export function useStripeTerminalConnectionTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StripeTerminalConnectionTokenQuery, StripeTerminalConnectionTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StripeTerminalConnectionTokenQuery, StripeTerminalConnectionTokenQueryVariables>(StripeTerminalConnectionTokenDocument, options);
        }
export type StripeTerminalConnectionTokenQueryHookResult = ReturnType<typeof useStripeTerminalConnectionTokenQuery>;
export type StripeTerminalConnectionTokenLazyQueryHookResult = ReturnType<typeof useStripeTerminalConnectionTokenLazyQuery>;
export type StripeTerminalConnectionTokenSuspenseQueryHookResult = ReturnType<typeof useStripeTerminalConnectionTokenSuspenseQuery>;
export type StripeTerminalConnectionTokenQueryResult = Apollo.QueryResult<StripeTerminalConnectionTokenQuery, StripeTerminalConnectionTokenQueryVariables>;
export const GetPaymentLinkDocument = gql`
    query getPaymentLink($bookingId: ID!) {
  getPaymentLink(bookingId: $bookingId)
}
    `;

/**
 * __useGetPaymentLinkQuery__
 *
 * To run a query within a React component, call `useGetPaymentLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentLinkQuery({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useGetPaymentLinkQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentLinkQuery, GetPaymentLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentLinkQuery, GetPaymentLinkQueryVariables>(GetPaymentLinkDocument, options);
      }
export function useGetPaymentLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentLinkQuery, GetPaymentLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentLinkQuery, GetPaymentLinkQueryVariables>(GetPaymentLinkDocument, options);
        }
export function useGetPaymentLinkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPaymentLinkQuery, GetPaymentLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentLinkQuery, GetPaymentLinkQueryVariables>(GetPaymentLinkDocument, options);
        }
export type GetPaymentLinkQueryHookResult = ReturnType<typeof useGetPaymentLinkQuery>;
export type GetPaymentLinkLazyQueryHookResult = ReturnType<typeof useGetPaymentLinkLazyQuery>;
export type GetPaymentLinkSuspenseQueryHookResult = ReturnType<typeof useGetPaymentLinkSuspenseQuery>;
export type GetPaymentLinkQueryResult = Apollo.QueryResult<GetPaymentLinkQuery, GetPaymentLinkQueryVariables>;
export const GetPaymentsDocument = gql`
    query getPayments {
  getPayments {
    ...PaymentFragment
    booking {
      ...BookingFragment
    }
  }
}
    ${PaymentFragmentFragmentDoc}
${BookingFragmentFragmentDoc}`;

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
      }
export function useGetPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export function useGetPaymentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentsLazyQuery>;
export type GetPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsSuspenseQuery>;
export type GetPaymentsQueryResult = Apollo.QueryResult<GetPaymentsQuery, GetPaymentsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  user {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const ArtistDocument = gql`
    query artist {
  artist {
    ...ArtistFragment
  }
}
    ${ArtistFragmentFragmentDoc}`;

/**
 * __useArtistQuery__
 *
 * To run a query within a React component, call `useArtistQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistQuery({
 *   variables: {
 *   },
 * });
 */
export function useArtistQuery(baseOptions?: Apollo.QueryHookOptions<ArtistQuery, ArtistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistQuery, ArtistQueryVariables>(ArtistDocument, options);
      }
export function useArtistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistQuery, ArtistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistQuery, ArtistQueryVariables>(ArtistDocument, options);
        }
export function useArtistSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArtistQuery, ArtistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArtistQuery, ArtistQueryVariables>(ArtistDocument, options);
        }
export type ArtistQueryHookResult = ReturnType<typeof useArtistQuery>;
export type ArtistLazyQueryHookResult = ReturnType<typeof useArtistLazyQuery>;
export type ArtistSuspenseQueryHookResult = ReturnType<typeof useArtistSuspenseQuery>;
export type ArtistQueryResult = Apollo.QueryResult<ArtistQuery, ArtistQueryVariables>;
export const PublicArtistProfileDocument = gql`
    query publicArtistProfile($artistId: ID!) {
  publicArtistProfile(artistId: $artistId) {
    ...ArtistFragment
  }
}
    ${ArtistFragmentFragmentDoc}`;

/**
 * __usePublicArtistProfileQuery__
 *
 * To run a query within a React component, call `usePublicArtistProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicArtistProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicArtistProfileQuery({
 *   variables: {
 *      artistId: // value for 'artistId'
 *   },
 * });
 */
export function usePublicArtistProfileQuery(baseOptions: Apollo.QueryHookOptions<PublicArtistProfileQuery, PublicArtistProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicArtistProfileQuery, PublicArtistProfileQueryVariables>(PublicArtistProfileDocument, options);
      }
export function usePublicArtistProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicArtistProfileQuery, PublicArtistProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicArtistProfileQuery, PublicArtistProfileQueryVariables>(PublicArtistProfileDocument, options);
        }
export function usePublicArtistProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PublicArtistProfileQuery, PublicArtistProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PublicArtistProfileQuery, PublicArtistProfileQueryVariables>(PublicArtistProfileDocument, options);
        }
export type PublicArtistProfileQueryHookResult = ReturnType<typeof usePublicArtistProfileQuery>;
export type PublicArtistProfileLazyQueryHookResult = ReturnType<typeof usePublicArtistProfileLazyQuery>;
export type PublicArtistProfileSuspenseQueryHookResult = ReturnType<typeof usePublicArtistProfileSuspenseQuery>;
export type PublicArtistProfileQueryResult = Apollo.QueryResult<PublicArtistProfileQuery, PublicArtistProfileQueryVariables>;
export const CheckIfUserOnboardedDocument = gql`
    query checkIfUserOnboarded($phone: String!) {
  checkIfUserOnboarded(phone: $phone)
}
    `;

/**
 * __useCheckIfUserOnboardedQuery__
 *
 * To run a query within a React component, call `useCheckIfUserOnboardedQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfUserOnboardedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfUserOnboardedQuery({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCheckIfUserOnboardedQuery(baseOptions: Apollo.QueryHookOptions<CheckIfUserOnboardedQuery, CheckIfUserOnboardedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfUserOnboardedQuery, CheckIfUserOnboardedQueryVariables>(CheckIfUserOnboardedDocument, options);
      }
export function useCheckIfUserOnboardedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfUserOnboardedQuery, CheckIfUserOnboardedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfUserOnboardedQuery, CheckIfUserOnboardedQueryVariables>(CheckIfUserOnboardedDocument, options);
        }
export function useCheckIfUserOnboardedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckIfUserOnboardedQuery, CheckIfUserOnboardedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckIfUserOnboardedQuery, CheckIfUserOnboardedQueryVariables>(CheckIfUserOnboardedDocument, options);
        }
export type CheckIfUserOnboardedQueryHookResult = ReturnType<typeof useCheckIfUserOnboardedQuery>;
export type CheckIfUserOnboardedLazyQueryHookResult = ReturnType<typeof useCheckIfUserOnboardedLazyQuery>;
export type CheckIfUserOnboardedSuspenseQueryHookResult = ReturnType<typeof useCheckIfUserOnboardedSuspenseQuery>;
export type CheckIfUserOnboardedQueryResult = Apollo.QueryResult<CheckIfUserOnboardedQuery, CheckIfUserOnboardedQueryVariables>;
export const ExistingCustomerDocument = gql`
    query existingCustomer($phone: String!) {
  existingCustomer(phone: $phone) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useExistingCustomerQuery__
 *
 * To run a query within a React component, call `useExistingCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useExistingCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExistingCustomerQuery({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useExistingCustomerQuery(baseOptions: Apollo.QueryHookOptions<ExistingCustomerQuery, ExistingCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExistingCustomerQuery, ExistingCustomerQueryVariables>(ExistingCustomerDocument, options);
      }
export function useExistingCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExistingCustomerQuery, ExistingCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExistingCustomerQuery, ExistingCustomerQueryVariables>(ExistingCustomerDocument, options);
        }
export function useExistingCustomerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExistingCustomerQuery, ExistingCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExistingCustomerQuery, ExistingCustomerQueryVariables>(ExistingCustomerDocument, options);
        }
export type ExistingCustomerQueryHookResult = ReturnType<typeof useExistingCustomerQuery>;
export type ExistingCustomerLazyQueryHookResult = ReturnType<typeof useExistingCustomerLazyQuery>;
export type ExistingCustomerSuspenseQueryHookResult = ReturnType<typeof useExistingCustomerSuspenseQuery>;
export type ExistingCustomerQueryResult = Apollo.QueryResult<ExistingCustomerQuery, ExistingCustomerQueryVariables>;