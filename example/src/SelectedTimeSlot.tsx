import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IAppointment } from '@dgreasi/react-native-time-slot-picker';

interface Props {
  dateOfAppointment: IAppointment | null;
}

export const SelectedTimeSlot = ({ dateOfAppointment }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.boldFont}>Selected time slot</Text>
      <Text style={styles.boldFont}>Interface</Text>
      <Text style={{ fontStyle: 'italic' }}>
        interface IAppointment &#123; {'\n'}
        {'  '}appointmentDate: string;{'\n'}
        {'  '}
        appointmentTime: string;{'\n'}&#125;
      </Text>
      <View style={styles.valueContainer}>
        <Text style={styles.boldFont}>appointmentDate: </Text>
        <View style={styles.borderOfValue}>
          <Text>{dateOfAppointment?.appointmentDate}</Text>
        </View>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.boldFont}>appointmentTime: </Text>
        <View style={styles.borderOfValue}>
          <Text>{dateOfAppointment?.appointmentTime}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  boldFont: {
    fontWeight: '600',
  },
  valueContainer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  borderOfValue: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff0025',
    padding: 2,
  },
});
