import React, { useCallback } from 'react';
import TimeSlot from './TimeSlot';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';
import { IAppointment } from '../interfaces/app.interface';

interface Props {
  selectedDay: string;
  slotTimes: string[];
  scheduledAppointments: IAppointment[] | undefined;
  setScheduledAppointments: (value: IAppointment[]) => void;
  multipleSelection: boolean;
  multipleSelectionStrategy:
    | 'consecutive'
    | 'same-day-consecutive'
    | 'non-consecutive';
  title?: string;
  backgroundColor?: string;
  mainColor?: string;
}

const TimeSlots = ({
  selectedDay,
  slotTimes,
  scheduledAppointments,
  setScheduledAppointments,
  multipleSelection,
  multipleSelectionStrategy,
  title = 'Select time',
  backgroundColor = theme.colors.white,
}: Props) => {
  const onPress = (value: string) => {
    if (!scheduledAppointments || scheduledAppointments.length === 0)
      setScheduledAppointments([
        {
          appointmentDate: selectedDay,
          appointmentTime: value,
        },
      ]);
    else {
      if (!multipleSelection) {
        if (
          scheduledAppointments &&
          scheduledAppointments[0] &&
          scheduledAppointments[0].appointmentTime === value
        )
          setScheduledAppointments([]);
      } else {
        const isAlreadyScheduled = scheduledAppointments.find(
          (data) => data.appointmentTime === value
        );
        if (isAlreadyScheduled) {
          if (multipleSelectionStrategy === 'non-consecutive')
            setScheduledAppointments(
              scheduledAppointments.filter(
                (data) => data.appointmentTime !== value
              )
            );
          else {
            // only remove if it is not consecutive
            const valueSplit = value.split('-');
            const valueStartTime = valueSplit[0];
            const valueEndTime = valueSplit[1];
            const isConsecutive =
              scheduledAppointments.find((data) => {
                const dataSplit = data.appointmentTime.split('-');
                const dataStartTime = dataSplit[0];
                if (data.appointmentDate === selectedDay) {
                  if (dataStartTime === valueEndTime) return true;
                }
                return false;
              }) &&
              scheduledAppointments.find((data) => {
                const dataSplit = data.appointmentTime.split('-');
                const dataEndTime = dataSplit[1];
                if (data.appointmentDate === selectedDay) {
                  if (dataEndTime === valueStartTime) return true;
                }
                return false;
              });
            if (!isConsecutive)
              setScheduledAppointments(
                scheduledAppointments.filter(
                  (data) => data.appointmentTime !== value
                )
              );
          }
        } else {
          if (multipleSelectionStrategy === 'non-consecutive')
            setScheduledAppointments([
              ...scheduledAppointments,
              {
                appointmentDate: selectedDay,
                appointmentTime: value,
              },
            ]);
          else {
            const valueSplit = value.split('-');
            const valueStartTime = valueSplit[0];
            const valueEndTime = valueSplit[1];
            const isConsecutive = scheduledAppointments.find((data) => {
              const dataSplit = data.appointmentTime.split('-');
              const dataStartTime = dataSplit[0];
              const dataEndTime = dataSplit[1];
              if (
                (multipleSelectionStrategy === 'same-day-consecutive' &&
                  data.appointmentDate === selectedDay) ||
                multipleSelectionStrategy === 'consecutive'
              ) {
                if (
                  dataStartTime === valueEndTime ||
                  dataEndTime === valueStartTime
                )
                  return true;
              }
              return false;
            });
            if (isConsecutive) {
              setScheduledAppointments([
                ...scheduledAppointments,
                {
                  appointmentDate: selectedDay,
                  appointmentTime: value,
                },
              ]);
            }
          }
        }
      }
    }
  };
  const getTimeSlots = useCallback(() => {
    return slotTimes.map((time) => {
      return (
        <View style={styles.timeSlotContainer} key={time}>
          <TimeSlot onPress={() => onPress(time)} value={time} />
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
