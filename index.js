/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { PentairProvider } from '@pentair-ui/shared';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from './src/Onboarding/Containers/Welcome';
import SignIn from './src/Onboarding/Containers/SignIn';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PentairProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name='SignIn' component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </PentairProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
