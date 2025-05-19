import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExerciseStatistics({ exercise }) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const historyRaw = await AsyncStorage.getItem('@training_history');
        if (!historyRaw) {
          setStats([]);
          return;
        }
        const history = JSON.parse(historyRaw);

        // Filtrar sesiones donde aparece el ejercicio actual
        const filtered = history.filter(session =>
          session.exercises.some(ex => ex.id === exercise.id)
        );

        // Procesar cada sesión
        const processedStats = filtered.map(session => {
          const ex = session.exercises.find(e => e.id === exercise.id);

          // Calcular volumen por serie y obtener máximo y promedio
          const volumes = ex.sets.map(set => {
            const weight = parseFloat(set.weight);
            const reps = parseInt(set.reps);
            return weight * reps;
          });

          const maxVolume = Math.max(...volumes);
          const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
          const seriesCount = volumes.length;

          return {
            date: session.date,
            maxVolume,
            avgVolume,
            seriesCount,
          };
        });

        setStats(processedStats);
      } catch (error) {
        console.error('Error loading training history:', error);
        setStats([]);
      }
    };

    loadStats();
  }, [exercise]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estadísticas del Ejercicio</Text>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      {stats.length === 0 ? (
        <Text>No hay datos de historial para este ejercicio.</Text>
      ) : (
        stats.map((item, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.date}>
              Fecha: {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text>Volumen máximo en una serie: {item.maxVolume.toFixed(2)}</Text>
            <Text>
              Volumen promedio en {item.seriesCount} serie{item.seriesCount > 1 ? 's' : ''}: {item.avgVolume.toFixed(2)}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  statItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
