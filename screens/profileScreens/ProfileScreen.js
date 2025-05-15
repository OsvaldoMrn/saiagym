import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const ProfileScreen = () => {
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        dateOfBirth: '',
        weight: '',
        height: '',
    });

    useEffect(() => {
        // Cargar datos del perfil desde el servidor
        const fetchProfile = async () => {
            const response = await axios.get('https://tuapi.com/profile');
            setProfile(response.data);
        };
        fetchProfile();
    }, []);

    const handleInputChange = (name, value) => {
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async () => {
        await axios.put('https://tuapi.com/profile', profile);
        alert('Perfil actualizado con éxito!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={profile.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={profile.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={profile.mobileNumber}
                onChangeText={(value) => handleInputChange('mobileNumber', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={profile.dateOfBirth}
                onChangeText={(value) => handleInputChange('dateOfBirth', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Weight"
                value={profile.weight}
                onChangeText={(value) => handleInputChange('weight', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Height"
                value={profile.height}
                onChangeText={(value) => handleInputChange('height', value)}
            />
            <Button title="Update Profile" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#001e3c',
        flex: 1,
    },
    header: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        color: '#fff',
    },
});

export default ProfileScreen;
