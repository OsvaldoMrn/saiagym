import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 7; // Ajusta el ancho para más números visibles

const Age = () => {
  const [age, setAge] = useState(28);
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  useEffect(() => {
    // Centra el valor inicial al cargar
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: (age - 10) * ITEM_WIDTH - (width - ITEM_WIDTH) / 2, animated: false });
    }
  }, []);

  const handleContinue = () => {
    console.log('Edad seleccionada:', age);
    navigation.navigate('Weight');
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newAge = Math.round(contentOffset / ITEM_WIDTH) + 10;
    if (newAge >= 10 && newAge <= 100) {
      setAge(newAge);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>How Old Are You?</Text>
      <Text style={styles.ageText}>{age}</Text>
      <View style={styles.agePicker}>
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
            contentContainerStyle={styles.ageScrollViewContent}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {Array.from({ length: 91 }, (_, i) => 10 + i).map((year) => (
              <Text key={year} style={[styles.ageNumber, year === age && styles.selectedAge]}>{year}</Text>
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
  ageText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#CBD5E0',
    marginBottom: 30,
  },
  agePicker: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
    width: '80%',
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
  ageScrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.3, // Ajusta para centrar mejor
  },
  ageNumber: {
    fontSize: 20,
    color: '#64748B',
    width: ITEM_WIDTH,
    textAlign: 'center',
  },
  selectedAge: {
    color: '#CBD5E0',
    fontWeight: 'bold',
    fontSize: 26,
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

export default Age;