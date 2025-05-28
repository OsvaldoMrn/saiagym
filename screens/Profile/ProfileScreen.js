import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de tener este paquete instalado

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Limpia todos los datos guardados (o usa removeItem('token') si solo guardas el token)
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeStack' }],
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
    }
  };

  const handleOptionPress = (option) => {
    if (option === 'Editar perfil') navigation.navigate('EditProfile');
    else if (option === 'Ayuda') navigation.navigate('Help');
    else if (option === 'Política de privacidad') navigation.navigate('PrivacyPolicy');
    else if (option === 'Cerrar sesión') {
      Alert.alert(
        'Cerrar sesión',
        '¿Estás seguro que deseas cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Cerrar sesión', style: 'destructive', onPress: handleLogout },
        ]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
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
        {['Editar perfil', 'Política de privacidad', 'Ayuda', 'Cerrar sesión'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleOptionPress(item)}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#232323',

  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#232323',

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
    color: '#fff',
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
    color: '#fff',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    color: '#fff',
  },
});