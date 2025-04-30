import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Cargar el archivo JSON de ejercicios
const exercisesData = require('../assets/exercises.json'); // Asegúrate de que la ruta sea correcta

export default function SearchScreen({ navigation }) { // Recibe navigation como prop
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredExercises([]); // No mostrar nada si el campo está vacío
      } else {
        const lowerQuery = searchQuery.toLowerCase();
        setFilteredExercises(
          exercisesData.filter((exercise) =>
            exercise.name.toLowerCase().includes(lowerQuery) ||
            exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(lowerQuery)) ||
            exercise.secondaryMuscles.some(muscle => muscle.toLowerCase().includes(lowerQuery))
          )
        );
      }
    }, 1000); // 1 segundo de debounce

    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery]);

  const renderExercise = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>
        Músculos principales: {item.primaryMuscles.join(', ')}
      </Text>
      {item.secondaryMuscles.length > 0 && (
        <Text style={styles.cardDescription}>
          Músculos secundarios: {item.secondaryMuscles.join(', ')}
        </Text>
      )}
      <TouchableOpacity
        style={styles.descButton}
        onPress={() => navigation.navigate('ExerciseTabNavigator', { exercise: item })} // Usa navigation aquí
      >
        <Text style={styles.descButtonText}>Descripción</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar ejercicio..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExercise}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  descButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  descButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});