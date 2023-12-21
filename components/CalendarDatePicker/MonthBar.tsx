import { View, Pressable, Text } from 'react-native';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import theme from '@theme';

const ICON_SIZE = 24;

type Props = {
  currentMonth: number;
  currentYear: number;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  hideMonthNav?: boolean;
};

const MonthNavIcon = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => (
  <Pressable
    style={{
      backgroundColor: theme.accentGray + '70',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
      borderRadius: 8,
    }}
    onPress={onPress}
  >
    {children}
  </Pressable>
);

// util to format month and year
const formatMonth = (month: number): string => {
  return moment().month(month).format('MMMM');
};
const formatYear = (year: number): string => {
  return moment().year(year).format('YYYY');
};

const MonthBar = ({
  currentMonth,
  currentYear,
  goToNextMonth,
  goToPreviousMonth,
  hideMonthNav = false,
}: Props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 30,
      }}
    >
      {!hideMonthNav && (
        <MonthNavIcon onPress={goToPreviousMonth}>
          <Entypo name="chevron-small-left" size={ICON_SIZE} color="black" />
        </MonthNavIcon>
      )}
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
        }}
      >{`${formatMonth(currentMonth)} ${formatYear(currentYear)}`}</Text>
      {!hideMonthNav && (
        <MonthNavIcon onPress={goToNextMonth}>
          <Entypo name="chevron-small-right" size={ICON_SIZE} color="black" />
        </MonthNavIcon>
      )}
    </View>
  );
};

export default MonthBar;
