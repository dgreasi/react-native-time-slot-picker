import * as React from 'react';
import { createContext } from 'react';
import { IAppointment } from '@dgreasi/react-native-time-slot-picker';

export const SelectedDateContext = createContext<string>('');
export const ScheduledAppointmentContext = createContext<
  IAppointment | undefined
>(undefined);

interface Props {
  children: React.ReactNode;
  slotDate: string;
  scheduledAppointment: IAppointment | undefined;
}

export const LocalContext = ({
  children,
  slotDate,
  scheduledAppointment,
}: Props) => {
  return (
    <SelectedDateContext.Provider value={slotDate}>
      <ScheduledAppointmentContext.Provider value={scheduledAppointment}>
        {children}
      </ScheduledAppointmentContext.Provider>
    </SelectedDateContext.Provider>
  );
};
