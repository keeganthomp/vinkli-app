import { View, Text, Pressable } from 'react-native';

type DayProps = {
  date?: number;
  onPress?: (date: number) => void;
  isSelected?: boolean;
};

type DayGridProps = {
  currentMonth: number;
  currentYear: number;
  onDateSelected?: (date: Date) => void;
  selectedDates?: Date | Date[];
};

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
            width: '60%',
            height: '60%',
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
  onDateSelected,
  selectedDates,
}: DayGridProps) => {
  const totalDays: number = getDaysInMonth(currentMonth, currentYear);
  const firstDay: number = getFirstDayOfMonth(currentMonth, currentYear);

  const handleDateSelected = (date: number): void => {
    if (!onDateSelected) return;
    onDateSelected(new Date(currentYear, currentMonth, date));
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

  let days: JSX.Element[] = [];

  // Fill in the blanks for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<CalendarDay key={`empty-${i}`} />);
  }

  // Fill in the actual days of the month
  for (let date = 1; date <= totalDays; date++) {
    days.push(
      <CalendarDay
        key={date}
        date={date}
        isSelected={checkIfDateIsSelected(date)}
        onPress={handleDateSelected}
      />,
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {days}
    </View>
  );
};

export default DayGrid;
