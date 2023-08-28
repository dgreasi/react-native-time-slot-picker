# react-native-time-slot-picker

[![NPM version][npm-image]][npm-url] [![npm][npm-downloads]][npm-url] [![npm][license-url]][npm-url] [![npm][types-url]][npm-url] [![runs with expo][expo-image]][expo-url]

## Features

- No dependencies.
- A time slot picker for react native.
- Pass the `availableDates` you want to show.
- Pick a day and the timeslot you wish.
- Simple UX.
- Use colors of your preference by using the params.
- Use day shortnames and month names of your preference by using the params.
- Change the title of the timeslots section by using the params.
- Change the width of timeslot element by using the params.

[<img src="example/screenshots/1.png" width="180"/>](example/screenshots/1.png)
[<img src="example/screenshots/2.png" width="180"/>](example/screenshots/2.png)
[<img src="example/screenshots/3.png" width="180"/>](example/screenshots/3.png)
[<img src="example/screenshots/4.png" width="180"/>](example/screenshots/4.png)
[<img src="example/screenshots/5.png" width="180"/>](example/screenshots/5.png)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Interfaces](#interfaces)
- [Changelog](CHANGELOG.md)

## Installation

```sh
npm i @dgreasi/react-native-time-slot-picker
# OR
yarn add @dgreasi/react-native-time-slot-picker
```

## Usage

```tsx
import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  IAppointment,
  IAvailableDates,
  TimeSlotPicker,
} from '@dgreasi/react-native-time-slot-picker';
import { useEffect, useState } from 'react';

const availableDates: IAvailableDates[] = [
  {
    day: 18, // new Date().getDate()
    slotDate: 'Fri Aug 18 2023', // new Date().toDateString()
    slotTimes: ['08:00-09:00', '09:00-10:00'], // Array<string> of time slots
  },
  {
    day: 19,
    slotDate: 'Sat Aug 19 2023',
    slotTimes: [], // No availability
  },
  {
    day: 20,
    slotDate: 'Sun Aug 20 2023',
    slotTimes: ['08:00-09:00', '09:00-10:00'],
  },
];

export default function App() {
  const [dateOfAppointment, setDateOfAppointment] = useState<IAppointment | null>(null);

  useEffect(() => {
    // Contains the selected time slot in the following format
    // {"appointmentDate": "Fri Aug 18 2023", "appointmentTime": "18:00-19:00"}
    console.log('Date of appointment updated: ', dateOfAppointment);
  }, [dateOfAppointment]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TimeSlotPicker
          availableDates={availableDates}
          setDateOfAppointment={setDateOfAppointment}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
```

You can find a set of detailed examples [here](example/src/App.tsx).

Also, a running snack [here](https://snack.expo.dev/@dgreasi/react-native-time-slot-picker).

# Props

| Prop name                   | Description                                                                                                                 | Type                                                  | Default                                                                                                                      |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `availableDates`            | The array of the available slot times per date.                                                                             | `IAvailableDates[]`                                   | **REQUIRED**                                                                                                                 |
| `setDateOfAppointment`      | A component to use on top of header image. It can also be used without header image to render a custom component as header. | `(data: IAddScheduleAppointmentBody \| null) => void` | **REQUIRED**                                                                                                                 |
| `scheduledAppointment`      | An already existed appointment, which is going to be mark the specific date `with appointment`.                             | `IGetScheduleCallResponse`                            | `undefined`                                                                                                                  |
| `marginTop`                 | Margin top for the whole component.                                                                                         | `number`                                              | `0`                                                                                                                          |
| `datePickerBackgroundColor` | Background color of the section with the horizontal scroll, which contains the days.                                        | `hex string`                                          | `'#FFFFFF'`                                                                                                                  |
| `timeSlotsBackgroundColor`  | Background color of the section that contains the time slots.                                                               | `hex string`                                          | `'#FFFFFF'`                                                                                                                  |
| `timeSlotsTitle`            | Title of section that contains the                                                                                          | `string`                                              | `'Select time'`                                                                                                              |
| `mainColor`                 | Main color of the time slot picker                                                                                          | `hex string`                                          | `'#04060A'`                                                                                                                  |
| `timeSlotWidth`             | Time slot pill width                                                                                                        | `number`                                              | `96`                                                                                                                         |
| `dayNamesOverride`          | Day string array to override letters for each Calendar day. First day is Sunday.                                            | `string[]`                                            | `['S', 'M', 'T', 'W', 'T', 'F', 'S']`                                                                                        |
| `monthNamesOverride`        | Month string array to override default month names that are used as title.                                                  | `string[]`                                            | `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']` |

# Interfaces

| Name              | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `IAvailableDates` | `{ day: number, slotDate: string, slotTimes: string[] }` |
| `IAppointment`    | `{ appointmentDate: string, appointmentTime: string }`   |

## License

MIT

[npm-url]: https://www.npmjs.com/package/@dgreasi/react-native-time-slot-picker
[npm-image]: https://img.shields.io/npm/v/@dgreasi/react-native-time-slot-picker?style=flat-square
[license-url]: https://img.shields.io/npm/l/@dgreasi/react-native-time-slot-picker?style=flat-square
[types-url]: https://img.shields.io/badge/types-included-blue?style=flat-square
[expo-image]: https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000
[expo-url]: https://expo.io
[npm-downloads]: https://img.shields.io/npm/dm/@dgreasi/react-native-time-slot-picker?style=flat-square

## Roadmap

- Update logic for getAppointmentDay() to show dot in dates.
