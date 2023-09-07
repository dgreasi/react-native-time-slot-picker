import * as React from 'react';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  IAppointment,
  TimeSlotPicker,
} from '@dgreasi/react-native-time-slot-picker';
import { bookedData, dummyAvailableDates } from './data';
import { SelectedTimeSlot } from './SelectedTimeSlot';

export default function App() {
  const [dateOfAppointment, setDateOfAppointment] =
    useState<IAppointment | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <TimeSlotPicker
          availableDates={dummyAvailableDates}
          setDateOfAppointment={setDateOfAppointment}
          scheduledAppointment={bookedData}
          // marginTop={24}
          // datePickerBackgroundColor="#F4CC58"
          // timeSlotsBackgroundColor="#F4CC58"
          // mainColor="#B4CC51"
          // timeSlotWidth={116}
          // dayNamesOverride={greekDayNames}
          // monthNamesOverride={greekMonthNames}
        />
        <SelectedTimeSlot dateOfAppointment={dateOfAppointment} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
