import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';
import ExerciseInfo from '../screens/exerciseDescriptionScreens/ExerciseInfo';
import ExerciseHistory from '../screens/exerciseDescriptionScreens/ExerciseHistory';
import ExerciseStatistics from '../screens/exerciseDescriptionScreens/ExerciseStatistics';

const Tab = createMaterialTopTabNavigator();

export default function ExerciseTabNavigator() {
  const route = useRoute();
  const { exercise } = route.params; // Obtener el parámetro exercise

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#2196F3' }, // Color de fondo de la barra
        tabBarIndicatorStyle: { backgroundColor: '#fff', height: 3 }, // Indicador de pestaña activa
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', color: '#fff' }, // Estilo del texto
      }}
    >
      <Tab.Screen
        name="Info"
        options={{ title: 'Información' }}
      >
        {() => <ExerciseInfo exercise={exercise} />}
      </Tab.Screen>
      <Tab.Screen
        name="History"
        options={{ title: 'Historial' }}
      >
        {() => <ExerciseHistory exercise={exercise} />}
      </Tab.Screen>
      <Tab.Screen
        name="Statistics"
        options={{ title: 'Estadísticas' }}
      >
        {() => <ExerciseStatistics exercise={exercise} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}