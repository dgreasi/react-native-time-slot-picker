import * as React from 'react';
import { createContext } from 'react';
import { IAppointment } from '@dgreasi/react-native-time-slot-picker';
import {
  defaultActiveColor,
  defaultDayNames,
  defaultMonthNames,
  defaultTimeSlotWidth,
} from '../utils/data';

interface IOverrideData {
  mainColor: string;
  timeSlotWidth: number;
  dayNamesOverride: string[];
  monthNamesOverride: string[];
}

export const SelectedDateContext = createContext<string>('');
export const ScheduledAppointmentContext = createContext<
  IAppointment | undefined
>(undefined);

export const OverrideDataContext = createContext<IOverrideData>({
  mainColor: defaultActiveColor,
  timeSlotWidth: defaultTimeSlotWidth,
  dayNamesOverride: defaultDayNames,
  monthNamesOverride: defaultMonthNames,
});

interface Props {
  children: React.ReactNode;
  slotDate: string;
  scheduledAppointment: IAppointment | undefined;
  overrideData: IOverrideData;
}

export const LocalContext = ({
  children,
  slotDate,
  scheduledAppointment,
  overrideData,
}: Props) => {
  return (
    <SelectedDateContext.Provider value={slotDate}>
      <ScheduledAppointmentContext.Provider value={scheduledAppointment}>
        <OverrideDataContext.Provider value={overrideData}>
          {children}
        </OverrideDataContext.Provider>
      </ScheduledAppointmentContext.Provider>
    </SelectedDateContext.Provider>
  );
};
