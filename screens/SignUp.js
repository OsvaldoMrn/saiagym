import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [loadingEmailCheck, setLoadingEmailCheck] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

  const [formError, setFormError] = useState('');

  const API_BASE_URL = 'http://192.168.100.81:5000'; // Asegúrate de que esta URL sea correcta

  const isValidEmail = (emailString) => {
    return /\S+@\S+\.\S+/.test(emailString);
  };

  const checkEmailAvailability = async () => {
    setLoadingEmailCheck(true);
    setEmailError('');
    setIsEmailAvailable(false); // Resetear antes de la verificación

    if (!email.trim() || !isValidEmail(email)) {
      setEmailError('Formato de correo electrónico inválido.');
      setLoadingEmailCheck(false);
      return;
    }

    try {
        // CORREGIDO: Asegúrate de que la URL no tenga caracteres extra.
      const response = await fetch(`${API_BASE_URL}/api/users/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json(); // <-- AHORA QUE LA CONEXIÓN FUNCIONA, ESTO DEBE SER JSON

        // --- NUEVOS CONSOLE.LOGS EN checkEmailAvailability ---
        console.log('--- checkEmailAvailability response ---');
        console.log('Response Status:', response.status);
        console.log('Response OK:', response.ok);
        console.log('Response Data:', data);
        console.log('Email exists in data:', data.exists);
        // -----------------------------------------------------

      if (response.ok) {
        if (data.exists) {
          setEmailError('Este correo electrónico ya está registrado.');
          setIsEmailAvailable(false);
        } else {
          setEmailError('');
          setIsEmailAvailable(true); // ¡El email está disponible!
        }
      } else {
        setEmailError(data.message || 'Error al verificar el correo.');
        setIsEmailAvailable(false);
      }
    } catch (error) {
      console.error('Error en checkEmailAvailability (catch block):', error); // Si hay un error al parsear JSON o de red
      setEmailError('No se pudo conectar al servidor para verificar el correo.');
      setIsEmailAvailable(false);
    } finally {
      setLoadingEmailCheck(false);
        // --- NUEVO CONSOLE.LOG AL FINAL DE checkEmailAvailability ---
        console.log('Final isEmailAvailable state after check:', isEmailAvailable); // Ojo: Este puede ser el valor *antes* de que el estado se actualice en el render
        // -----------------------------------------------------
    }
  };

  const handleSignUp = async () => {
        // --- CONSOLE.LOGS AL INICIO DE handleSignUp ---
        console.log('handleSignUp called');
        setFormError('');
        console.log('emailError (inicio):', emailError);
        setEmailError(''); // Se establece a vacío
        console.log('isEmailAvailable (inicio):', isEmailAvailable);
        // ---------------------------------------------------

        if (!fullName || !email || !password || !confirmPassword) {
            setFormError('Por favor, completa todos los campos.');
            console.log('Validation failed: Missing fields.'); // <-- Nuevo log
            return;
        }
        if (!isValidEmail(email)) {
            setFormError('El formato del correo electrónico es inválido.');
            console.log('Validation failed: Invalid email format.'); // <-- Nuevo log
            return;
        }
        if (password !== confirmPassword) {
            setFormError('Las contraseñas no coinciden.');
            console.log('Validation failed: Passwords do not match.'); // <-- Nuevo log
            return;
        }
        if (password.length < 6) {
            setFormError('La contraseña debe tener al menos 6 caracteres.');
            console.log('Validation failed: Password too short.'); // <-- Nuevo log
            return;
        }

        // --- CONSOLE.LOG ANTES DE LA LLAMADA AL CHECK DE EMAIL ---
        console.log('All local validations passed. Calling checkEmailAvailability...');
        // ---------------------------------------------------------

        await checkEmailAvailability(); // Espera a que termine la verificación de la API

        // --- CONSOLE.LOG DESPUÉS DE LA LLAMADA AL CHECK DE EMAIL ---
        // IMPORTANTE: isEmailAvailable puede no reflejar el último estado si React aún no ha re-renderizado
        // por eso es clave el console.log dentro de checkEmailAvailability
        console.log('checkEmailAvailability finished. Current isEmailAvailable state:', isEmailAvailable);
        // -------------------------------------------------------------

        if (!isEmailAvailable) { // Si el correo NO está disponible (ya existe o hubo error de conexión)
            console.log('Email not available. Stopping sign up process.'); // <-- Nuevo log
            return; // Detenemos el proceso de registro
        }

        // --- CONSOLE.LOG SI EL EMAIL ESTÁ DISPONIBLE Y SE VA A NAVEGAR ---
        console.log('Email is available! Proceeding to navigation.');
        // -------------------------------------------------------------

        console.log('Signing up with:', fullName, email, password, confirmPassword);
        navigation.navigate('Age', {
            fullName,
            email,
            password,
        });
    };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.letsStartText}>Let's Start!</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email or Mobile Number"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onEndEditing={checkEmailAvailability} // Check email on focus loss
      />
       {loadingEmailCheck && <ActivityIndicator size="small" color="#22D3EE" style={styles.spinner} />}
        {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
        ) : isEmailAvailable && email.trim() && isValidEmail(email) ? (
            <Text style={styles.successText}>Correo disponible</Text>
        ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {formError ? <Text style={styles.errorText}>{formError}</Text> : null} {/* Mostrar errores generales del formulario */}

      <Text style={styles.termsText}>By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>.</Text>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.orSignUpWithContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>or sign up with</Text>
        <View style={styles.separator} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <View style={styles.socialIconContainer}>
          {/* Puedes usar un componente Image para el icono de Google */}
          <Text style={{ fontSize: 20 }}>G</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomTextContainer} onPress={handleLogin}>
        <Text style={styles.bottomText}>Already have an account? <Text style={styles.loginLink}>Log In</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    // ... tus estilos actuales (no modificados)
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
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
  letsStartText: {
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
  termsText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    color: '#22D3EE',
  },
  signUpButton: {
    backgroundColor: '#22D3EE',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
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
  loginLink: {
    color: '#22D3EE',
  },
    errorText: {
        color: '#EF4444', // Rojo para errores
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        width: '90%',
    },
    successText: {
        color: '#10B981', // Verde para éxito
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        width: '90%',
    },
    spinner: {
        marginBottom: 10,
        marginTop: 10,
   },
});

export default SignUp;