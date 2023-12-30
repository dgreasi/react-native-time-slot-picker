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
            // find the prior and next consecutive time slots, they may be in the prior or next day, and check if they are scheculed
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
                  if (
                    valueStartTimeSplit &&
                    slotTimeSplit &&
                    valueStartTimeSplit[0] &&
                    valueStartTimeSplit[1] &&
                    slotTimeSplit[0] &&
                    slotTimeSplit[1]
                  ) {
                    const isSlotBeforeSelectedTime =
                      parseInt(valueStartTimeSplit[0], 10) * 60 +
                        parseInt(valueStartTimeSplit[1], 10) >
                      parseInt(slotTimeSplit[0], 10) * 60 +
                        parseInt(slotTimeSplit[1], 10);
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
              multipleSelectionStrategy === 'consecutive'
            ) {
              priorAvailableDate = availableDates.find((data) => {
                console.log('data.date', data.date);
                console.log('priorDay.toISOString()', priorDay.toISOString());
                return (
                  data.date === priorDay.toISOString() &&
                  data.slotTimes.find(
                    (slotTime) => slotTime.split('-')[1] === valueStartTime
                  )
                );
              });
            }
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
                    const isSlotAfterSelectedTime =
                      parseInt(valueStartTimeSplit[0], 10) * 60 +
                        parseInt(valueStartTimeSplit[1], 10) <
                      parseInt(slotTimeSplit[0], 10) * 60 +
                        parseInt(slotTimeSplit[1], 10);
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
              multipleSelectionStrategy === 'consecutive'
            ) {
              nextAvailableDate = availableDates.find(
                (data) =>
                  data.date === nextDay.toISOString() &&
                  data.slotTimes.find(
                    (slotTime) => slotTime.split('-')[0] === valueEndTime
                  )
              );
            }
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
            console.log('isPriorScheduled', isPriorScheduled);
            console.log('isNextScheduled', isNextScheduled);
            if (!(isPriorScheduled && isNextScheduled))
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
