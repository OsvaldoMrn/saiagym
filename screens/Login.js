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
  const BASE_URL = 'http://192.168.100.81:5000'; // Local
  const AWS_API_URL = 'http://192.168.0.247:3000/api/users'; // Para registro
  const AWS_LOGIN_URL = 'http://192.168.0.247:3000/api/users/login'; // Para login

  const handleLogin = async () => {
    if (!usernameEmail || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    setLoading(true);

    try {
      // Solo login con AWS
      const awsResponse = await fetch(AWS_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: usernameEmail, password }),
      });
      const awsData = await awsResponse.json();

      if (awsResponse.ok) {
        Alert.alert('¡Éxito!', awsData.message || 'Inicio de sesión exitoso');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error de inicio de sesión', awsData.message || 'Credenciales inválidas');
      }
    } catch (error) {
      Alert.alert('Error de conexión', 'No se pudo conectar al servidor. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
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