import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Importar los datos de ejercicios
const exercisesData = require('../assets/exercises.json');

// Componente separado para el cronómetro
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

    // Inicializar los datos de las tablas
    useEffect(() => {
        const initialTablesData = {};
        routine.exercises.forEach((exercise) => {
            console.log('Inicializando tabla para', exercise.exerciseId);
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

    // Actualizar una fila de la tabla
    const updateRow = useCallback((exerciseId, rowId, field, value) => {
        setTablesData((prev) => {
            const updatedTables = { ...prev };
            const exerciseTable = updatedTables[exerciseId] ? [...updatedTables[exerciseId]] : [];
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

    // Renderizar la tabla de un ejercicio
    const renderExerciseTable = useCallback(
        (exercise, sets) => {
            console.log('Claves en tablesData:', Object.keys(tablesData));
            console.log('Buscando tabla para:', exercise.exerciseId, typeof exercise.exerciseId);
            const tableData = tablesData[exercise.exerciseId];
            // Debug: revisar qué datos se están renderizando
            console.log('Renderizando tabla para', exercise.exerciseId, tableData);

            if (!tableData || tableData.length === 0) {
                return <Text style={{ color: 'red' }}>Sin datos para este ejercicio</Text>;
            }

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
                </View>
            );
        },
        [tablesData, updateRow]
    );

    // Renderizar cada ejercicio
    const renderExercise = useCallback(
        ({ item }) => {
            const exerciseDetails = exercisesData.find((exercise) => exercise.id === item.exerciseId);
            if (!exerciseDetails) return <Text>Ejercicio no encontrado</Text>;
            // Combina los datos del JSON y de la rutina
            const exerciseData = {
                ...exerciseDetails,
                exerciseId: item.exerciseId, // Asegura que tenga la clave correcta
                sets: item.sets,
            };
            return (
                <View style={styles.exerciseCard}>
                    {renderExerciseTable(exerciseData, item.sets)}
                </View>
            );
        },
        [renderExerciseTable]
    );

    // Memoizar la lista de ejercicios para evitar re-renderizados innecesarios
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
            keyboardVerticalOffset={80} // Ajusta este valor según tu header
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    timer: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    finishButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    finishButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    exerciseCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        elevation: 3,
    },
    exerciseTable: {
        marginBottom: 16,
    },
    exerciseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
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
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    tableInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 4,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 16,
    },
});