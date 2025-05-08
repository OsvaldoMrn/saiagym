import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RoutineDetailsScreen({ route }) {
  const { routine } = route.params; 

  const navigation = useNavigation(); // Obtener la navegación
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Rutina</Text>
      <Text style={styles.routineName}>{routine.name}</Text>
      <Text style={styles.routineDescription}>{routine.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Exercise', { routine, startTime: Date.now() })} // Navegar a ExerciseScreen con los datos de la rutina
        >
          <Text style={styles.buttonText}>Empezar rutina</Text>
        </TouchableOpacity>
      </View>
      
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
  buttonContainer: {
    flexDirection: 'row', // Alinear los botones horizontalmente
    justifyContent: 'space-between', // Espacio entre los botones
    marginTop: 12,
  },
  startButton: {
    flex: 1, // Ocupa el mismo espacio que el otro botón
    backgroundColor: '#2196F3', // Color de fondo para "Explorar rutina"
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8, // Espacio entre los botones
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});