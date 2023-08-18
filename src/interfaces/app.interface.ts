export interface IAvailableDates {
  day: number; // new Date().getDate() => int between 1 and 31
  slotDate: string; // new Date().toDateString()
  slotTimes: string[];
}

export interface IAppointment {
  appointmentDate: string;
  appointmentTime: string;
}
