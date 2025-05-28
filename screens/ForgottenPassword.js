import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ForgottenPassword = ({ navigation }) => {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = () => {
    
    console.log('Your email is:', usernameEmail);
    // Por ejemplo, podrías navegar a la pantalla principal:
     navigation.navigate('ResetPassword');
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
      
        <Text style={styles.welcomeText}>Ingresa tu E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@ejemplo.com"
        value={usernameEmail}
        onChangeText={setUsernameEmail}
        keyboardType="email-address"
      />
      
     

      <TouchableOpacity style={styles.loginButton} onPress={handleEmail}>
        <Text style={styles.loginButtonText}>Continuar</Text>
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
    justifyContent: 'center',
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

export default ForgottenPassword;