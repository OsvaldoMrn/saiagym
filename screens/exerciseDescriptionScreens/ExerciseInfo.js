import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ExerciseInfo({ exercise }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.sectionTitle}>Nivel</Text>
      <Text>{exercise.level}</Text>
      <Text style={styles.sectionTitle}>Músculos principales:</Text>
      <Text>{exercise.primaryMuscles.join(', ')}</Text>
      {exercise.secondaryMuscles.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Músculos secundarios:</Text>
          <Text>{exercise.secondaryMuscles.join(', ')}</Text>
        </>
      )}
      <Text style={styles.sectionTitle}>Instrucciones:</Text>
      {exercise.instructions.map((instruction, index) => (
        <Text key={index} style={styles.instruction}>
          {index + 1}. {instruction}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Categoría:</Text>
      <Text>{exercise.category.join(', ')}</Text>
      <Text style={styles.sectionTitle}>Equipamiento:</Text>
      <Text>{exercise.equipment}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 4,
  },
});