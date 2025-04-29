import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ExerciseDescriptionScreen from '../screens/ExerciseDescriptionScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* Pantalla principal (TabNavigator maneja las pestañas) */}
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
        name="ExerciseDescription"
        component={ExerciseDescriptionScreen}
        options={{ title: 'Descripción del Ejercicio' }}
      />
    </Stack.Navigator>
  );
}