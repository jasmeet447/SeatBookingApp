/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { PentairProvider } from '@pentair-ui/shared';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from './src/Onboarding/Containers/SignIn';
import ChangePassword from './src/Onboarding/Containers/ChangePassword';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PentairProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </PentairProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
