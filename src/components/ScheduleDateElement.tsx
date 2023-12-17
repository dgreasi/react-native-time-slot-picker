import React, { useCallback, useMemo } from 'react';
import { IAvailableDates } from '../interfaces/app.interface';
import CalendarDay from './CalendarDay';

interface ScheduleDateElementProps {
  slotDate: IAvailableDates;
  selectedDay: string;
  currentDay: number;
  onPress: () => void;
  appointmentDays: number[];
}

const ScheduleDateElement = ({
  slotDate,
  selectedDay,
  currentDay,
  onPress,
  appointmentDays,
}: ScheduleDateElementProps) => {
  const day = useMemo(() => new Date(slotDate.date).getDate(), [slotDate.date]);
  const isAppointmentToday = useMemo(
    () => appointmentDays.find((data) => data === day) && day,
    [appointmentDays, day]
  );

  const isSelected = useCallback(() => {
    return slotDate.date === selectedDay;
  }, [slotDate.date, selectedDay]);

  return (
    <CalendarDay
      disabled={slotDate.slotTimes.length === 0}
      onPress={onPress}
      date={slotDate.date}
      isSelected={isSelected()}
      isToday={currentDay === day}
      hasAppointments={isAppointmentToday}
    />
  );
};

export default ScheduleDateElement;
