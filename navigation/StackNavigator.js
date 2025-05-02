import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ExerciseTabNavigator from './ExerciseTabNavigator';
import WelcomeNavegation from './WelcomeNavigation'
 // Asegúrate de importar la pantalla correcta

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* Pantalla de bienvenida */}
      <Stack.Screen
          name="WelcomeStack" // Esta ruta renderiza el *navegador* que maneja WelcomeScreen y WelcomeScreen2
          component={WelcomeNavegation}
          options={{ headerShown: false }}
        />
      {/* Pantalla de bienvenida */}
      <Stack.Screen
        name="Welcome"
        component={TabNavigator}
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  );
}