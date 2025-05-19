import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RoutineDetailsScreen({ route }) {
  const { routine } = route.params;
  const navigation = useNavigation();

  const [routineHistory, setRoutineHistory] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(null);

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

  const printRawHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('@training_history');
      console.log('Contenido crudo de @training_history:', data);
    } catch (e) {
      console.error('Error al leer @training_history:', e);
    }
  };

  const handleDeleteSession = async (sessionIndex) => {
    try {
      const data = await AsyncStorage.getItem('@training_history');
      const parsed = data ? JSON.parse(data) : [];
      // Filtra solo las sesiones de esta rutina
      const filtered = parsed.filter(session => session.routineName === routine.name);
      const globalIndex = parsed.findIndex(
        session => session.routineName === routine.name && filtered.indexOf(session) === sessionIndex
      );
      if (globalIndex !== -1) {
        parsed.splice(globalIndex, 1);
        await AsyncStorage.setItem('@training_history', JSON.stringify(parsed));
        setMenuVisible(false);
        setSelectedSessionIndex(null);
        loadHistory();
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo eliminar la sesión.');
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

        <TouchableOpacity style={styles.startButton} onPress={printRawHistory}>
          <Text style={styles.buttonText}>Imprimir crudo</Text>
        </TouchableOpacity>
      </View>

      {hasLoaded && (
        <View style={styles.historyContainer}>
          {routineHistory.length > 0 ? (
            <>
              <Text style={styles.historyTitle}>Historial de esta rutina:</Text>
              {routineHistory.map((session, index) => (
                <View key={index} style={styles.sessionItem}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.sessionText}>Fecha: {session.date ? new Date(session.date).toLocaleString() : 'Sin fecha'}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedSessionIndex(index);
                        setMenuVisible(true);
                      }}
                    >
                      <Text style={{ fontSize: 20, paddingHorizontal: 8 }}>⋮</Text>
                    </TouchableOpacity>
                  </View>
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

      {/* Menú desplegable para eliminar sesión */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleDeleteSession(selectedSessionIndex)}
            >
              <Text style={[styles.menuText, { color: 'red' }]}>Eliminar esta sesión</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    width: 180,
    elevation: 8,
    marginTop: 100,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
