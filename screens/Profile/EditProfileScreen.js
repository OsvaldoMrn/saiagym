import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

// --- EditProfileScreen Component ---
const EditProfileScreen = () => {
  const navigation = useNavigation(); 

  // State variables for profile data (pre-filled with example data from the image)
  const [fullName, setFullName] = useState('Osvaldo Moreno');
  const [email, setEmail] = useState('dominguezmorenoosvaldo@gmail.com');
  const [mobileNumber, setMobileNumber] = useState('442 651 7505');
  const [weight, setWeight] = useState('72 Kg'); 
  const [height, setHeight] = useState('176 cm'); 

  // Placeholder for the "Update Profile" button action
  const handleUpdateProfile = () => {
    console.log('Profile data to update:', {
      fullName,
      email,
      mobileNumber,
      weight,
      height,
    });
    alert('¡Perfil actualizado!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< My Profile'}</Text>
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://placehold.co/120x120/334155/CBD5E0?text=Profile' }}
          style={styles.profilePicture}
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        />
        <TouchableOpacity style={styles.editProfilePictureButton}>
          <Text style={styles.editProfilePictureIcon}>✎</Text>
        </TouchableOpacity>
        <Text style={styles.profileName}>Osvaldo Moreno</Text>
        <Text style={styles.profileEmail}>dominguezmorenoosvaldo@gmail.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>72 Kg</Text>
          <Text style={styles.statLabel}>Peso</Text>
        </View>
        <View style={styles.statSeparator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>21</Text>
          <Text style={styles.statLabel}>Edad</Text>
        </View>
        <View style={styles.statSeparator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>176 cm</Text>
          <Text style={styles.statLabel}>Altura</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={fullName ? String(fullName) : ''}
          onChangeText={setFullName}
          placeholder="Full name"
          placeholderTextColor="#64748B"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email ? String(email) : ''}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#64748B"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Número Telefónico</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber ? String(mobileNumber) : ''}
          onChangeText={setMobileNumber}
          placeholder="Mobile Number"
          placeholderTextColor="#64748B"
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Peso</Text>
        <TextInput
          style={styles.input}
          value={weight ? String(weight) : ''}
          onChangeText={setWeight}
          placeholder="Weight"
          placeholderTextColor="#64748B"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Altura</Text>
        <TextInput
          style={styles.input}
          value={height ? String(height) : ''}
          onChangeText={setHeight}
          placeholder="Height"
          placeholderTextColor="#64748B"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Actualizar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(35, 35, 35, 1)',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#CBD5E0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#1E3433',
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#22D3EE',
  },
  editProfilePictureButton: {
    position: 'absolute',
    top: 80,
    right: '30%',
    backgroundColor: '#22D3EE',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfilePictureIcon: {
    color: '#1E293B',
    fontSize: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#CBD5E0',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 15,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CBD5E0',
  },
  statLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  statSeparator: {
    width: 1,
    height: '80%',
    backgroundColor: '#475569',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#CBD5E0',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#334155',
    color: '#CBD5E0',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#22D3EE',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  updateButtonText: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#334155',
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default EditProfileScreen;