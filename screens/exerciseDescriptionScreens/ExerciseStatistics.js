import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';

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

        const filtered = history.filter(session =>
          session.exercises.some(ex => ex.id === exercise.id)
        );

        const processedStats = filtered.map(session => {
          const ex = session.exercises.find(e => e.id === exercise.id);
          const volumes = ex.sets.map(set => {
            const weight = parseFloat(set.weight);
            const reps = parseInt(set.reps);
            return weight * reps;
          });

          const maxVolume = Math.max(...volumes);
          const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

          return {
            date: session.date,
            maxVolume,
            avgVolume,
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

  const labels = stats.map(item =>
    new Date(item.date).toLocaleDateString()
  );

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#1976D2',
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estadísticas del Ejercicio</Text>
      <Text style={styles.exerciseName}>{exercise.name}</Text>

      {stats.length === 0 ? (
        <Text>No hay datos de historial para este ejercicio.</Text>
      ) : (
        <>
          <Text style={styles.graphTitle}>Volumen máximo por sesión</Text>
          <LineChart
            data={{
              labels,
              datasets: [{ data: stats.map(item => item.maxVolume) }],
            }}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />

          <Text style={styles.graphTitle}>Volumen promedio por sesión</Text>
          <LineChart
            data={{
              labels,
              datasets: [{ data: stats.map(item => item.avgVolume) }],
            }}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#388E3C',
              },
            }}
            bezier
            style={styles.chart}
          />
        </>
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
  graphTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  chart: {
    marginBottom: 24,
    borderRadius: 8,
  },
});
