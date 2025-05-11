import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/saya.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>SAIAGYM</Text>
      <Text style={styles.subtitle}>
        Tu compañero ideal para alcanzar tus metas de entrenamiento.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Login')} // Navega a la pantalla principal
      >
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#00FFFF', // Azul eléctrico
  },
  subtitle: {
    fontSize: 16,
    color: '#00FFFF', // Azul eléctrico
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});