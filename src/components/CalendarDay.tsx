import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';
import Touchable from './Touchable';
import { useOverrideDataContext } from './LocalContext';

interface Props {
  disabled: boolean;
  onPress: () => void;
  date: string;
  isSelected: boolean;
  isToday: boolean;
  hasAppointments: boolean;
}

const CalendarDay = ({
  disabled,
  onPress,
  date,
  isSelected,
  isToday,
  hasAppointments,
}: Props) => {
  const { mainColor, dayNamesOverride } = useOverrideDataContext();

  const dateObject = useMemo(() => new Date(date), [date]);
  const day = useMemo(() => dateObject.getDate(), [dateObject]);
  const dayNumberOfWeek = useMemo(() => dateObject.getDay(), [dateObject]);

  const getDate = useCallback(() => {
    return dayNamesOverride[dayNumberOfWeek];
  }, [dayNamesOverride, dayNumberOfWeek]);

  const getColorOfDay = useCallback(() => {
    if (isSelected) return theme.colors.white;
    if (isToday) return mainColor;
    return theme.colors.primary900;
  }, [isSelected, isToday, mainColor]);

  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      style={styles.dateContainer}
    >
      <Text style={styles.dayTitle}>{getDate()}</Text>
      <View
        style={[
          styles.day,
          isToday ? styles.todayBackground : styles.defaultBackground,
          isSelected ? { backgroundColor: mainColor } : styles.day,
        ]}
      >
        <Text
          style={[
            styles.dayValue,
            { opacity: disabled ? 0.5 : 1 },
            { color: getColorOfDay() },
          ]}
        >
          {day}
        </Text>
        {hasAppointments && (
          <View
            style={[
              styles.todayDot,
              isSelected
                ? styles.todayBackground
                : { backgroundColor: mainColor },
            ]}
          />
        )}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: 48,
    paddingVertical: theme.spacing.s,
  },
  dayTitle: {
    color: theme.colors.primary600,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadii.xl,
    width: 48,
    height: 48,
    marginTop: theme.spacing.sm,
  },
  dayValue: {
    color: theme.colors.primary900,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
  defaultBackground: {
    backgroundColor: theme.colors.white,
  },
  todayBackground: {
    backgroundColor: theme.colors.primary200,
  },
  todayDot: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: theme.borderRadii.l,
  },
});

export default CalendarDay;
