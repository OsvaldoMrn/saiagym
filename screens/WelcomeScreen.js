import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WelcomeScreen2 from './WelcomeScreen2';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Configura un temporizador para navegar a la siguiente pantalla después de 5 segundos (5000 ms)
    const timer = setTimeout(() => {
      // Aquí especificas a qué pantalla quieres navegar
      navigation.replace('Welcome2'); // Reemplaza 'Auth' con el nombre de tu siguiente pantalla
    }, 5000);

    // Limpia el temporizador si el componente se desmonta antes de que termine
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/background.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      />
      
      <View style={styles.content}>
      <Text style={styles.welcomeText}>Bienvenido a</Text>
        <Image
          source={require('../assets/icono.png')} // Reemplaza con la ruta de tu logo
          style={styles.logo}
        />
        <Text style={styles.welcomeTextUnder}>Saiagym</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semi-transparente para mejor legibilidad del texto
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
    welcomeTextUnder: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
});

export default WelcomeScreen;