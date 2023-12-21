import React, { useRef, useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  RouteScreenProps,
  Route,
  SheetProps,
} from 'react-native-actions-sheet';
import sheetIds from '@const/sheets';
import CalendarPicker from '@components/CalendarDatePicker';
import TimePicker from '@components/TimePicker';
import NextButton from '@components/NextButton';
import { Entypo } from '@expo/vector-icons';
import { TimeOption } from '@utils/time';
import moment from 'moment';

const DatePickerSheet = ({ router, payload }: RouteScreenProps) => {
  const { selectDate: setFormValue, selectedDate: formValue } = payload;
  const [selectedDate, setSelectedDates] = useState<Date>(formValue);

  const handleDateSelect = (date: Date) => {
    setFormValue(date);
    setSelectedDates(date);
  };

  return (
    <View
      style={{
        height: 385,
        paddingTop: 14,
      }}
    >
      <CalendarPicker
        onDateSelect={handleDateSelect}
        selectedDates={selectedDate}
      />
      <NextButton
        style={{
          position: 'absolute',
          bottom: 0,
        }}
        disabled={!selectedDate}
        label="Select Time"
        onPress={() => router.navigate('time-select')}
      />
    </View>
  );
};

const TimePickerSheet = ({ router, payload }: RouteScreenProps) => {
  const { selectTime: setFormValue, selectedTime: formValue, selectedDate } = payload;
  const [selectedTime, setSelectedTime] = useState<TimeOption>(formValue);

  const handleTimeSelect = (time: TimeOption) => {
    setFormValue(time);
    setSelectedTime(time);
  };

  return (
    <View
      style={{
        height: 385,
      }}
    >
      {/* Header bar */}
      <View
        style={{
          paddingVertical: 14,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Pressable
          onPress={() => router.goBack()}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            width: 75,
          }}
        >
          <Entypo name="chevron-thin-left" size={11} color="#333" />
          <Text
            style={{
              color: '#333',
              fontSize: 12,
              fontWeight: '300',
              paddingLeft: 2
            }}
          >
            Date
          </Text>
        </Pressable>
        <Text
          style={{
            color: '#333',
            fontSize: 12,
            fontWeight: '300',
            
          }}
        >
         {moment(selectedDate).format('LL')}
        </Text>
        <View style={{ width: 75 }} />
      </View>
      <TimePicker selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 20,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <NextButton
          disabled={!selectedTime}
          label="Confrim Time"
          onPress={() => router.close()}
        />
      </View>
    </View>
  );
};

const sheetRoutes: Route[] = [
  {
    name: 'date-select',
    component: DatePickerSheet,
  },
  {
    name: 'time-select',
    component: TimePickerSheet,
  },
];

const DateAndTimeSheet = (props: SheetProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { payload } = props;
  const isSelectingTime = payload?.isSelectingTime;
  const initialRoute = isSelectingTime ? 'time-select' : 'date-select';
  return (
    <ActionSheet
      id={sheetIds.dateAndTimeSelect}
      ref={actionSheetRef}
      isModal={false}
      defaultOverlayOpacity={0.3}
      routes={sheetRoutes}
      payload={props.payload}
      gestureEnabled={false}
      containerStyle={{
        paddingHorizontal: 12,
        paddingBottom: 40,
      }}
      enableRouterBackNavigation={true}
      initialRoute={initialRoute}
      springOffset={50}
    />
  );
};

export default DateAndTimeSheet;
