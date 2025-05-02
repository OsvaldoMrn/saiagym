
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
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        {/* Aquí puedes agregar otras pantallas que no estén dentro de las pestañas */}
      </Stack.Navigator>
    
  );
}

