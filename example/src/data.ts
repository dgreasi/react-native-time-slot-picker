import type { IAvailableDates } from '@dgreasi/react-native-time-slot-picker';

const fixedSlotTimes = [
  '00:00-01:00',
  '01:00-02:00',
  '02:00-03:00',
  '03:00-04:00',
  '04:00-05:00',
  '05:00-06:00',
  '06:00-07:00',
  '07:00-08:00',
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
  '21:00-22:00',
  '23:00-00:00',
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
      slotTimes: [
        fixedSlotTimes[8],
        fixedSlotTimes[9],
        fixedSlotTimes[10],
        fixedSlotTimes[11],
        fixedSlotTimes[12],
        fixedSlotTimes[13],
        fixedSlotTimes[14],
        fixedSlotTimes[15],
        fixedSlotTimes[16],
        fixedSlotTimes[17],
        fixedSlotTimes[18],
        fixedSlotTimes[19],
        fixedSlotTimes[20],
        fixedSlotTimes[21],
      ],
    };
    // @ts-ignore
    dates.push(day);
  }

  return dates;
};

const getDummyAvailableDates = (): IAvailableDates[] => {
  const dates = getFixedAvailableDates();
  // Change slot time in one day
  // @ts-ignore
  dates[1].slotTimes = ['10:00-11:00', '11:00-12:00', '14:00-15:00'];
  // Create days with no availability
  // @ts-ignore
  dates[4].slotTimes = [];
  // @ts-ignore
  dates[10].slotTimes = [];

  return dates;
};

export const fixedAvailableDates: IAvailableDates[] = getFixedAvailableDates();
export const dummyAvailableDates: IAvailableDates[] = getDummyAvailableDates();

export const bookedData = {
  appointmentDate: getNextDays(2).toDateString(),
  appointmentTime: fixedAvailableDates?.[0]?.slotTimes?.[2] || '11:00-12:00',
};

export const greekDayNames = ['Κ', 'Δ', 'Τρ', 'Τετ', 'Π', 'Παρ', 'Σ'];

export const greekMonthNames = [
  'Ιανουάριος',
  'Φεβρουάριος',
  'Μάρτιος',
  'Απρίλιος',
  'Μάϊος',
  'Ιούνιος',
  'Ιούλιος',
  'Αύγουστος',
  'Σεπτέμβριος',
  'Οκτώβριος',
  'Νοέμβριος',
  'Δεκέμβριος',
];
