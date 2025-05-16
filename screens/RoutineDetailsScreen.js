import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RoutineDetailsScreen({ route }) {
  const { routine } = route.params;
  const navigation = useNavigation();

  const [routineHistory, setRoutineHistory] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('@training_history');
      const parsed = data ? JSON.parse(data) : [];

      const filtered = parsed.filter(session => session.routineName === routine.name);

      setRoutineHistory(filtered);
      setHasLoaded(true);
    } catch (e) {
      console.error('Error al cargar historial:', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles de la Rutina</Text>
      <Text style={styles.routineName}>{routine.name}</Text>
      <Text style={styles.routineDescription}>{routine.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Exercise', { routine, startTime: Date.now() })}
        >
          <Text style={styles.buttonText}>Empezar rutina</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startButton} onPress={loadHistory}>
          <Text style={styles.buttonText}>Ver historial</Text>
        </TouchableOpacity>
      </View>

      {hasLoaded && (
        <View style={styles.historyContainer}>
          {routineHistory.length > 0 ? (
            <>
              <Text style={styles.historyTitle}>Historial de esta rutina:</Text>
              {routineHistory.map((session, index) => (
                <View key={index} style={styles.sessionItem}>
                  <Text style={styles.sessionText}>Fecha: {session.date ? new Date(session.date).toLocaleString() : 'Sin fecha'}</Text>
                  {session.exercises.map((ex, idx) => (
                    <View key={idx} style={styles.exerciseItem}>
                      <Text style={styles.exerciseName}>{ex.name}</Text>
                      {ex.sets.map((s, i) => (
                        <Text key={i} style={styles.setText}>
                          Serie {i + 1}: {s.reps} reps, {s.weight} kg, RPE {s.rpe}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </>
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 12 }}>Aún no has realizado esta rutina.</Text>
          )}
        </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  routineName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  routineDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  startButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyContainer: {
    marginTop: 20,
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sessionItem: {
    marginBottom: 12,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 6,
  },
  sessionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  exerciseItem: {
    marginTop: 4,
    paddingLeft: 8,
  },
  exerciseName: {
    fontWeight: 'bold',
  },
  setText: {
    fontSize: 12,
  },
});
