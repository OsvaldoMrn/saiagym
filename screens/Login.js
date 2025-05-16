import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'; // Importa Alert para mostrar mensajes

const Login = ({ navigation }) => {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  // URL base de tu backend. Asegúrate de que coincida con donde corre tu servidor.
  // Si estás en emulador Android o dispositivo físico, usa la IP de tu máquina en la red local.
  // Ejemplo para Android: http://192.168.1.XX:5000
  // Ejemplo para iOS/simulador: http://localhost:5000
  const BASE_URL = 'http://192.168.100.81:5000'; // O la IP de tu máquina si usas un dispositivo/emulador real

  const handleLogin = async () => {
    if (!usernameEmail || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    setLoading(true); // Activa el estado de carga

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: usernameEmail, // Asumimos que el backend espera 'email'
          password: password,
        }),
      });

      const data = await response.json(); // Parsea la respuesta JSON

      if (response.ok) { // Si la respuesta HTTP es 200 OK
        Alert.alert('¡Éxito!', data.message || 'Inicio de sesión exitoso');
        console.log('Usuario logueado:', data);
        // Aquí podrías guardar el ID del usuario o el email si lo necesitas para otras pantallas
        navigation.navigate('Home'); // Navega a la pantalla principal de tu app
      } else {
        // Si la respuesta HTTP no es 200 OK (ej. 401, 400, 500)
        Alert.alert('Error de inicio de sesión', data.message || 'Credenciales inválidas');
        console.error('Error del backend:', data.message);
      }
    } catch (error) {
      // Error de red, servidor no disponible, etc.
      console.error('Error de conexión:', error);
      Alert.alert('Error de conexión', 'No se pudo conectar al servidor. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false); // Desactiva el estado de carga, independientemente del resultado
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
    navigation.navigate('ForgottenPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.welcomeText}>Welcome</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or email"
        placeholderTextColor="#94A3B8" // Color para el placeholder
        value={usernameEmail}
        onChangeText={setUsernameEmail}
        keyboardType="email-address"
        autoCapitalize="none" // Para que no capitalice automáticamente el email
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#94A3B8" // Color para el placeholder
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste la contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading} // Deshabilita el botón mientras carga
      >
        <Text style={styles.loginButtonText}>
          {loading ? 'Iniciando Sesión...' : 'Log In'}
        </Text>
      </TouchableOpacity>

      <View style={styles.orSignUpWithContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>or sign up with</Text>
        <View style={styles.separator} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <View style={styles.socialIconContainer}>
          {/* Puedes usar un componente Image para el icono de Google */}
          <Text style={{ fontSize: 20, color: '#CBD5E0' }}>G</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomTextContainer} onPress={handleSignUp}>
        <Text style={styles.bottomText}>Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
      </TouchableOpacity>
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
    fontSize: 20,
    color: '#94A3B8',
    marginBottom: 30,
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
  orSignUpWithContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#475569',
  },
  orText: {
    color: '#64748B',
    marginHorizontal: 10,
  },
  socialButton: {
    backgroundColor: '#334155',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    alignSelf: 'center',
  },
  socialIconContainer: {
    // Estilos para el icono de Google
  },
  bottomTextContainer: {
    alignItems: 'center',
  },
  bottomText: {
    color: '#64748B',
    fontSize: 16,
  },
  signUpLink: {
    color: '#22D3EE',
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default Login;