import React, { useState } from 'react';
import { View } from 'react-native';
import DayGrid from './DayGrid';
import MonthBar from './MonthBar';
import Button from '@components/Button';

type Props = {
  onDateSelect?: (date: Date) => void;
  selectedDates?: Date | Date[];
  hideMonthNav?: boolean;
};

const CalendarPicker = ({
  onDateSelect,
  selectedDates,
  hideMonthNav,
}: Props) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );

  const goToNextMonth = (): void => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };
  const goToPreviousMonth = (): void => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  return (
    <View>
      <MonthBar
        hideMonthNav={hideMonthNav}
        currentMonth={currentMonth}
        currentYear={currentYear}
        goToNextMonth={goToNextMonth}
        goToPreviousMonth={goToPreviousMonth}
      />
      <DayGrid
        currentMonth={currentMonth}
        currentYear={currentYear}
        onDateSelect={onDateSelect}
        selectedDates={selectedDates}
      />
    </View>
  );
};

export default CalendarPicker;
