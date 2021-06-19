import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Mainscreen from '../screen/userScrenn';
import {UserAction} from '../components/userAction';
import {TabNavigator} from './TopTab';

import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Mainscreen"
          component={Mainscreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="UserAction"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
