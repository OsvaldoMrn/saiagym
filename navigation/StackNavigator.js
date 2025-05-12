import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ExerciseTabNavigator from './ExerciseTabNavigator';
import RoutinesScreen from '../screens/RoutinesScreen';
import RoutineDetailsScreen from '../screens/RoutineDetailsScreen'; 

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* Pantalla de chat */}
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'Asistente de Gimnasio' }}
      />
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