/**
 * @format
 */

import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { configureAmplify } from './src/Common_Feature/ConfigManager';
import { name as appName } from './app.json';
import { PentairProvider } from '@pentair-ui/shared';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from './src/Onboarding/Containers/SignIn';
import ChangePassword from './src/Onboarding/Containers/ChangePassword';
import ForgotPassword from './src/Onboarding/Containers/ForgotPassword';
import ResetPassword from './src/Onboarding/Containers/ResetPassword';
import SeatSelection from './src/SeatSelection/Containers/SeatSelection'

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(()=>{
    configureAmplify();
  },[])
  
  return (
    <PentairProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='App' component={SeatSelection} />
          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </PentairProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
