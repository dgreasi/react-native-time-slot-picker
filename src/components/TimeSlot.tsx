import React, { useCallback, useContext, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';
import {
  OverrideDataContext,
  ScheduledAppointmentContext,
  SelectedDateContext,
} from './LocalContext';

interface Props {
  value: string;
  onPress: () => void;
  selectedTime: string;
}

const TimeSlot = ({ value, onPress, selectedTime }: Props) => {
  const isSelected = selectedTime === value;
  const scheduledAppointment = useContext(ScheduledAppointmentContext);
  const selectedDate = useContext(SelectedDateContext);
  const { mainColor, timeSlotWidth } = useContext(OverrideDataContext);

  const appointmentDot = useMemo(() => {
    return (
      <View
        style={[
          styles.todayDot,
          isSelected ? styles.todayBackground : { backgroundColor: mainColor },
        ]}
      />
    );
  }, [isSelected, mainColor]);

  const getAppointmentDot: () => React.JSX.Element | null = useCallback(() => {
    if (scheduledAppointment?.appointmentDate) {
      const appointmentDate = new Date(
        scheduledAppointment?.appointmentDate
      ).toDateString();

      if (
        selectedDate === appointmentDate &&
        scheduledAppointment.appointmentTime === value
      ) {
        return appointmentDot;
      }
    }

    return null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentDot, scheduledAppointment, selectedDate]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          { width: timeSlotWidth },
          isSelected ? { backgroundColor: mainColor } : styles.unSelected,
        ]}
      >
        <Text
          style={[isSelected ? styles.selectedText : styles.unSelectedText]}
        >
          {value}
        </Text>
        {getAppointmentDot()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadii.ml,
  },
  unSelected: {
    backgroundColor: theme.colors.primary200,
  },
  selectedText: {
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  unSelectedText: {
    color: theme.colors.primary900,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
  },
  todayBackground: {
    backgroundColor: theme.colors.primary200,
  },
  todayDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: theme.borderRadii.l,
  },
});

export default TimeSlot;
