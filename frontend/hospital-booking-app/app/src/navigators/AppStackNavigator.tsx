import React, { type FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HospitalListScreen, AppointmentBookingScreen } from '../screens';

const Stack = createStackNavigator();

export const AppStackNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName={'HospitalListScreen'}>
      <Stack.Screen name={'HospitalListScreen'} component={HospitalListScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'AppointmentBookingScreen'} component={AppointmentBookingScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
