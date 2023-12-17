import * as React from 'react';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  IAppointment,
  TimeSlotPicker,
} from '@dgreasi/react-native-time-slot-picker';
import { SelectedTimeSlot } from './SelectedTimeSlot';
import { bookedData, dummyAvailableDates } from './data';

export default function App() {
  const [scheduledAppointments, setScheduledAppointments] = useState<
    IAppointment[]
  >([bookedData]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <TimeSlotPicker
          scheduledAppointments={scheduledAppointments}
          setScheduledAppointments={setScheduledAppointments}
          availableDates={dummyAvailableDates}
          multipleSelection
          // marginTop={24}
          // datePickerBackgroundColor="#F4CC58"
          // timeSlotsBackgroundColor="#F4CC58"
          // mainColor="#B4CC51"
          // timeSlotWidth={116}
          // dayNamesOverride={greekDayNames}
          // monthNamesOverride={greekMonthNames}
          // dayNamesOverride={spanishDayNames}
          // monthNamesOverride={spanishMonthNames}
        />
        <SelectedTimeSlot scheduledAppointments={scheduledAppointments ?? []} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
