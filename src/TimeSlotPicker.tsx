import React, { useMemo, useState } from 'react';
import { IAppointment, IAvailableDates } from './interfaces/app.interface';
import { View } from 'react-native';
import ScheduleDatePicker from './components/ScheduleDatePicker';
import TimeSlots from './components/TimeSlots';
import { fixedAvailableDates } from './utils/dateHelpers';
import {
  defaultActiveColor,
  defaultDayNames,
  defaultMonthNames,
  defaultTimeSlotWidth,
} from './utils/data';
import { LocalContext } from './components/LocalContext';

interface Props {
  availableDates?: IAvailableDates[];
  scheduledAppointments?: IAppointment[];
  setScheduledAppointments: (data: IAppointment[]) => void;
  multipleSelection?: boolean;
  multipleSelectionStrategy?:
    | 'consecutive'
    | 'same-day-consecutive'
    | 'non-consecutive';
  marginTop?: number;
  datePickerBackgroundColor?: string;
  timeSlotsBackgroundColor?: string;
  timeSlotsTitle?: string;
  mainColor?: string;
  timeSlotWidth?: number;
  dayNamesOverride?: string[];
  monthNamesOverride?: string[];
}

const TimeSlotPicker = ({
  availableDates = fixedAvailableDates,
  scheduledAppointments,
  setScheduledAppointments,
  multipleSelection = false,
  multipleSelectionStrategy = 'non-consecutive',
  marginTop = 0,
  datePickerBackgroundColor,
  timeSlotsBackgroundColor,
  timeSlotsTitle,
  mainColor = defaultActiveColor,
  timeSlotWidth = defaultTimeSlotWidth,
  dayNamesOverride = defaultDayNames,
  monthNamesOverride = defaultMonthNames,
}: Props) => {
  const sortedAppointments = useMemo(() => {
    return scheduledAppointments?.sort((a, b) => {
      return (
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime()
      );
    });
  }, [scheduledAppointments]);
  const sortedAvailableDates = useMemo(() => {
    return availableDates.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [availableDates]);

  const [selectedDay, setSelectedDay] = useState<string>(
    sortedAppointments && sortedAppointments[0]
      ? sortedAppointments[0].appointmentDate
      : sortedAvailableDates && sortedAvailableDates[0]
      ? sortedAvailableDates[0].date
      : ''
  );

  return (
    <LocalContext
      slotDate={selectedDay}
      scheduledAppointments={scheduledAppointments}
      overrideData={{
        mainColor,
        timeSlotWidth,
        dayNamesOverride,
        monthNamesOverride,
      }}
    >
      <View style={{ marginTop }}>
        <View>
          <ScheduleDatePicker
            selectedDay={selectedDay}
            availableDates={availableDates}
            setSelectedDay={setSelectedDay}
            scheduledAppointments={scheduledAppointments}
            backgroundColor={datePickerBackgroundColor}
          />
        </View>
        {selectedDay && (
          <TimeSlots
            title={timeSlotsTitle}
            selectedDay={selectedDay}
            slotTimes={
              availableDates.find((data) => data.date === selectedDay)
                ?.slotTimes || []
            }
            availableDates={availableDates}
            scheduledAppointments={scheduledAppointments}
            setScheduledAppointments={setScheduledAppointments}
            multipleSelection={multipleSelection}
            multipleSelectionStrategy={multipleSelectionStrategy}
            backgroundColor={timeSlotsBackgroundColor}
          />
        )}
      </View>
    </LocalContext>
  );
};

export default TimeSlotPicker;
