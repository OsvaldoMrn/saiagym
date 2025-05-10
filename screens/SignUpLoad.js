import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const SignUpLoad = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    // Aquí puedes navegar a la siguiente pantalla lógica de tu flujo de la aplicación
    navigation.navigate('Age'); // Por ejemplo, navegar a la pantalla principal
  };

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/img1.jpg')} // Reemplaza con la ruta correcta de tu imagen
        style={styles.backgroundImage}
      />
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>Consistency Is</Text>
        <Text style={styles.message}>The Key To Progress.</Text>
        <Text style={styles.message}>Don't Give Up!</Text>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B', // El color de fondo oscuro de tu aplicación
    flex: 1,
  },
  imageContainer: {
    flex: 1, // La imagen ocupará la mayor parte del espacio vertical
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 50, // Espacio en la parte inferior para el texto
    alignItems: 'center',
    justifyContent: 'flex-end', // Alinea el contenido al final del contenedor
    paddingTop: 20, 
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'bottom',
    paddingTop: 10,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#22D3EE', // El color turquesa de tus botones
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  nextButtonText: {
    color: '#1E293B', // El color de texto oscuro de tus botones
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpLoad;