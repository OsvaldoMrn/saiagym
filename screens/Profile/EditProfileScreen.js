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
import { useNavigation } from '@react-navigation/native'; // Solo este import es necesario

// --- EditProfileScreen Component ---
const EditProfileScreen = () => {
  const navigation = useNavigation(); // Hook for navigation, even if not used for actual navigation in this single-screen setup

  // State variables for profile data (pre-filled with example data from the image)
  const [fullName, setFullName] = useState('Madison Smith');
  const [email, setEmail] = useState('madisons@example.com');
  const [mobileNumber, setMobileNumber] = useState('+123 567 89000');
  const [dateOfBirth, setDateOfBirth] = useState('01/04/199X'); // Display as string
  const [weight, setWeight] = useState('75 Kg'); // Display as string
  const [height, setHeight] = useState('1.65 CM'); // Display as string

  // Placeholder for the "Update Profile" button action
  const handleUpdateProfile = () => {
    // This is where the actual logic to send data to a backend would go.
    // For now, it just logs the data and shows an alert.
    console.log('Profile data to update:', {
      fullName,
      email,
      mobileNumber,
      dateOfBirth,
      weight,
      height,
    });
    alert('¡Perfil actualizado! (Solo demostración)');
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
        <Text style={styles.profileName}>Madison Smith</Text>
        <Text style={styles.profileEmail}>madisons@example.com</Text>
        <Text style={styles.profileBirthday}>Birthday: April 1st</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>75 Kg</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
        <View style={styles.statSeparator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>28</Text>
          <Text style={styles.statLabel}>Years Old</Text>
        </View>
        <View style={styles.statSeparator} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1.65 CM</Text>
          <Text style={styles.statLabel}>Height</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Full name</Text>
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
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber ? String(mobileNumber) : ''}
          onChangeText={setMobileNumber}
          placeholder="Mobile Number"
          placeholderTextColor="#64748B"
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Date of birth</Text>
        <TextInput
          style={styles.input}
          value={dateOfBirth ? String(dateOfBirth) : ''}
          onChangeText={setDateOfBirth}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#64748B"
        />
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          value={weight ? String(weight) : ''}
          onChangeText={setWeight}
          placeholder="Weight"
          placeholderTextColor="#64748B"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Height</Text>
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
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// --- Styles for the MyProfileScreen ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B', // Dark background
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 60, // Adjust padding for different platforms
  },
  contentContainer: {
    alignItems: 'center', // Center content horizontally
    paddingBottom: 100, // Space for the bottom navigation bar
  },
  backButton: {
    alignSelf: 'flex-start', // Align to the left
    marginBottom: 20,
  },
  backButtonText: {
    color: '#CBD5E0', // Light text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#334155', // Darker background for header section
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular image
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#22D3EE', // Turquoise border
  },
  editProfilePictureButton: {
    position: 'absolute',
    top: 80,
    right: '30%', // Adjust position relative to header width
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
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 5,
  },
  profileBirthday: {
    fontSize: 14,
    color: '#94A3B8',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(1, 255, 242, 0.09)', // Light turquoise background
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
    backgroundColor: '#475569', // Separator color
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
    backgroundColor: '#334155', // Darker background for inputs
    color: '#CBD5E0',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#22D3EE', // Turquoise button
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  updateButtonText: {
    color: '#1E293B', // Dark text on button
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#334155', // Dark bottom nav background
    width: '100%',
    height: 70,
    position: 'absolute', // Position at the bottom
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