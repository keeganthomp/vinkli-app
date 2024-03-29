import { registerSheet } from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';

import BookingFiltersSheet from './BookingFilterSheet';

import ArtistPostBookingSheet from './ArtistPostBookingSheet';

import DateAndTimeSheet from './DateAndTimeSelectSheet';
import AppointmentTypeSheet from './AppointmentTypeSelectSheet';
import TattooStyleSheet from './TattooStyleSelectSheet';
import TattooColorSheet from './TattooColorSelectSheet';

import SetupPaymentsSheet from './SetupPaymentsSheet';

// register sheets to be used by sheet manager
registerSheet(sheetIds.appointmentTypeSelect, AppointmentTypeSheet);
registerSheet(sheetIds.dateAndTimeSelect, DateAndTimeSheet);
registerSheet(sheetIds.bookingFilters, BookingFiltersSheet);
registerSheet(sheetIds.tattooStyleSelect, TattooStyleSheet);
registerSheet(sheetIds.tattooColorSelect, TattooColorSheet);
registerSheet(sheetIds.artistPostBookingSheet, ArtistPostBookingSheet);
registerSheet(sheetIds.setupPaymentsSheet, SetupPaymentsSheet);

export {};
