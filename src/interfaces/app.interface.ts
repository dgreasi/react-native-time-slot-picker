export interface IAvailableDates {
  date: string; // new Date().toISOString()
  slotTimes: string[];
}

export interface IAppointment {
  appointmentDate: string;
  appointmentTime: string;
}
