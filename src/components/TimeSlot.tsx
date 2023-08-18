import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { activeColor, defaultTimeSlotWidth } from '../utils/store';
import { theme } from '../utils/theme';

interface Props {
  value: string;
  onPress: () => void;
  selectedTime: string;
}

const TimeSlot = ({ value, onPress, selectedTime }: Props) => {
  const isSelected = selectedTime === value;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          { width: defaultTimeSlotWidth },
          isSelected ? { backgroundColor: activeColor } : styles.unSelected,
        ]}
      >
        <Text
          style={[isSelected ? styles.selectedText : styles.unSelectedText]}
        >
          {value}
        </Text>
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
});

export default TimeSlot;
