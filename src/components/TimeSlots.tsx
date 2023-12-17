import React, { useCallback } from 'react';
import TimeSlot from './TimeSlot';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';
import { IAppointment } from '../interfaces/app.interface';

interface Props {
  selectedDay: string;
  slotTimes: string[];
  scheduledAppointments: IAppointment[] | undefined;
  setScheduledAppointments: (value: IAppointment[] | null) => void;
  title?: string;
  backgroundColor?: string;
  mainColor?: string;
}

const TimeSlots = ({
  selectedDay,
  slotTimes,
  scheduledAppointments,
  setScheduledAppointments,
  title = 'Select time',
  backgroundColor = theme.colors.white,
}: Props) => {
  const onPress = (value: string) => {
    if (!scheduledAppointments) setScheduledAppointments([{ 
      appointmentDate: selectedDay,
      appointmentTime: value,
     }]);
    else {
      const isAlreadyScheduled = scheduledAppointments.find((data) => data.appointmentTime === value);
      if (isAlreadyScheduled) {
        setScheduledAppointments(scheduledAppointments.filter((data) => data.appointmentTime !== value));
      } else {
        setScheduledAppointments([...scheduledAppointments, {
          appointmentDate: selectedDay,
          appointmentTime: value,
        }]);
      }
    }
  };
  const getTimeSlots = useCallback(() => {
    return slotTimes.map((time) => {
      return (
        <View style={styles.timeSlotContainer} key={time}>
          <TimeSlot
            onPress={() => onPress(time)}
            value={time}
          />
        </View>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotTimes, scheduledAppointments]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.titleContainer}>{title}</Text>
      <View style={styles.timeSlotsContainer}>{getTimeSlots()}</View>
    </View>
  );
};

export default TimeSlots;

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.l,
    paddingLeft: theme.spacing.m,
  },
  titleContainer: {
    color: theme.colors.primary600,
    marginBottom: theme.spacing.m,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlotContainer: {
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.sm,
  },
});
