import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExerciseHistory({ exercise }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial del Ejercicio</Text>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    color: '#555',
  },
});