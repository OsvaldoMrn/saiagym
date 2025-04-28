import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen () {
  // Datos mockeados
  const userName = 'Osvaldo';
  const progresoSemanal = {
    diasEntrenados: 3,
    diasObjetivo: 5,
    progreso: '60%',
  };

  const rutinaRecomendada = {
    titulo: 'Pierna explosiva',
    descripcion: 'Sentadilla, Prensa, Curl femoral, Peso muerto',
    imagen: 'https://i.imgur.com/1uKfXwU.jpg',
  };

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
        {/* Aquí luego se mete el gráfico */}
        <View style={styles.barraProgreso}>
          <View style={[styles.barraRelleno, { width: progresoSemanal.progreso }]} />
        </View>
      </View>

      {/* Recomendación */}
      <Text style={styles.subtitulo}>Rutina recomendada</Text>
      <View style={styles.card}>
        <Image source={{ uri: rutinaRecomendada.imagen }} style={styles.cardImage} />
        <Text style={styles.cardTitulo}>{rutinaRecomendada.titulo}</Text>
        <Text style={styles.cardDescripcion}>{rutinaRecomendada.descripcion}</Text>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Comenzar ahora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  saludo: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 8,
  },
  progressContainer: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 12,
  },
  progresoTexto: {
    fontSize: 16,
    marginBottom: 6,
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
    backgroundColor: '#f9f9f9',
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
  },
  cardDescripcion: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

