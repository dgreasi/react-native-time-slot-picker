import { useEffect } from 'react';
import {
  setActiveColor,
  setDayNames,
  setMonthNames,
  setTimeSlotWidth,
} from './store';

export const useArgs = (
  mainColor: string,
  timeSlotWidth: number,
  dayNamesOverride: string[],
  monthNamesOverride: string[]
) => {
  useEffect(() => {
    setActiveColor(mainColor);
  }, [mainColor]);

  useEffect(() => {
    setTimeSlotWidth(timeSlotWidth);
  }, [timeSlotWidth]);

  useEffect(() => {
    setDayNames(dayNamesOverride);
  }, [dayNamesOverride]);

  useEffect(() => {
    setMonthNames(monthNamesOverride);
  }, [monthNamesOverride]);
};
