import React, { useCallback, useMemo } from 'react';
import { IAvailableDates } from '../interfaces/app.interface';
import CalendarDay from './CalendarDay';

interface ScheduleDateElementProps {
  slotDate: IAvailableDates;
  selectedDate?: IAvailableDates;
  onPress: () => void;
  currentDay: number;
  appointmentDay: number;
}

const ScheduleDateElement = ({
  slotDate,
  onPress,
  selectedDate,
  currentDay,
  appointmentDay,
}: ScheduleDateElementProps) => {
  const day = useMemo(() => new Date(slotDate.date).getDate(), [slotDate.date]);
  const isAppointmentToday = useMemo(
    () => appointmentDay === day,
    [appointmentDay, day]
  );

  const isSelected = useCallback(() => {
    return slotDate.date === selectedDate?.date;
  }, [slotDate.date, selectedDate?.date]);

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
