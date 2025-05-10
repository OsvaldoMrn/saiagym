import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FillProfile = () => {
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { goal, activityLevel } = route.params || {}; // Get previous selections

  const handleStart = () => {
    // Here you would typically save the profile information, goal, and activity level
    console.log('Profile Data:', { fullName, nickname, email, mobileNumber, goal, activityLevel });
    // Navigate to the main app screen
    navigation.navigate('Home'); // Replace 'MainApp' with your actual main screen name
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Completa tu Perfil</Text>
      <View style={styles.profileImageContainer}>
        {/* Replace with actual image handling */}
        <Image
          source={require('../assets/img1.jpg')}  // Placeholder image
          style={styles.profileImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Madison Smith"
          placeholderTextColor="#666"
        />
        <Text style={styles.label}>Apodo</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Madison"
          placeholderTextColor="#666"
        />
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="madisons@example.com"
          placeholderTextColor="#666"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Número de móvil</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="+123 567 89000"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Empezar</Text>
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
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',

  },
  profileImageContainer: {
    backgroundColor: 'rgba(1, 255, 242, 0.09)',
    height: 100,
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#00FFFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FillProfile;