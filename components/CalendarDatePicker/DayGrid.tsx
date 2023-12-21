import { View, Text, Pressable } from 'react-native';
import { useMemo } from 'react';

type DayProps = {
  date?: number;
  onPress?: (date: number) => void;
  isSelected?: boolean;
};

type DayGridProps = {
  currentMonth: number;
  currentYear: number;
  onDateSelect?: (date: Date) => void;
  selectedDates?: Date | Date[];
};

const DAYS_IN_WEEK = 7;
const MAX_ROWS = 6;
const MAX_DAYS_ARR = Array.from(Array(DAYS_IN_WEEK * MAX_ROWS).keys());

// utils
const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};
const getFirstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

// the component for each day square
const CalendarDay = ({ date, onPress, isSelected }: DayProps) => {
  const handlePress = (): void => {
    if (!onPress || !date) return;
    onPress(date);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: '14.28%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {date && (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 28,
            height: 28,
            borderRadius: 100,
            backgroundColor: isSelected ? '#333' : 'transparent',
          }}
        >
          <Text
            style={{
              color: isSelected ? 'white' : '#333',
              fontSize: 14,
            }}
          >
            {date}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const DayGrid = ({
  currentMonth,
  currentYear,
  onDateSelect,
  selectedDates,
}: DayGridProps) => {
  const totalDays: number = getDaysInMonth(currentMonth, currentYear);
  const firstDay: number = getFirstDayOfMonth(currentMonth, currentYear);

  const handleDateSelected = (date: number): void => {
    if (!onDateSelect) return;
    onDateSelect(new Date(currentYear, currentMonth, date));
  };

  const checkIfDateIsSelected = (date: number): boolean => {
    if (!selectedDates) return false;
    if (Array.isArray(selectedDates)) {
      return selectedDates.some(
        (selectedDate) =>
          selectedDate.getDate() === date &&
          selectedDate.getMonth() === currentMonth &&
          selectedDate.getFullYear() === currentYear,
      );
    } else {
      return (
        selectedDates.getDate() === date &&
        selectedDates.getMonth() === currentMonth &&
        selectedDates.getFullYear() === currentYear
      );
    }
  };

  const days = useMemo(() => {
    let tempDays: JSX.Element[] = [];

    // Fill in the blanks for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      tempDays.push(<CalendarDay key={`empty-${i}`} />);
    }

    // Fill in the actual days of the month
    for (let date = 1; date <= totalDays; date++) {
      tempDays.push(
        <CalendarDay
          key={date}
          date={date}
          isSelected={checkIfDateIsSelected(date)}
          onPress={handleDateSelected}
        />,
      );
    }

    return tempDays;
  }, [totalDays, firstDay, checkIfDateIsSelected, handleDateSelected]);

  return (
    <View
      style={{
        // display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        // height: 300,
      }}
    >
      {days}
    </View>
  );
};

export default DayGrid;
