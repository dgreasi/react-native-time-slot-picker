import React, { useCallback, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IAppointment, IAvailableDates } from '../interfaces/app.interface';
import ScheduleDateElement from './ScheduleDateElement';
import { theme } from '../utils/theme';
import { monthNames } from '../utils/data';

interface Props {
  availableDates: IAvailableDates[];
  selectedDate: IAvailableDates | undefined;
  setSelectedDate: (date: IAvailableDates) => void;
  setSelectedTime: (time: string) => void;
  scheduledAppointment: IAppointment | undefined;
  backgroundColor?: string;
}

const today = new Date();
const currentDay = today.getDate();
const currentMonth = monthNames[today.getMonth()]?.value;

// TODO: add args for current month, current day titles

const ScheduleDatePicker = ({
  availableDates,
  selectedDate,
  setSelectedDate,
  setSelectedTime,
  scheduledAppointment,
  backgroundColor = theme.colors.white,
}: Props) => {
  const scrollRef = useRef<any>();

  const onDatePress = (date: IAvailableDates) => {
    setSelectedDate(date);
    setSelectedTime(date?.slotTimes?.[0] || '');
  };

  const getAppointmentDay: () => number = useCallback(() => {
    if (scheduledAppointment?.appointmentDate) {
      return new Date(scheduledAppointment?.appointmentDate).getDate();
    }

    return -1;
  }, [scheduledAppointment?.appointmentDate]);

  const dateContainer = (date: IAvailableDates, index: number) => {
    return (
      <View key={index}>
        <ScheduleDateElement
          date={date}
          selectedDate={selectedDate}
          onPress={() => {
            onDatePress(date);
          }}
          currentDay={currentDay}
          appointmentDay={getAppointmentDay()}
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
