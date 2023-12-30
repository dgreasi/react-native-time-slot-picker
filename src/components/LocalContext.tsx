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

export const selectedDayContext = createContext<string>('');
export const scheduledAppointmentsContext = createContext<
  IAppointment[] | undefined
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
  scheduledAppointments: IAppointment[] | undefined;
  overrideData: IOverrideData;
}

export const LocalContext = ({
  children,
  slotDate,
  scheduledAppointments,
  overrideData,
}: Props) => {
  return (
    <selectedDayContext.Provider value={slotDate}>
      <scheduledAppointmentsContext.Provider value={scheduledAppointments}>
        <OverrideDataContext.Provider value={overrideData}>
          {children}
        </OverrideDataContext.Provider>
      </scheduledAppointmentsContext.Provider>
    </selectedDayContext.Provider>
  );
};
