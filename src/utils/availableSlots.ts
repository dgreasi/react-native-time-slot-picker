import { IAvailableDates } from '@dgreasi/react-native-time-slot-picker';

function generateTimeSlots(startDate: Date, slotLength: number): string[] {
  let times: string[] = []; // time array
  let tt =
    Math.ceil(startDate.getMinutes() / slotLength) * slotLength +
    startDate.getHours() * 60; // start time

  // loop to increment the time and push results in array
  for (let i = 0; tt < 24 * 60; i++) {
    let hhStart = Math.floor(tt / 60) % 24; // getting hours of day in 0-24 format
    let mmStart = tt % 60; // getting minutes of the hour in 0-59 format
    let hhEnd = Math.floor((tt + slotLength) / 60) % 24;
    let mmEnd = (tt + slotLength) % 60;

    times[i] =
      ('0' + hhStart).slice(-2) +
      ':' +
      ('0' + mmStart).slice(-2) +
      '-' +
      ('0' + hhEnd).slice(-2) +
      ':' +
      ('0' + mmEnd).slice(-2);
    tt = tt + slotLength;
  }

  return times;
}

export function generateAvailableDates(
  numDays: number,
  slotLength: number
): IAvailableDates[] {
  let availableDates: IAvailableDates[] = [];
  let currentDate = new Date();
  // Garantee that the time is 0:00:00
  currentDate.setHours(0, 0, 0, 0);

  // Generate the list of time slots starting from the current time
  for (let i = 0; i < numDays; i++) {
    let slotTimes = generateTimeSlots(currentDate, slotLength);
    let dateStr = currentDate.toISOString();
    availableDates.push({ date: dateStr, slotTimes: slotTimes });

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0); // Reset time to the start of the next day
  }

  return availableDates;
}
