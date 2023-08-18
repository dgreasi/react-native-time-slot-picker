import React, { useCallback } from 'react';
import TimeSlot from './TimeSlot';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';

interface Props {
  slotTimes: string[];
  selectedTime: string;
  setSelectedTime: (value: string) => void;
  title?: string;
  backgroundColor?: string;
  mainColor?: string;
}

const TimeSlots = ({
  slotTimes,
  selectedTime,
  setSelectedTime,
  title = 'Select time',
  backgroundColor = theme.colors.white,
}: Props) => {
  const onPress = (value: string) => {
    setSelectedTime(value);
  };

  const getTimeSlots = useCallback(() => {
    return slotTimes.map((time) => {
      return (
        <View style={styles.timeSlotContainer} key={time}>
          <TimeSlot
            onPress={() => onPress(time)}
            value={time}
            selectedTime={selectedTime}
          />
        </View>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotTimes, selectedTime]);

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
