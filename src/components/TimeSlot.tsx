import React, { useCallback, useContext, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';
import {
  OverrideDataContext,
  scheduledAppointmentsContext,
  selectedDayContext,
} from './LocalContext';

interface Props {
  value: string;
  onPress: () => void;
}

const TimeSlot = ({ value, onPress }: Props) => {
  const scheduledAppointments = useContext(scheduledAppointmentsContext);
  const selectedDay = useContext(selectedDayContext);
  const { mainColor, timeSlotWidth } = useContext(OverrideDataContext);

  const isSelected = scheduledAppointments?.find(
    (appointment) =>
      appointment.appointmentDate === selectedDay &&
      appointment.appointmentTime === value
  );

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

  // Check if there is an appointment to mark time slot appropriately
  const getAppointmentDot: () => React.JSX.Element | null = useCallback(() => {
    if (isSelected) {
      return appointmentDot;
    }

    return null;
  }, [appointmentDot, isSelected]);

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
