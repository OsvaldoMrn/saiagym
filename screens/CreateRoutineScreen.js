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
        Object.fromEntries(selectedExercises.map(e => [
            e.id,
            [{ id: 1, weight: '', reps: '', rpe: '' }]
        ]))
    );

    const addSet = (exerciseId) => {
        setSets(prev => {
            const current = prev[exerciseId] || [];
            const newId = current.length > 0 ? current[current.length - 1].id + 1 : 1;
            return {
                ...prev,
                [exerciseId]: [
                    ...current,
                    { id: newId, weight: '', reps: '', rpe: '' }
                ]
            };
        });
    };

    const removeSet = (exerciseId) => {
        setSets(prev => {
            const current = prev[exerciseId] || [];
            if (current.length > 1) {
                return {
                    ...prev,
                    [exerciseId]: current.slice(0, -1)
                };
            }
            return prev;
        });
    };

    const updateSetRow = (exerciseId, rowId, field, value) => {
        setSets(prev => {
            const current = prev[exerciseId] || [];
            const updated = current.map(row =>
                row.id === rowId ? { ...row, [field]: value } : row
            );
            return {
                ...prev,
                [exerciseId]: updated
            };
        });
    };

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
                sets: (sets[e.id] || []).length 
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
                            {/* Tabla de sets */}
                            <View style={styles.exerciseTable}>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.tableHeaderCell}>#</Text>
                                    <Text style={styles.tableHeaderCell}>Peso</Text>
                                    <Text style={styles.tableHeaderCell}>Reps</Text>
                                    <Text style={styles.tableHeaderCell}>RPE</Text>
                                </View>
                                {(sets[item.id] || []).map((row) => (
                                    <View key={`${item.id}-${row.id}`} style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{row.id}</Text>
                                        <TextInput
                                            style={styles.tableInput}
                                            keyboardType="numeric"
                                            value={row.weight}
                                            onChangeText={value => updateSetRow(item.id, row.id, 'weight', value)}
                                            placeholder="Peso"
                                        />
                                        <TextInput
                                            style={styles.tableInput}
                                            keyboardType="numeric"
                                            value={row.reps}
                                            onChangeText={value => updateSetRow(item.id, row.id, 'reps', value)}
                                            placeholder="Reps"
                                        />
                                        <TextInput
                                            style={styles.tableInput}
                                            keyboardType="numeric"
                                            value={row.rpe}
                                            onChangeText={value => updateSetRow(item.id, row.id, 'rpe', value)}
                                            placeholder="RPE"
                                        />
                                    </View>
                                ))}
                                <View style={styles.tableButtonsContainer}>
                                    <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(item.id)}>
                                        <Text style={styles.buttonText}>Agregar serie</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.removeSetButton} onPress={() => removeSet(item.id)}>
                                        <Text style={styles.buttonText}>Eliminar serie</Text>
                                    </TouchableOpacity>
                                </View>
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
        backgroundColor: '#232323'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#fff'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#fff'
    },
    input: {
        backgroundColor: '#334B49',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 10
    },
    card: {
        backgroundColor: '#1E3433',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    muscles: {
        fontSize: 14,
        color: '#fff'
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
        backgroundColor: '#33e4db',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16
    },
    saveButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    exerciseTable: {
        marginBottom: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
    },
    tableInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 4,
        textAlign: 'center',
    },
    tableButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 4,
    },
    addSetButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    removeSetButton: {
        flex: 1,
        backgroundColor: '#FF5252',
        paddingVertical: 8,
        marginLeft: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});