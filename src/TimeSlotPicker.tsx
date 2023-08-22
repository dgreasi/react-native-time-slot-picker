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
  availableDates: IAvailableDates[];
  setDateOfAppointment: (data: IAppointment | null) => void;
  scheduledAppointment?: IAppointment | undefined;
  marginTop?: number;
  datePickerBackgroundColor?: string;
  timeSlotsBackgroundColor?: string;
  timeSlotsTitle?: string;
  mainColor?: string;
  timeSlotWidth?: number;
  dayNamesOverride?: string[];
  monthNamesOverride?: string[];
}

// TODO: Remove default value from `availableDates`

const TimeSlotPicker = ({
  availableDates = fixedAvailableDates,
  setDateOfAppointment,
  scheduledAppointment,
  marginTop = 0,
  datePickerBackgroundColor,
  timeSlotsBackgroundColor,
  timeSlotsTitle,
  mainColor = defaultActiveColor,
  timeSlotWidth = defaultTimeSlotWidth,
  dayNamesOverride = defaultDayNames,
  monthNamesOverride = defaultMonthNames,
}: Props) => {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<IAvailableDates | undefined>(
    availableDates[0]
  );

  useEffect(() => {
    // Get first day with available appointments
    const firstAvailableDay =
      availableDates.findIndex((date) => date.slotTimes.length > 0) || 0;
    setSelectedDate(availableDates?.[firstAvailableDay]);
    setSelectedTime(availableDates?.[firstAvailableDay]?.slotTimes?.[0] || '');
  }, [availableDates]);

  // If any changes on date and time selected update data of appointment
  useEffect(() => {
    if (selectedDate && selectedTime) {
      setDateOfAppointment({
        appointmentDate: selectedDate.slotDate,
        appointmentTime: selectedTime,
      });
    } else {
      setDateOfAppointment(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedTime]);

  return (
    <LocalContext
      slotDate={selectedDate?.slotDate || ''}
      scheduledAppointment={scheduledAppointment}
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
            selectedDate={selectedDate}
            availableDates={availableDates}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            scheduledAppointment={scheduledAppointment}
            backgroundColor={datePickerBackgroundColor}
          />
        </View>
        {selectedDate && (
          <TimeSlots
            title={timeSlotsTitle}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            slotTimes={selectedDate.slotTimes}
            backgroundColor={timeSlotsBackgroundColor}
          />
        )}
      </View>
    </LocalContext>
  );
};

export default TimeSlotPicker;
