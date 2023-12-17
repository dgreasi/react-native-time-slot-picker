import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IAppointment, IAvailableDates } from '../interfaces/app.interface';
import ScheduleDateElement from './ScheduleDateElement';
import { theme } from '../utils/theme';
import { OverrideDataContext } from './LocalContext';

interface Props {
  availableDates: IAvailableDates[];
  selectedDay: string;
  setSelectedDay: (date: string) => void;
  scheduledAppointments: IAppointment[] | undefined;
  backgroundColor?: string;
}

const today = new Date();
const currentDay = today.getDate();

const ScheduleDatePicker = ({
  availableDates,
  selectedDay,
  setSelectedDay,
  scheduledAppointments,
  backgroundColor = theme.colors.white,
}: Props) => {
  const scrollRef = useRef<any>();
  const { monthNamesOverride } = useContext(OverrideDataContext);
  const currentMonth = useMemo(
    () => monthNamesOverride[today.getMonth()],
    [monthNamesOverride]
  );

  const getScheduledAppointmentsDate = useCallback(
    (date: string) => new Date(date).getDate(),
    []
  );

  const onDatePress = (date: IAvailableDates) => {
    setSelectedDay(date.date);
  };

  const getAppointmentDays: () => number[] = useCallback(() => {
    const schecduledDays = scheduledAppointments?.map((data) =>
      getScheduledAppointmentsDate(data.appointmentDate)
    );
    if (schecduledDays?.length) 
      return schecduledDays;

    return [];
  }, [scheduledAppointments, getScheduledAppointmentsDate]);

  const dateContainer = (date: IAvailableDates, index: number) => {
    return (
      <View key={index}>
        <ScheduleDateElement
          slotDate={date}
          selectedDay={selectedDay}
          onPress={() => {
            onDatePress(date);
          }}
          currentDay={currentDay}
          appointmentDays={getAppointmentDays()}
        />
      </View>
    );
  };

  const getDates = () => {
    return availableDates.map((data, index) => {
      return dateContainer(data, index);
    });
  };

  return (
    <View style={{ backgroundColor }}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {currentMonth} {currentDay}
        </Text>
      </View>
      <ScrollView
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        {getDates()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  title: {
    color: theme.colors.primary900,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  scrollViewContent: {
    paddingHorizontal: theme.spacing.m,
  },
});

export default ScheduleDatePicker;
