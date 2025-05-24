import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const exercisesData = require('../assets/exercises.json');

const Timer = ({ startTime }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>;
};

export default function ExerciseScreen({ route, navigation }) {
    const { routine, startTime } = route.params;
    const [tablesData, setTablesData] = useState({});

    useEffect(() => {
        const initialTablesData = {};
        routine.exercises.forEach((exercise) => {
            initialTablesData[exercise.exerciseId] = Array.from({ length: exercise.sets }, (_, index) => ({
                id: index + 1,
                previous: '-',
                weight: '',
                reps: '',
                rpe: '',
            }));
        });
        setTablesData(initialTablesData);
    }, [routine.exercises]);

    const updateRow = useCallback((exerciseId, rowId, field, value) => {
        setTablesData((prev) => {
            const updatedTables = { ...prev };
            const exerciseTable = [...(updatedTables[exerciseId] || [])];
            const rowIndex = rowId - 1;

            if (rowIndex >= 0 && rowIndex < exerciseTable.length) {
                exerciseTable[rowIndex] = {
                    ...exerciseTable[rowIndex],
                    [field]: value.toString(),
                };
                updatedTables[exerciseId] = exerciseTable;
            }

            return updatedTables;
        });
    }, []);

    const addSet = useCallback((exerciseId) => {
        setTablesData(prev => {
            const updated = { ...prev };
            const currentTable = [...(updated[exerciseId] || [])];
            const newId = currentTable.length > 0 ? currentTable[currentTable.length - 1].id + 1 : 1;
            currentTable.push({
                id: newId,
                previous: '-',
                weight: '',
                reps: '',
                rpe: '',
            });
            updated[exerciseId] = currentTable;
            return updated;
        });
    }, []);

    const removeSet = useCallback((exerciseId) => {
        setTablesData(prev => {
            const updated = { ...prev };
            const currentTable = [...(updated[exerciseId] || [])];
            if (currentTable.length > 1) {
                currentTable.pop();
                updated[exerciseId] = currentTable;
            }
            return updated;
        });
    }, []);

    const renderExerciseTable = useCallback((exercise, sets) => {
        const tableData = tablesData[exercise.exerciseId];

        if (!tableData || tableData.length === 0) {
            return <Text style={{ color: 'red' }}>Sin datos para este ejercicio</Text>;
        }

        const predictNextSet = async () => {
            const lastSet = [...tableData].reverse().find(
                (row) => row.weight && row.reps && row.rpe
            );

            if (!lastSet) {
                Alert.alert("Datos incompletos", "Debes llenar al menos un set con peso, repeticiones y RPE.");
                return;
            }

            const payload = {
                weight: parseFloat(lastSet.weight),
                reps: parseInt(lastSet.reps),
                rpe: parseFloat(lastSet.rpe),
                exercise_type: exercise.type || 'compuesto',
                experience_level: 'principiante'
            };

            try {
                const response = await fetch("http://192.168.100.48:8000/predict", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }

                const data = await response.json();

                const nextWeight = data.prediction[0][0];
                const nextReps = data.prediction[0][1];

                Alert.alert(
                    "Siguiente set sugerido",
                    `Peso: ${nextWeight.toFixed(1)} kg\nReps: ${nextReps.toFixed(0)}`
                );
            } catch (error) {
                console.error("Error al predecir:", error);
                Alert.alert("Error", "No se pudo obtener la predicción.");
            }
        };

        return (
            <View style={styles.exerciseTable}>
                <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>#</Text>
                    <Text style={styles.tableHeaderCell}>Anterior</Text>
                    <Text style={styles.tableHeaderCell}>Peso</Text>
                    <Text style={styles.tableHeaderCell}>Reps</Text>
                    <Text style={styles.tableHeaderCell}>RPE</Text>
                </View>
                {tableData.map((row) => (
                    <View key={`${exercise.exerciseId}-${row.id}`} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{row.id}</Text>
                        <Text style={styles.tableCell}>{row.previous}</Text>
                        <TextInput
                            style={styles.tableInput}
                            keyboardType="numeric"
                            value={row.weight}
                            onChangeText={(value) => updateRow(exercise.exerciseId, row.id, 'weight', value)}
                        />
                        <TextInput
                            style={styles.tableInput}
                            keyboardType="numeric"
                            value={row.reps}
                            onChangeText={(value) => updateRow(exercise.exerciseId, row.id, 'reps', value)}
                        />
                        <TextInput
                            style={styles.tableInput}
                            keyboardType="numeric"
                            value={row.rpe}
                            onChangeText={(value) => updateRow(exercise.exerciseId, row.id, 'rpe', value)}
                        />
                    </View>
                ))}
                <View style={styles.tableButtonsContainer}>
                    <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(exercise.exerciseId)}>
                        <Text style={styles.buttonText}>Agregar serie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeSetButton} onPress={() => removeSet(exercise.exerciseId)}>
                        <Text style={styles.buttonText}>Eliminar serie</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.predictButton} onPress={predictNextSet}>
                    <Text style={styles.buttonText}>Predecir siguiente set</Text>
                </TouchableOpacity>
            </View>
        );
    }, [tablesData, updateRow, addSet, removeSet]);

    const renderExercise = useCallback(({ item }) => {
        const exerciseDetails = exercisesData.find((exercise) => exercise.id === item.exerciseId);
        if (!exerciseDetails) return <Text>Ejercicio no encontrado</Text>;
        const exerciseData = {
            ...exerciseDetails,
            exerciseId: item.exerciseId,
            sets: item.sets,
        };
        return (
            <View style={styles.exerciseCard}>
                {renderExerciseTable(exerciseData, item.sets)}
            </View>
        );
    }, [renderExerciseTable]);

    const memoizedExercises = useMemo(() => routine.exercises, [routine.exercises]);

    const saveTrainingSession = async (routineName, tablesData, exercisesData) => {
        try {
            const date = new Date().toISOString();
            const formattedSession = {
                date,
                routineName,
                exercises: Object.entries(tablesData).map(([id, sets]) => ({
                    id,
                    name: exercisesData.find(e => e.id === id)?.name || 'Desconocido',
                    sets,
                })),
            };
            const existing = await AsyncStorage.getItem('@training_history');
            const history = existing ? JSON.parse(existing) : [];
            history.push(formattedSession);
            await AsyncStorage.setItem('@training_history', JSON.stringify(history));
            console.log('Sesión guardada con éxito');
        } catch (error) {
            console.error('Error guardando la sesión:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Timer startTime={startTime} />
                    <TouchableOpacity
                        style={styles.finishButton}
                        onPress={async () => {
                            await saveTrainingSession(routine.name, tablesData, exercisesData);
                            navigation.goBack();
                        }}
                    >
                        <Text style={styles.finishButtonText}>Finalizar</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>{routine.name}</Text>
                <Text style={styles.description}>{routine.description}</Text>
                <FlatList
                    data={memoizedExercises}
                    keyExtractor={(item) => item.exerciseId.toString()}
                    renderItem={renderExercise}
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    timer: { fontSize: 18, fontWeight: 'bold' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
    description: { fontSize: 16, marginBottom: 12 },
    exerciseCard: {
        marginBottom: 20,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    exerciseTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    tableHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    tableHeaderCell: { flex: 1, fontWeight: 'bold', textAlign: 'center' },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    tableCell: { flex: 1, textAlign: 'center', paddingVertical: 4 },
    tableInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 6,
        textAlign: 'center',
    },
    tableButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    addSetButton: {
        backgroundColor: '#27ae60',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    removeSetButton: {
        backgroundColor: '#c0392b',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    predictButton: {
        backgroundColor: '#2980b9',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    finishButton: {
        backgroundColor: '#8e44ad',
        padding: 10,
        borderRadius: 8,
    },
    finishButtonText: { color: '#fff', fontWeight: 'bold' },
});
