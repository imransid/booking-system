import React, { type FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens';

const Stack = createStackNavigator();

export const AppStackNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName={'LoginScreen'}>
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
