
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import WelcomeScreen2 from '../screens/WelcomeScreen2';
import Login from '../screens/Login/Login'; 
import TabNavigator from './TabNavigator'; 
import { useNavigation } from '@react-navigation/native'; 
import SignUp from '../screens/SignUp/SignUp';
import ForgottenPassword from '../screens/Login/ForgottenPassword'; 
import ResetPassword from '../screens/Login/ResetPassword';
import SignUpLoad from '../screens/SignUp/SignUpLoad'; 
import Age from '../screens/SignUp/Age'; 
import Weight from '../screens/SignUp/Weight'; 
import Height from '../screens/SignUp/Height'; 
import Goal from '../screens/SignUp/Goal'; 
import ActivityLevel from '../screens/SignUp/ActivityLevel'; 
import FillProfile from '../screens/SignUp/FillProfile'; 
const Stack = createNativeStackNavigator();

export default function WelcomeNavegation() {
  return (
    
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome2" component={WelcomeScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpLoad" component={SignUpLoad} options={{ headerShown: false }} />
        <Stack.Screen name="Age" component={Age} options={{ headerShown: false }} />
        <Stack.Screen name="Weight" component={Weight} options={{ headerShown: false }} />
        <Stack.Screen name="Height" component={Height} options={{ headerShown: false }} />
        <Stack.Screen name="Goal" component={Goal} options={{ headerShown: false }} />
        <Stack.Screen name="ActivityLevel" component={ActivityLevel} options={{ headerShown: false }} />
        <Stack.Screen name="FillProfile" component={FillProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    
  );
}

