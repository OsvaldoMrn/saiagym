import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Goal = () => {
  const [selectedGoal, setSelectedGoal] = useState('');
  const navigation = useNavigation();

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      navigation.navigate('ActivityLevel', { goal: selectedGoal });
    } else {
      // Optionally show an error message if no goal is selected
      console.warn('Please select a goal');
    }
  };

  const goals = [
    'Perder Peso',
    'Ganar Peso',
    'Ganar Masa Muscular',
    'Moldear el Cuerpo',
    'Otros',
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>¿Cuál es tu meta?</Text>

      <View style={styles.optionsContainer}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal}
            style={[
              styles.optionButton,
              selectedGoal === goal && styles.selectedOptionButton,
            ]}
            onPress={() => handleGoalSelection(goal)}
          >
            <Text style={styles.optionText}>{goal}</Text>
            <View style={styles.radioButton}>
              {selectedGoal === goal && <View style={styles.radioInner} />}
            </View>
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
    backgroundColor: '#1E293B', // Match the dark background
    padding: 20,
  },
  backButton: {
   
    marginTop: 40,
  },
  backButtonText: {
    color: '#fff', // Adjust color
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
    backgroundColor: 'rgba(1, 255, 242, 0.09)',
    marginBottom: 40,
    borderRadius: 10,
    width: '100%',
    height: '60%',
    alignContent : 'center',
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: '#fff', // Adjust button background color
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    borderColor: '#333',
    borderRadius: 20, 
    padding: 20,
    margin: 15,
  },
  selectedOptionButton: {
    backgroundColor: 'rgba(255,255,255,0.5)', // Color when selected
  },
  optionText: {
    color: '#000',
    fontSize: 18,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff', // Color when selected
  },
  continueButton: {
    backgroundColor: '#00FFFF', // Match the button color
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

export default Goal;