import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importar los datos de rutinas y ejercicios
const routinesData = require('../assets/routines.json');
const exercisesData = require('../assets/exercises.json');

export default function RoutinesScreen() {
  // Función para obtener los detalles de los ejercicios de una rutina
  const getExercisesForRoutine = (exerciseIds) => {
    return exercisesData.filter((exercise) => exerciseIds.includes(exercise.id));
  };

  const navigation = useNavigation(); // Obtener la navegación

  // Renderizar cada rutina
  const renderRoutine = ({ item }) => {
    const exercises = getExercisesForRoutine(item.exercises); // Obtener los ejercicios de la rutina

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.sectionTitle}>Ejercicios:</Text>
        {exercises.map((exercise) => (
          <Text key={exercise.id} style={styles.exerciseText}>
            - {exercise.name}
          </Text>
        ))}

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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exerciseText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row', // Alinear los botones horizontalmente
    justifyContent: 'space-between', // Espacio entre los botones
    marginTop: 12,
  },
  exploreButton: {
    flex: 1, // Ocupa el mismo espacio que el otro botón
    backgroundColor: '#2196F3', // Color de fondo para "Explorar rutina"
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8, // Espacio entre los botones
    alignItems: 'center',
  },
  saveButton: {
    flex: 1, // Ocupa el mismo espacio que el otro botón
    backgroundColor: '#4CAF50', // Color de fondo para "Guardar rutina"
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});