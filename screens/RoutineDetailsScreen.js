import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RoutineDetailsScreen({ route }) {
  const { routine } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Rutina</Text>
      <Text style={styles.routineName}>{routine.name}</Text>
      <Text style={styles.routineDescription}>{routine.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  routineName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  routineDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});