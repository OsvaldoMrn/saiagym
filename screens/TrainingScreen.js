import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Cargar el archivo JSON de ejercicios
const exercisesData = require('../assets/exercises.json'); // Ruta al archivo JSON

export default function TrainingScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);
  
  // Aquí las rutinas guardadas por el usuario
  const mockRoutines = [
    {
      id: '1',
      title: 'Rutina de fuerza',
      description: 'Sentadilla, Peso muerto, Press banca, Dominadas',
    },
    {
      id: '2',
      title: 'Full Body Express',
      description: 'Burpees, Jump squats, Flexiones, Planchas',
    },
    {
      id: '3',
      title: 'Hipertrofia piernas',
      description: 'Prensa, Curl femoral, Extensiones, Zancadas',
    },
  ];

  const renderRoutine = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardOptions}>⋮</Text>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda para acceder a SearchScreen */}
      <TouchableOpacity
        style={styles.searchInput}
        onPress={() => navigation.navigate('Search')} // Navega a la pantalla de búsqueda de ejercicios
      >
        <Text style={styles.searchPlaceholder}>Buscar ejercicio...</Text>
      </TouchableOpacity>

      {/* Lista de rutinas guardadas */}
      <FlatList
        data={mockRoutines}
        keyExtractor={(item) => item.id}
        renderItem={renderRoutine}
        contentContainerStyle={styles.listContent}
      />

      {/* Botón crear rutina */}
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>+ Crear rutina</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: 14,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardOptions: {
    fontSize: 18,
    color: '#999',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
