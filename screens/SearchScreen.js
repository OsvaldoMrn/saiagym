import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Cargar el archivo JSON de ejercicios
const exercisesData = require('../assets/exercises.json'); // Asegúrate de que la ruta sea correcta

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // Nuevo estado
  const debounceTimeout = useRef(null);
  const [selectedExercises, setSelectedExercises] = useState([]);

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
      setVisibleCount(10); // Reinicia el contador al buscar
    }, 1000);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery]);

  // Decide qué ejercicios mostrar
  const exercisesToShow =
    searchQuery.trim() === ''
      ? exercisesData.slice(0, visibleCount)
      : filteredExercises.slice(0, visibleCount);

  // Cargar más ejercicios al llegar al final
  const handleEndReached = () => {
    // Si hay más ejercicios para mostrar, aumenta el límite
    const total =
      searchQuery.trim() === ''
        ? exercisesData.length
        : filteredExercises.length;
    if (visibleCount < total) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  const handleAddExercise = (exercise) => {
    setSelectedExercises((prev) => {
      // Evita duplicados
      if (prev.some(e => e.id === exercise.id)) return prev;
      return [...prev, exercise];
    });
  };

  const handleRemoveExercise = (exercise) => {
    setSelectedExercises((prev) => prev.filter(e => e.id !== exercise.id));
  };

  const renderExercise = ({ item }) => {
    const isSelected = selectedExercises.some(e => e.id === item.id);
    return (
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
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={styles.descButton}
            onPress={() => navigation.navigate('ExerciseTabNavigator', { exercise: item })}
          >
            <Text style={styles.descButtonText}>Descripción</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.addButton,
              isSelected && { backgroundColor: '#4CAF50' }
            ]}
            onPress={() => isSelected ? handleRemoveExercise(item) : handleAddExercise(item)}
          >
            <Text style={styles.descButtonText}>
              {isSelected ? 'Quitar' : 'Agregar ejercicio'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {selectedExercises.length >= 2 && (
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {selectedExercises.length} ejercicios seleccionados
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('CreateRoutineScreen', { selectedExercises })}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar ejercicio..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={exercisesToShow}
        keyExtractor={(item) => item.id}
        renderItem={renderExercise}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbe6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
    elevation: 2,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 8,
  },
});