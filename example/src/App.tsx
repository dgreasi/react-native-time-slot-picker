import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  IAppointment,
  TimeSlotPicker,
} from '@dgreasi/react-native-time-slot-picker';
import { SelectedTimeSlot } from './SelectedTimeSlot';
import { generateAvailableDates } from '../../src/utils/availableSlots';

export default function App() {
  const [scheduledAppointments, setScheduledAppointments] = useState<
    IAppointment[] | undefined
  >();
  const dummyAvailableDates = React.useMemo(() => {
    return generateAvailableDates(3, 30);
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <TimeSlotPicker
            scheduledAppointments={scheduledAppointments}
            setScheduledAppointments={setScheduledAppointments}
            availableDates={dummyAvailableDates}
            multipleSelection
            multipleSelectionStrategy="consecutive"
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
          <SelectedTimeSlot
            scheduledAppointments={scheduledAppointments ?? []}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    minHeight: '100%',
  },
});
