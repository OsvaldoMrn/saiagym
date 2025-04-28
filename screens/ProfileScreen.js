import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nombre del Usuario</Text>
        <Text style={styles.email}>correo@ejemplo.com</Text>
      </View>

      {/* Tabla de datos físicos */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Edad</Text>
          <Text style={styles.statValue}>25</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Peso</Text>
          <Text style={styles.statValue}>70 kg</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Altura</Text>
          <Text style={styles.statValue}>175 cm</Text>
        </View>
      </View>

      {/* Opciones */}
      <View style={styles.optionsContainer}>
        {['Editar perfil', 'Ajustes', 'Política de privacidad', 'Ayuda', 'Cerrar sesión'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.optionButton}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 10,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
  },
});
