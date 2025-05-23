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
    const [previousSets, setPreviousSets] = useState({});

    // Inicializar los datos de las tablas
    useEffect(() => {
        const initialTablesData = {};
        routine.exercises.forEach((exercise) => {
            console.log('Inicializando tabla para', exercise.exerciseId);
            initialTablesData[exercise.exerciseId] = Array.from({ length: exercise.sets }, (_, index) => ({
                id: index + 1,
                weight: '',
                reps: '',
                rpe: '',
            }));
        });
        setTablesData(initialTablesData);
    }, [routine.exercises]);

    useEffect(() => {
        const fetchPreviousSets = async () => {
            try {
                const historyRaw = await AsyncStorage.getItem('@training_history');
                const history = historyRaw ? JSON.parse(historyRaw) : [];
                const prev = {};

                // Recorre el historial en orden inverso (más reciente primero)
                for (let i = history.length - 1; i >= 0; i--) {
                    const session = history[i];
                    if (!session.exercises) continue;
                    session.exercises.forEach(ex => {
                        // Solo toma el primer registro encontrado para cada ejercicio
                        if (!prev[ex.id] && Array.isArray(ex.sets) && ex.sets.length > 0) {
                            prev[ex.id] = ex.sets.map(set => ({
                                weight: set.weight || '-',
                                reps: set.reps || '-',
                                rpe: set.rpe || '-'
                            }));
                        }
                    });
                }
                setPreviousSets(prev);
            } catch (e) {
                setPreviousSets({});
            }
        };
        fetchPreviousSets();
    }, []);

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

    const addSet = useCallback((exerciseId) => {
        setTablesData(prev => {
            const updated = { ...prev };
            const currentTable = updated[exerciseId] ? [...updated[exerciseId]] : [];
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
            const currentTable = updated[exerciseId] ? [...updated[exerciseId]] : [];
            if (currentTable.length > 1) { // Evita eliminar todas las filas
                currentTable.pop();
                updated[exerciseId] = currentTable;
            }
            return updated;
        });
    }, []);

    // ----------------------- CARLOS -------------------------------------------------------------------------------------------------------------------------------------------------
    // ENVIAR SERIE A LA API
    const enviarSerieAPI = (exerciseId, row) => {
        const { weight, reps, rpe } = row;
        // Aquí va tu lógica para enviar la serie a la API
        const payload = { exerciseId, weight, reps, rpe };
        console.log('Enviando serie:', payload);
        // Puedes mostrar feedback al usuario aquí
    };

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
                        <Text style={[styles.tableHeaderCell, { flex: 0.3 }]}>#</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Prev</Text>
                        <Text style={styles.tableHeaderCell}>kg</Text>
                        <Text style={styles.tableHeaderCell}>Reps</Text>
                        <Text style={styles.tableHeaderCell}>RPE</Text>
                        <Text style={styles.tableHeaderCell}>Acción</Text>
                    </View>
                    {tableData.map((row, idx) => (
                        <View key={`${exercise.exerciseId}-${row.id}`} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: 0.3 }]}>{row.id || ''}</Text>
                            <Text style={[styles.tableCell, { width: '40%' }]}>
                                {
                                    previousSets[exercise.exerciseId] && previousSets[exercise.exerciseId].length > 0
                                        ? (() => {
                                            const prevSet =
                                                previousSets[exercise.exerciseId][idx] ??
                                                previousSets[exercise.exerciseId][previousSets[exercise.exerciseId].length - 1];
                                            return (
                                                <>
                                                    <Text style={styles.prevData}>{prevSet.weight} kg</Text>{'\n'}
                                                    <Text style={styles.prevData}>x{prevSet.reps} reps</Text>{'\n'}
                                                    <Text style={styles.prevData}>@{prevSet.rpe} rpe</Text>
                                                </>
                                            );
                                        })()
                                        : '-'
                                }
                            </Text>
                            <TextInput
                                style={[styles.tableInput, { borderRightWidth: 2, borderRightColor: '#777' }]}
                                keyboardType="numeric"
                                value={row.weight ? String(row.weight) : ''}
                                onChangeText={(value) => updateRow(exercise.exerciseId, row.id, 'weight', value)}
                            />
                            <TextInput
                                style={[
                                    styles.tableInput,
                                    { borderLeftWidth: 2, borderLeftColor: '#777', borderRightWidth: 2, borderRightColor: '#777' }
                                ]}
                                keyboardType="numeric"
                                value={row.reps ? String(row.reps) : ''}
                                onChangeText={(value) => updateRow(exercise.exerciseId, row.id, 'reps', value)}
                            />
                            <TextInput
                                style={[styles.tableInput, { borderLeftWidth: 2, borderLeftColor: '#777' }]}
                                keyboardType="numeric"
                                value={row.rpe ? String(row.rpe) : ''}
                                onChangeText={(value) => updateRow(exercise.exerciseId, row.id, 'rpe', value)}
                            />
                            <TouchableOpacity
                                style={styles.sendSetButton}
                                onPress={() => enviarSerieAPI(exercise.exerciseId, row)}
                            >
                                <Text style={styles.sendSetButtonText}>Enviar</Text>
                            </TouchableOpacity>
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
                </View>
            );
        },
        [tablesData, updateRow, addSet, removeSet, previousSets]
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
            keyboardVerticalOffset={30}
        >
            <View style={styles.container} >
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
        backgroundColor: '#232323',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1e3433',
        borderBottomWidth: 1,
    },
    timer: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    finishButton: {
        backgroundColor: '#33e4db',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    finishButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        color: '#fff',
    },
    description: {
        fontSize: 16,
        color: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    exerciseCard: {
        backgroundColor: '#1E3433',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        elevation: 3,
    },
    exerciseTable: {
        marginBottom: 16,
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 8,
        elevation: 2,
    },
    exerciseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        backgroundColor: '#1E3433',
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 6,
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        backgroundColor: '#333333',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 4,
        alignItems: 'center',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableInput: {
        flex: 0.5,
        backgroundColor: '#444444',
        borderRadius: 4,
        padding: 6,
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
    },
    listContent: {
        paddingBottom: 16,
    },
    tableButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 4,
    },
    addSetButton: {
        flex: 1,
        backgroundColor: '#33e4db',
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    removeSetButton: {
        flex: 1,
        backgroundColor: '#E2F163',
        paddingVertical: 8,
        marginLeft: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sendSetButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 4,
        alignItems: 'center',
        marginLeft: 4,
        flex: 0.5,
    },
    sendSetButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    prevData: {
        color: '#888888',
        fontWeight: 'bold',
        fontSize: 14,
    },
});