import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExerciseHistory({ exercise }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const rawData = await AsyncStorage.getItem('@training_history');
        if (!rawData) return;

        const sessions = JSON.parse(rawData);
        // Filtramos todas las sesiones que contienen este ejercicio
        const filtered = [];

        for (const session of sessions) {
          const matchingExercise = session.exercises.find(
            (ex) => ex.id === exercise.id
          );
          if (matchingExercise) {
            filtered.push({
              date: new Date(session.date),
              sets: matchingExercise.sets,
            });
          }
        }

        // Ordenamos por fecha descendente (más reciente primero)
        filtered.sort((a, b) => b.date - a.date);

        setHistory(filtered);
      } catch (err) {
        console.error('Error al cargar historial:', err);
      }
    };

    fetchHistory();
  }, [exercise]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.sessionContainer}>
      <Text style={styles.sessionDate}>📅 {formatDate(item.date)}</Text>
      {item.sets.map((set, index) => (
        <Text key={index} style={styles.setInfo}>
          Serie {index + 1}: {set.weight}kg × {set.reps} reps (RPE {set.rpe})
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de {exercise.name}</Text>
      {history.length === 0 ? (
        <Text style={styles.noData}>No hay registros previos para este ejercicio.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 24,
  },
  sessionContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#1E3433',
    borderRadius: 8,
  },
  sessionDate: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  setInfo: {
    fontSize: 14,
    color: '#fff',
  },
});
