import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen2 = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.replace('Login'); // O 'Home', dependiendo de a dónde quieras ir
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/background2.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Image
          source={require('../assets/Work Out.png')}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>¡Empieza hoy tu viaje hacia una vida más activa!</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
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
    width: width,
    height: height,
    position: 'absolute',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    width: 50, // Ajusta el tamaño según tu diseño
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20, // Añadido para evitar que el texto se pegue a los bordes
  },
  button: {
    backgroundColor: 'rgba(1, 255, 242, 0.09)', // Un color azul de ejemplo, ¡cámbialo!
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    borderRadius: 20,
     // Propiedades para la sombra (iOS)
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    // Propiedad para la elevación (Android)
    elevation: 50,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen2;