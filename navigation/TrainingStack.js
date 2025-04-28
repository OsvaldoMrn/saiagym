// navigation/TrainingStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrainingScreen from '../screens/TrainingScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function TrainingStack() {
  return (
    <Stack.Navigator>
    {/* Pantalla principal */}
      <Stack.Screen
        name="TrainingMain"
        component={TrainingScreen}
        options={{ title: 'Entrenamiento' }}
      />

    {/* Pantalla de búsqueda */}
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Buscar Ejercicio' }}
      />
    </Stack.Navigator>
  );
}
