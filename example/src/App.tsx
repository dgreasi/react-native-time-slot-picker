import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  IAppointment,
  TimeSlotPicker,
} from '@dgreasi/react-native-time-slot-picker';
import { bookedData, dummyAvailableDates } from './data';

export default function App() {
  const [dateOfAppointment, setDateOfAppointment] =
    useState<IAppointment | null>(null);

  useEffect(() => {
    console.log('Date of appointment updated: ', dateOfAppointment);
  }, [dateOfAppointment]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TimeSlotPicker
          availableDates={dummyAvailableDates}
          setDateOfAppointment={setDateOfAppointment}
          scheduledAppointment={bookedData}
          // marginTop={24}
          // datePickerBackgroundColor="#F4CC58"
          // timeSlotsBackgroundColor="#F4CC58"
          mainColor="#B4CC51"
          // timeSlotWidth={116}
          // dayNamesOverride={greekDayNames}
          // monthNamesOverride={greekMonthNames}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
