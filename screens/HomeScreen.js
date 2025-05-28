import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exercisesData from '../assets/exercises.json'; 

export default function HomeScreen () {
  const userName = 'Usuario'; // Aquí podrías obtener el nombre del usuario desde AsyncStorage o props
  const progresoSemanal = {
    diasEntrenados: 3,
    diasObjetivo: 5,
    progreso: '60%',
  };

  const rutinaMock = {
    titulo: 'Pierna explosiva',
    descripcion: 'Sentadilla, Prensa, Curl femoral, Peso muerto',
    imagen: 'https://i.imgur.com/1uKfXwU.jpg',
  };

  const [rutinaRecomendada, setRutinaRecomendada] = useState(rutinaMock);

  useEffect(() => {
    const fetchRandomRoutine = async () => {
      try {
        const stored = await AsyncStorage.getItem('customRoutines');
        const parsed = stored ? JSON.parse(stored) : [];
        if (parsed.length > 0) {
          const randomIndex = Math.floor(Math.random() * parsed.length);
          const rutina = parsed[randomIndex];
          const descripcion = rutina.exercises && rutina.exercises.length > 0
            ? rutina.exercises.map(e => {
                const match = exercisesData.find(ex => ex.id === e.exerciseId);
                return match ? match.name : 'Ejercicio desconocido';
              }).join(', ')
            : 'Sin ejercicios';
          setRutinaRecomendada({
            titulo: rutina.name || 'Rutina personalizada',
            descripcion,
          });
        }
      } catch (e) {
        setRutinaRecomendada(rutinaMock);
      }
    };
    fetchRandomRoutine();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Saludo */}
      <Text style={styles.saludo}>Bienvenido, {userName} 👋</Text>
      <Text style={styles.subtitulo}>Tu progreso esta semana:</Text>

      {/* Progreso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progresoTexto}>
          {progresoSemanal.diasEntrenados}/{progresoSemanal.diasObjetivo} días entrenados ({progresoSemanal.progreso})
        </Text>
        <View style={styles.barraProgreso}>
          <View style={[styles.barraRelleno, { width: progresoSemanal.progreso }]} />
        </View>
      </View>

      {/* Recomendación */}
      <Text style={styles.subtitulo}>Rutina recomendada</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{rutinaRecomendada.titulo}</Text>
        <Text style={styles.cardDescripcion}>{rutinaRecomendada.descripcion}</Text>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Comenzar ahora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#232323',
  },
  saludo: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 8,
    color: '#fff',
  },
  progressContainer: {
    backgroundColor: '#1E3433',
    padding: 12,
    borderRadius: 12,
  },
  progresoTexto: {
    fontSize: 16,
    marginBottom: 6,
    color: '#fff',
  },
  barraProgreso: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barraRelleno: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  card: {
    backgroundColor: '#1E3433',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
    color: '#fff',
  },
  cardDescripcion: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#33e4db',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});

