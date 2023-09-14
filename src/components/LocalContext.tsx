import * as React from 'react';
import { createContext, useContext } from 'react';
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

const SelectedDateContext = createContext<string>('');
const ScheduledAppointmentContext = createContext<IAppointment | undefined>(
  undefined
);

const OverrideDataContext = createContext<IOverrideData>({
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

export const useSelectedDateContext = () => {
  return useContext(SelectedDateContext);
};

export const useScheduledAppointmentContext = () => {
  return useContext(ScheduledAppointmentContext);
};

export const useOverrideDataContext = () => {
  return useContext(OverrideDataContext);
};
