import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/SearchScreen';
import ExerciseTabNavigator from './ExerciseTabNavigator';
import WelcomeNavegation from './WelcomeNavigation'
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import HelpScreen from '../screens/Profile/HelpScreen';
import PrivacyPolicyScreen from '../screens/Profile/PrivacyPolicyScreen';
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
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Perfil', headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Editar Perfil', headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: 'Ayuda', headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: 'Política de Privacidad', headerShown: false }}
      />
    </Stack.Navigator>
  );
}