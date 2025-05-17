import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const exercisesData = require('../assets/exercises.json');

export default function TrainingScreen({ navigation }) {
  const [userRoutines, setUserRoutines] = useState([]);

  useEffect(() => {
    const loadRoutines = async () => {
      try {
        const stored = await AsyncStorage.getItem('customRoutines');
        const parsed = stored ? JSON.parse(stored) : [];

        const routinesWithNames = parsed.map(routine => {
          const exerciseNames = routine.exercises.map(e => {
            const match = exercisesData.find(ex => ex.id === e.exerciseId);
            return match ? match.name : 'Ejercicio desconocido';
          });

          return {
            id: routine.id,
            title: routine.name,
            description: exerciseNames.join(', '),
            fullData: routine, // para usar más adelante si es necesario
          };
        });

        setUserRoutines(routinesWithNames);
      } catch (error) {
        console.error('Error al cargar rutinas:', error);
      }
    };

    loadRoutines();
  }, []);

  const renderRoutine = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardOptions}>⋮</Text>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('RoutineDetails', { routine: item.fullData })}
      >
        <Text style={styles.startButtonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchInput}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.searchPlaceholder}>Buscar ejercicio...</Text>
      </TouchableOpacity>

      <FlatList
        data={userRoutines}
        keyExtractor={(item) => item.id}
        renderItem={renderRoutine}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#666' }}>No hay rutinas guardadas.</Text>}
      />

      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Routines')}
      >
        <Text style={styles.exploreButtonText}>Explorar rutinas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Search')}
      >
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
  exploreButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#FF9800',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
