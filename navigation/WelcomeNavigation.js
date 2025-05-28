
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import WelcomeScreen2 from '../screens/WelcomeScreen2';
import Login from '../screens/Login'; // Asegúrate de que la ruta sea correcta
import TabNavigator from './TabNavigator'; // Importa el navegador de pestañas
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation si lo necesitas aquí
import SignUp from '../screens/SignUp';
import ForgottenPassword from '../screens/ForgottenPassword'; 
import ResetPassword from '../screens/ResetPassword';// Asegúrate de que la ruta sea correcta
import SignUpLoad from '../screens/SignUpLoad'; // Asegúrate de que la ruta sea correcta
import Age from '../screens/Age'; // Asegúrate de que la ruta sea correcta
import Weight from '../screens/Weight'; // Asegúrate de que la ruta sea correcta  
import Height from '../screens/Height'; // Asegúrate de que la ruta sea correcta
import Goal from '../screens/Goal'; // Asegúrate de que la ruta sea correcta
import ActivityLevel from '../screens/ActivityLevel'; // Asegúrate de que la ruta sea correcta
import FillProfile from '../screens/FillProfile'; // Asegúrate de que la ruta sea correcta

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

