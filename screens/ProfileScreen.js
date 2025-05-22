import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getUserById } from '../api';

export default function ProfileScreen({ route }) {
  const [user, setUser] = useState(null);
  const userId = route.params?.userId; // O recupéralo de AsyncStorage

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        alert('Error al cargar usuario: ' + (error.response?.data?.message || error.message));
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  if (!user) return <Text>Cargando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Tabla de datos físicos */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Edad</Text>
          <Text style={styles.statValue}>
            {/* Si tienes dateOfBirth en user, puedes calcular la edad */}
            {user.dateOfBirth ? calcularEdad(user.dateOfBirth) : 'N/A'}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Peso</Text>
          <Text style={styles.statValue}>
            {user.weight ? `${user.weight} kg` : 'N/A'}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Altura</Text>
          <Text style={styles.statValue}>
            {user.height ? `${user.height} cm` : 'N/A'}
          </Text>
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

// Agrega esta función fuera del componente para calcular la edad:
function calcularEdad(dateOfBirth) {
  const hoy = new Date();
  const nacimiento = new Date(dateOfBirth);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}
