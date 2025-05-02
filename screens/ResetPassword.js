import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const navigation = useNavigation();

  const handlePassword = () => {
    // Simulación de la lógica de cambio de contraseña exitoso
    setShowMessage(true);
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <Text style={styles.welcomeText}>Ingresa tu nueva contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu nueva contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.welcomeText}>Confirma tu nueva contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirma tu nueva contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handlePassword}>
        <Text style={styles.loginButtonText}>Confirmar</Text>
      </TouchableOpacity>

      {showMessage && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Tu contraseña ha sido cambiada con éxito, inicia sesión.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B', // Fondo oscuro
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#64748B',
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#CBD5E0',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#334155',
    color: '#CBD5E0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#22D3EE', // Color turquesa
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.8)', // Verde claro con opacidad
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ResetPassword;