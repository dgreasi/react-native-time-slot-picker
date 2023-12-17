import React, { useEffect, useState } from 'react';
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
  setScheduledAppointments: (data: IAppointment[] | null) => void;
  multipleSelection?: boolean;
  multipleSelectionStrategy?: 'consecutive' | 'non-consecutive';
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
  const [selectedDay, setSelectedDay] = useState<string>(
    scheduledAppointments && 
    scheduledAppointments.length > 0 ? 
    scheduledAppointments.sort((a, b) => {
      return new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime();
    })[0].appointmentDate : 
    availableDates.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })[0].date
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
            slotTimes={availableDates.find((data) => data.date === selectedDay)?.slotTimes || []}
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
