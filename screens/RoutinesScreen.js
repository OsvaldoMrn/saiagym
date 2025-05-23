import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importar los datos de rutinas y ejercicios
const routinesData = require('../assets/routines.json');
const exercisesData = require('../assets/exercises.json');

export default function RoutinesScreen() {
  // Función para obtener los detalles de los ejercicios
  const getExerciseDetails = (exerciseId) => {
    return exercisesData.find((exercise) => exercise.id === exerciseId);
  };

  // Renderizar cada rutina
  const renderRoutine = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.sectionTitle}>Ejercicios:</Text>
        {item.exercises.length > 0 ? (
          item.exercises.map((exercise) => {
            const exerciseDetails = getExerciseDetails(exercise.exerciseId); // Buscar los detalles del ejercicio
            return (
              <Text key={exercise.exerciseId} style={styles.exerciseText}>
                - {exerciseDetails?.name || 'Ejercicio no encontrado'}
              </Text>
            );
          })
        ) : (
          <Text style={styles.noExercisesText}>No se encontraron ejercicios</Text>
        )}

        {/* Contenedor para los botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('RoutineDetails', { routine: item })}
          >
            <Text style={styles.buttonText}>Explorar rutina</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => console.log(`Guardar rutina: ${item.name}`)} // Acción para guardar rutina
          >
            <Text style={styles.buttonText}>Guardar rutina</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const navigation = useNavigation(); // Obtener la navegación

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorar Rutinas</Text>
      <FlatList
        data={routinesData}
        keyExtractor={(item) => item.id}
        renderItem={renderRoutine}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#232323',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E3433',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  cardDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  exerciseText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  noExercisesText: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 12,
  },
  exploreButton: {
    flex: 1, 
    backgroundColor: '#33e4db', 
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8, 
    alignItems: 'center',
  },
  saveButton: {
    flex: 1, 
    backgroundColor: '#E2F163', 
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});