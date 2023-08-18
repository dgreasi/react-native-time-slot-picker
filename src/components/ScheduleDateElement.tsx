import React, { useCallback } from 'react';
import { IAvailableDates } from '../interfaces/app.interface';
import CalendarDay from './CalendarDay';

interface ScheduleDateElementProps {
  date: IAvailableDates;
  selectedDate?: IAvailableDates;
  onPress: () => void;
  currentDay: number;
  appointmentDay: number;
}

const ScheduleDateElement = ({
  date,
  onPress,
  selectedDate,
  currentDay,
  appointmentDay,
}: ScheduleDateElementProps) => {
  const day = new Date(date.slotDate).getDate();
  const isAppointmentToday = appointmentDay === day;

  const isSelected = useCallback(() => {
    return date.slotDate === selectedDate?.slotDate;
  }, [date.slotDate, selectedDate?.slotDate]);

  return (
    <CalendarDay
      disabled={date.slotTimes.length === 0}
      onPress={onPress}
      date={new Date(date.slotDate)}
      isSelected={isSelected()}
      isToday={currentDay === day}
      hasAppointments={isAppointmentToday}
    />
  );
};

export default ScheduleDateElement;
