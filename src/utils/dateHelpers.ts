import { type IAvailableDates } from '../interfaces/app.interface';

const fixedSlotTimes = [
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
];

const getNextDays = (daysToAdd: number, currentDate = new Date()) => {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + daysToAdd);
  return nextDate;
};

const getFixedAvailableDates = (): IAvailableDates[] => {
  const dates: IAvailableDates[] = [];

  for (let i = 0; i < 20; i++) {
    const day = {
      day: getNextDays(i).getDate(),
      slotDate: getNextDays(i).toDateString(),
      slotTimes: fixedSlotTimes,
    };
    dates.push(day);
  }

  return dates;
};

export const fixedAvailableDates: IAvailableDates[] = getFixedAvailableDates();
