import React, { useCallback } from 'react';
import TimeSlot from './TimeSlot';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';
import { IAppointment, IAvailableDates } from '../interfaces/app.interface';

interface Props {
  selectedDay: string;
  slotTimes: string[];
  scheduledAppointments: IAppointment[] | undefined;
  availableDates: IAvailableDates[];
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
  availableDates,
  setScheduledAppointments,
  multipleSelection,
  multipleSelectionStrategy,
  title = 'Select time',
  backgroundColor = theme.colors.white,
}: Props) => {
  const onPress = (value: string) => {
    // If no appointments are scheduled, add the selected time slot
    if (!scheduledAppointments || scheduledAppointments.length === 0)
      setScheduledAppointments([
        {
          appointmentDate: selectedDay,
          appointmentTime: value,
        },
      ]);
    else {
      // An appointment is already scheduled
      if (!multipleSelection) {
        // Single time slot selection
        // If the selected time slot is already scheduled, remove it
        if (
          scheduledAppointments &&
          scheduledAppointments[0] &&
          scheduledAppointments[0].appointmentTime === value
        )
          setScheduledAppointments([]);
      } else {
        // Multiple time slot selection
        const isAlreadyScheduled = scheduledAppointments.find(
          (data) => data.appointmentTime === value
        );
        if (isAlreadyScheduled) {
          // non-consecutive strategy, just remove the selected time slot
          if (multipleSelectionStrategy === 'non-consecutive')
            setScheduledAppointments(
              scheduledAppointments.filter(
                (data) => data.appointmentTime !== value
              )
            );
          else {
            // Check if removing the time slot will break the consecutive rule
            const valueSplit = value.split('-');
            const valueStartTime = valueSplit[0];
            const valueEndTime = valueSplit[1];
            // find the prior and next consecutive time slots, they may be in different days
            const priorDay = new Date(selectedDay);
            priorDay.setDate(priorDay.getDate() - 1);
            const nextDay = new Date(selectedDay);
            nextDay.setDate(nextDay.getDate() + 1);
            let priorAvailableDate = availableDates.find(
              (data) =>
                data.date === selectedDay &&
                data.slotTimes.find((slotTime) => {
                  const valueStartTimeSplit = valueStartTime?.split(':');
                  const slotTimeSplit = slotTime.split('-')[0]?.split(':');
                  // Type safety check
                  if (
                    valueStartTimeSplit &&
                    slotTimeSplit &&
                    valueStartTimeSplit[0] &&
                    valueStartTimeSplit[1] &&
                    slotTimeSplit[0] &&
                    slotTimeSplit[1]
                  ) {
                    const valueMinutes =
                      parseInt(valueStartTimeSplit[0], 10) * 60 +
                      parseInt(valueStartTimeSplit[1], 10);
                    const slotMinutes =
                      parseInt(slotTimeSplit[0], 10) * 60 +
                      parseInt(slotTimeSplit[1], 10);
                    const isSlotBeforeSelectedTime = slotMinutes < valueMinutes;
                    return (
                      slotTime.split('-')[1] === valueStartTime &&
                      isSlotBeforeSelectedTime
                    );
                  }
                  return false;
                })
            );
            if (
              !priorAvailableDate &&
              multipleSelectionStrategy !== 'same-day-consecutive'
            ) {
              // Check the prior day
              priorAvailableDate = availableDates.find((data) => {
                return (
                  data.date === priorDay.toISOString() &&
                  data.slotTimes.find(
                    (slotTime) => slotTime.split('-')[1] === valueStartTime
                  )
                );
              });
            }
            // Check for the next available time slot in the same day
            let nextAvailableDate = availableDates.find(
              (data) =>
                data.date === selectedDay &&
                data.slotTimes.find((slotTime) => {
                  const valueStartTimeSplit = valueStartTime?.split(':');
                  const slotTimeSplit = slotTime.split('-')[0]?.split(':');
                  if (
                    valueStartTimeSplit &&
                    slotTimeSplit &&
                    valueStartTimeSplit[0] &&
                    valueStartTimeSplit[1] &&
                    slotTimeSplit[0] &&
                    slotTimeSplit[1]
                  ) {
                    const valueMinutes =
                      parseInt(valueStartTimeSplit[0], 10) * 60 +
                      parseInt(valueStartTimeSplit[1], 10);
                    const timeSlotMinutes =
                      parseInt(slotTimeSplit[0], 10) * 60 +
                      parseInt(slotTimeSplit[1], 10);
                    const isSlotAfterSelectedTime =
                      valueMinutes < timeSlotMinutes;
                    return (
                      slotTime.split('-')[0] === valueEndTime &&
                      isSlotAfterSelectedTime
                    );
                  }
                  return false;
                })
            );
            if (
              !nextAvailableDate &&
              multipleSelectionStrategy !== 'same-day-consecutive'
            ) {
              // Check the next day
              nextAvailableDate = availableDates.find(
                (data) =>
                  data.date === nextDay.toISOString() &&
                  data.slotTimes.find(
                    (slotTime) => slotTime.split('-')[0] === valueEndTime
                  )
              );
            }
            // If the slot isn't consecutive (either the first or last slot) and remove it
            const isPriorScheduled = scheduledAppointments.find(
              (data) =>
                data.appointmentDate === priorAvailableDate?.date &&
                data.appointmentTime.split('-')[1] === valueStartTime
            );
            const isNextScheduled = scheduledAppointments.find(
              (data) =>
                data.appointmentDate === nextAvailableDate?.date &&
                data.appointmentTime.split('-')[0] === valueEndTime
            );
            if (!(isPriorScheduled && isNextScheduled))
              setScheduledAppointments(
                scheduledAppointments.filter(
                  (data) => data.appointmentTime !== value
                )
              );
          }
        } else {
          // New time slot
          if (multipleSelectionStrategy === 'non-consecutive')
            setScheduledAppointments([
              ...scheduledAppointments,
              {
                appointmentDate: selectedDay,
                appointmentTime: value,
              },
            ]);
          else {
            // Check if it's consecutive
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
