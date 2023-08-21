import { theme } from './theme';
import { defaultDayNames, defaultMonthNames } from './data';

export let activeColor = theme.colors.primary900;

export const setActiveColor = (color: string) => {
  activeColor = color;
};

export let defaultTimeSlotWidth = 96;

export const setTimeSlotWidth = (width: number) => {
  defaultTimeSlotWidth = width;
};

export let dayNames = defaultDayNames;

export const setDayNames = (value: string[]) => {
  dayNames = value;
};

export let monthNames = defaultMonthNames;

export const setMonthNames = (value: string[]) => {
  monthNames = value;
};
