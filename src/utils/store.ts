import { theme } from './theme';

export let activeColor = theme.colors.primary900;

export const setActiveColor = (color: string) => {
  activeColor = color;
};

export let defaultTimeSlotWidth = 96;

export const setTimeSlotWidth = (width: number) => {
  defaultTimeSlotWidth = width;
};
