import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ExerciseTabNavigator from './ExerciseTabNavigator';
import RoutinesScreen from '../screens/RoutinesScreen';
import RoutineDetailsScreen from '../screens/RoutineDetailsScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import CreateRoutineScreen from '../screens/CreateRoutineScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#fff', // Color del título y botones
        headerTitleStyle: styles.headerTitle,
        // headerShown: false // ocultar el header
      }}
    >
      {/* Pantalla principal (TabNavigator maneja las pestañas) */}
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }} //ocultar el header solo para tabnavigator
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
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{ title: 'Ejercicio' }}
      />
      <Stack.Screen
        name="CreateRoutineScreen"
        component={CreateRoutineScreen}
        options={{ title: 'Crear Rutina' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1e3433', // Rojo chillón corregido
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff', // Asegura que el título sea blanco
  },
});