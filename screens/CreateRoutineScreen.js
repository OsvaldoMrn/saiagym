import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CreateRoutineScreen({ route }) {

    const navigation = useNavigation();
    // Recibe los ejercicios seleccionados desde los parámetros de navegación
    const { selectedExercises = [] } = route.params || {};

    // Inputs para nombre y descripción de la rutina
    const [routineName, setRoutineName] = useState('');
    const [routineDescription, setRoutineDescription] = useState('');

    // Estado para los sets de cada ejercicio
    const [sets, setSets] = useState(
        Object.fromEntries(selectedExercises.map(e => [e.id, '']))
    );

    const handleSetChange = (id, value) => {
        setSets(prev => ({
            ...prev,
            [id]: value.replace(/[^0-9]/g, '') // Solo números
        }));
    };

    const handleSave = async () => {
        if (!routineName.trim() || !routineDescription.trim()) {
            Alert.alert('Campos requeridos', 'Por favor ingresa nombre y descripción de la rutina.');
            return;
        }

        const newRoutine = {
            id: `r${Date.now()}`,
            name: routineName,
            description: routineDescription,
            exercises: selectedExercises.map(e => ({
                exerciseId: e.id,
                sets: parseInt(sets[e.id]) || 0
            }))
        };

        try {
            const stored = await AsyncStorage.getItem('customRoutines');
            const parsed = stored ? JSON.parse(stored) : [];

            const updatedRoutines = [...parsed, newRoutine];
            await AsyncStorage.setItem('customRoutines', JSON.stringify(updatedRoutines));

            Alert.alert('Éxito', 'Rutina guardada correctamente.');
            console.log('Rutina guardada:', newRoutine);
            navigation.navigate('Home'); 
        } catch (error) {
            console.error('Error al guardar la rutina:', error);
            Alert.alert('Error', 'No se pudo guardar la rutina.');
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Crear rutina</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la rutina"
                    value={routineName}
                    onChangeText={setRoutineName}
                />
                <TextInput
                    style={[styles.input, { height: 60 }]}
                    placeholder="Descripción"
                    value={routineDescription}
                    onChangeText={setRoutineDescription}
                    multiline
                />
                <Text style={styles.subtitle}>Ejercicios seleccionados:</Text>
                <FlatList
                    data={selectedExercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.exerciseName}>{item.name}</Text>
                            <Text style={styles.muscles}>
                                Músculos principales: {item.primaryMuscles.join(', ')}
                            </Text>
                            {item.secondaryMuscles.length > 0 && (
                                <Text style={styles.muscles}>
                                    Músculos secundarios: {item.secondaryMuscles.join(', ')}
                                </Text>
                            )}
                            <View style={styles.setsRow}>
                                <Text style={styles.setsLabel}>Número de sets:</Text>
                                <TextInput
                                    style={styles.setsInput}
                                    keyboardType="numeric"
                                    value={sets[item.id]}
                                    onChangeText={value => handleSetChange(item.id, value)}
                                    placeholder="0"
                                    maxLength={2}
                                />
                            </View>
                        </View>
                    )}
                    ListFooterComponent={
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Guardar rutina</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 10
    },
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    muscles: {
        fontSize: 14,
        color: '#555'
    },
    setsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    setsLabel: {
        fontSize: 14,
        marginRight: 8
    },
    setsInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: 50,
        fontSize: 14
    },
    saveButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});