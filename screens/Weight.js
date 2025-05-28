import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 7; // Ajusta el ancho para más números visibles

const WeightScreen = ({route, navigation}) => {
  const { fullName, email, password, age } = route.params;
  const [weightKg, setWeightKg] = useState(75); // Valor inicial en kg
  const [unit, setUnit] = useState('KG'); // KG o LB
  //const navigation = useNavigation();
  const scrollViewRef = useRef();

  useEffect(() => {
    // Centra el valor inicial al cargar
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: (weightKg - 30) * ITEM_WIDTH - (width - ITEM_WIDTH) / 2, animated: false });
    }
  }, []);

  const handleContinue = () => {
    // Aquí puedes guardar el peso (en la unidad seleccionada) y navegar a la siguiente pantalla (HeightScreen)
    console.log('Peso seleccionado:', getDisplayedWeight(), unit);
     const weightObject = {
      value: weightKg, // Siempre guarda el valor en KG y la unidad seleccionada
      unit: unit,
      timestamp: new Date().toISOString(), // Marca de tiempo para el registro
    };
    navigation.navigate('Height',{
      fullName,
      email,
      password,
      age,
      weight: weightObject,
    });
  };

  const changeUnit = (selectedUnit) => {
    setUnit(selectedUnit);
    // Aquí podrías convertir el peso si es necesario para mostrar en la nueva unidad
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newWeightKg = Math.round(contentOffset / ITEM_WIDTH) + 30;
    if (newWeightKg >= 30 && newWeightKg <= 200) {
      setWeightKg(newWeightKg);
    }
  };

  const getDisplayedWeight = () => {
    return unit === 'KG' ? weightKg : Math.round(weightKg * 2.20462);
  };

  const getWeightRange = () => {
    return Array.from({ length: 171 }, (_, i) => 30 + i);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>What Is Your Weight?</Text>
      <View style={styles.unitToggle}>
        <TouchableOpacity
          style={[styles.unitButton, unit === 'KG' && styles.unitButtonActive]}
          onPress={() => changeUnit('KG')}
        >
          <Text style={[styles.unitText, unit === 'KG' && styles.unitTextActive]}>KG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.unitButton, unit === 'LB' && styles.unitButtonActive]}
          onPress={() => changeUnit('LB')}
        >
          <Text style={[styles.unitText, unit === 'LB' && styles.unitTextActive]}>LB</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.weightText}>{getDisplayedWeight()}</Text>
      <Text style={styles.unitDisplayText}>{unit}</Text>
      <View style={styles.weightPicker}>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>▲</Text>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weightScrollViewContent}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {getWeightRange().map((w) => (
              <Text key={w} style={[styles.weightNumber, w === weightKg && styles.selectedWeight]}>{w}</Text>
            ))}
          </ScrollView>
          <View style={styles.tapeMeasure}>
            <View style={styles.indicator} />
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
  unitToggle: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 5,
  },
  unitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  unitButtonActive: {
    backgroundColor: '#22D3EE',
  },
  unitText: {
    color: '#CBD5E0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unitTextActive: {
    color: '#1E293B',
  },
  weightText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#CBD5E0',
    marginBottom: 10,
  },
  unitDisplayText: {
    color: '#94A3B8',
    fontSize: 20,
    marginBottom: 40,
  },
  weightPicker: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '93%',
    marginBottom: 50,
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
  continueButton: {
    backgroundColor: '#22D3EE',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  continueButtonText: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    backgroundColor: 'rgba(1, 255, 242, 0.09)',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    height: 50, // Altura de la "cinta métrica"
    overflow: 'hidden',
  },
  weightScrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.35, // Ajusta para centrar mejor
  },
  weightNumber: {
    fontSize: 20,
    color: '#64748B',
    width: ITEM_WIDTH,
    textAlign: 'center',
  },
  selectedWeight: {
    color: '#CBD5E0',
    fontWeight: 'bold',
    fontSize: 26,
  },
  tapeMeasure: {
    position: 'absolute',
    left: '50%',
    width: ITEM_WIDTH,
    height: '100%',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#22D3EE',
    transform: [{ translateX: -ITEM_WIDTH / 2 }], // Centra la "cinta"
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#22D3EE',
    transform: [{ translateY: -15 }],
  },
});

export default WeightScreen;