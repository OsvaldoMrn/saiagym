import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 40; // Altura de cada número en el scroll

const Height = () => {
  const [heightCm, setHeightCm] = useState(165); // Valor inicial en cm
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  useEffect(() => {
    // Centra el valor inicial al cargar (ajustado para el orden inverso)
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: (200 - heightCm) * ITEM_HEIGHT - (height / 2 - ITEM_HEIGHT / 2) , animated: false });
    }
  }, []);

  const handleContinue = () => {
    // Aquí puedes guardar la altura y navegar a la siguiente pantalla
    console.log('Altura seleccionada:', heightCm, 'cm');
    navigation.navigate('Goal');
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.y;
    const newHeightCm = 200 - Math.round(contentOffset / ITEM_HEIGHT); // Orden inverso
    if (newHeightCm >= 120 && newHeightCm <= 200) {
      setHeightCm(newHeightCm);
    }
  };

  const getHeightRange = () => {
    return Array.from({ length: 81 }, (_, i) => 200 - i); // Rango de 200 a 120 (orden descendente)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>What Is Your Height?</Text>
        <Text style={styles.heightText}>{heightCm} <Text style={styles.unitText}>cm</Text></Text>
        <View style={styles.heightPicker}>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>▲</Text>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView
              ref={scrollViewRef}
              vertical
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.heightScrollViewContent}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              inverted // Invierte el orden del ScrollView
            >
              {getHeightRange().map((h) => (
                <Text key={h} style={[styles.heightNumber, h === heightCm && styles.selectedHeight]}>{h}</Text>
              ))}
            </ScrollView>
            <View style={styles.tapeMeasure}>
              <View style={styles.indicator} />
            </View>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>▼</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between', // Distribuye el espacio entre el contenido y el botón
  },
  content: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: '#64748B',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#CBD5E0',
    marginTop: 80,
    marginBottom: 40,
  },
  heightText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#CBD5E0',
    marginBottom: 30,
  },
  unitText: {
    fontSize: 24,
    color: '#94A3B8',
  },
  heightPicker: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
    width: '80%',
    height: 200, // Ajusta la altura del selector
  },
  arrowContainer: {
    backgroundColor: 'transparent',
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  arrow: {
    color: '#64748B',
    fontSize: 16,
  },
  scrollContainer: {
    backgroundColor: 'rgba(1, 255, 242, 0.09)',
    width: 80, // Ancho del selector vertical
    alignItems: 'center', // Centra los números
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  heightScrollViewContent: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: height * 0.1, // Ajusta el padding vertical para centrar
  },
  heightNumber: {
    fontSize: 20,
    color: '#64748B',
    height: ITEM_HEIGHT,
    lineHeight: ITEM_HEIGHT,
    textAlign: 'center', // Centra el texto dentro de cada item
  },
  selectedHeight: {
    color: '#CBD5E0',
    fontWeight: 'bold',
    fontSize: 26,
  },
  tapeMeasure: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: ITEM_HEIGHT,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#22D3EE',
    transform: [{ translateY: -ITEM_HEIGHT / 2 }, { translateX: -40 }], // Ajusta translateX para centrar visualmente
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#22D3EE',
    transform: [{ translateX: -15 }],
  },
  continueButton: {
    backgroundColor: '#22D3EE',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginBottom: 30, // Espacio inferior para separarlo del borde
  },
  continueButtonText: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Height;