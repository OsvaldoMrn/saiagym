import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ActivityLevel = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { goal } = route.params || {}; // Get the selected goal

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
  };

  const handleContinue = () => {
    if (selectedLevel) {
      navigation.navigate('FillProfile', { goal: goal, activityLevel: selectedLevel });
    } else {
      console.warn('Please select your activity level');
    }
  };

  const levels = ['Principiante', 'Intermedio', 'Avanzado'];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Nivel de Actividad Física</Text>
      <View style={styles.optionsContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.levelButton,
              selectedLevel === level && styles.selectedLevelButton,
            ]}
            onPress={() => handleLevelSelection(level)}
          >
            <Text style={styles.levelText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
    marginBottom: 30,
  },
  optionsContainer: {
    
    marginBottom: 40,
    borderRadius: 10,
    width: '100%',
    height: '60%',
    alignContent : 'center',
    justifyContent: 'center',
  },
  levelButton: {
    backgroundColor: '#fff', // Adjust button background color
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedLevelButton: {
    backgroundColor: 'rgba(1, 255, 242, 0.09)',  },
  levelText: {
    color: '#000',
    fontSize: 18,
  },
  selectedLevelText: {
    color: '#000', // Text color when selected
  },
  continueButton: {
    backgroundColor: '#00FFFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ActivityLevel;