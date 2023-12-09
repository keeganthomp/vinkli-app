type GenTimeArgs = {
  minHour?: number;
  maxHour?: number;
  interval?: 'hour' | '15min' | '30min';
  includeMaxHour?: boolean;
};

export type TimeOption = {
  displayTime: string;
  value: string;
};

export const generateTimeOptions = ({
  minHour = 0,
  maxHour = 23,
  interval = 'hour',
  includeMaxHour = true,
}: GenTimeArgs = {}): TimeOption[] => {
  const options: TimeOption[] = [];
  const intervalMinutes =
    interval === '15min' ? 15 : interval === '30min' ? 30 : 60;

  let startMinute = 0;

  const minHourLimit = minHour < 0 ? 0 : minHour;
  const maxHourLimit = maxHour > 23 ? 23 : maxHour;

  for (let hour = minHourLimit; hour <= maxHourLimit; hour++) {
    if (!includeMaxHour && hour === maxHourLimit) {
      break;
    }

    const isAM = hour < 12;
    let displayHour = hour % 12;
    displayHour = displayHour === 0 ? 12 : displayHour; // Convert 0 to 12 for display

    for (let minute = startMinute; minute < 60; minute += intervalMinutes) {
      if (hour === maxHourLimit && minute !== 0) continue;

      const displayTime = `${String(displayHour).padStart(1, '0')}:${String(
        minute,
      ).padStart(2, '0')} ${isAM ? 'AM' : 'PM'}`;

      const dateValue = new Date();
      dateValue.setHours(hour, minute, 0, 0); // Set hours and minutes for the date object
      // get the time string from date
      const utcTimeString = dateValue.toISOString().split('T')[1];
      options.push({ displayTime, value: utcTimeString });
    }

    // Reset startMinute to 0 after the first iteration
    startMinute = 0;
  }

  return options;
};
