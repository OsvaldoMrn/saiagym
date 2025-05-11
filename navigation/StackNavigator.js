import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ExerciseTabNavigator from './ExerciseTabNavigator';
import RoutinesScreen from '../screens/RoutinesScreen';
import RoutineDetailsScreen from '../screens/RoutineDetailsScreen'; 
import WelcomeScreen from '../screens/WelcomeScreen'; // Importa la pantalla
import LoginScreen from '../screens/LoginScreen'; // Importa la pantalla de inicio de sesión
import CreateAccountScreen from '../screens/CreateAccountScreen'; // Importa la pantalla de creación de cuenta
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen'; // Importa la pantalla de recuperación de contraseña

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPasswordScreen} // Agrega la pantalla aquí
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* Pantalla de búsqueda */}
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Buscar Ejercicio' }}
      />
      {/* Nueva pantalla de descripción */}
      <Stack.Screen
        name="ExerciseTabNavigator"
        component={ExerciseTabNavigator}
        options={{ title: 'Más información' }}
      />
      {/* Nueva pantalla de rutinas */}
      <Stack.Screen
        name="Routines"
        component={RoutinesScreen}
        options={{ title: 'Explorar Rutinas' }}
      />
      <Stack.Screen
        name="RoutineDetails"
        component={RoutineDetailsScreen}
        options={{ title: 'Detalles de la Rutina' }}
      />
    </Stack.Navigator>
  );
}