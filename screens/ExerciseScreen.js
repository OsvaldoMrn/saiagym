import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Importar el checkbox

// Importar los datos de ejercicios
const exercisesData = require('../assets/exercises.json');

export default function ExerciseScreen({ route, navigation }) {
    const { routine, startTime } = route.params; // Recibir los datos de la rutina y el tiempo inicial
    const [elapsedTime, setElapsedTime] = useState(0); // Estado para el tiempo transcurrido
    const [tablesData, setTablesData] = useState({}); // Estado para almacenar los datos de todas las tablas

    // Inicializar los datos de las tablas al cargar la pantalla
    useEffect(() => {
        const initialTablesData = {};
        routine.exercises.forEach((exercise) => {
            initialTablesData[exercise.exerciseId] = Array.from({ length: exercise.sets }, (_, index) => ({
                id: index + 1,
                previous: '-',
                weight: '',
                reps: '',
                rpe: '',
                completed: false,
            }));
        });
        setTablesData(initialTablesData);
    }, [routine.exercises]);

    // Actualizar el cronómetro cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // Calcular el tiempo transcurrido en segundos
        }, 1000);

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, [startTime]);

    // Formatear el tiempo en minutos y segundos
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Actualizar una fila de la tabla
    const updateRow = (exerciseId, index, field, value) => {
        setTablesData(prev => {
            const updatedExerciseTable = [...(prev[exerciseId] || [])];
            if (!updatedExerciseTable[index]) {
                updatedExerciseTable[index] = {
                    id: index + 1,
                    previous: '-',
                    weight: '',
                    reps: '',
                    rpe: '',
                    completed: false,
                };
            }
            updatedExerciseTable[index] = {
                ...updatedExerciseTable[index],
                [field]: value,
            };
            return {
                ...prev,
                [exerciseId]: updatedExerciseTable,
            };
        });
    };
    

    // Renderizar la tabla de un ejercicio
    const renderExerciseTable = (exercise, sets) => {
        // Obtener los datos de la tabla para este ejercicio
        const tableData = tablesData[exercise.exerciseId] || Array.from({ length: sets }, (_, index) => ({
            id: index + 1,
            previous: '-',
            weight: '',
            reps: '',
            rpe: '',
        }));

        return (
            <View style={styles.exerciseTable}>
                <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>#</Text>
                    <Text style={styles.tableHeaderCell}>Anterior</Text>
                    <Text style={styles.tableHeaderCell}>Peso</Text>
                    <Text style={styles.tableHeaderCell}>Reps</Text>
                    <Text style={styles.tableHeaderCell}>RPE</Text>
                    <Text style={styles.tableHeaderCell}></Text> {/* Columna vacía */}
                </View>
                {tableData.map((row) => (
                    <View key={row.id} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{row.id}</Text>
                        <Text style={styles.tableCell}>{row.previous}</Text>
                        <TextInput
                            style={styles.tableInput}
                            keyboardType="numeric"
                            value={(row.weight ?? '').toString()}
                            onChangeText={(value) => updateRow(exercise.exerciseId, row.id - 1, 'weight', value)}
                        />
                        <TextInput
                            style={styles.tableInput}
                            keyboardType="numeric"
                            value={(row.reps ?? '').toString()} 
                            onChangeText={(value) => updateRow(exercise.exerciseId, row.id - 1, 'reps', value)}
                        />
                        <TextInput
                            style={styles.tableInput}
                            keyboardType="numeric"
                            value={(row.rpe ?? '').toString()} 
                            onChangeText={(value) => updateRow(exercise.exerciseId, row.id - 1, 'rpe', value)}
                        />
                        <Text style={styles.tableCell}></Text> {/* Celda vacía */}
                    </View>
                ))}
            </View>
        );
    };

    // Renderizar cada ejercicio
    const renderExercise = ({ item }) => {
        const exerciseDetails = exercisesData.find((exercise) => exercise.id === item.exerciseId); // Buscar los detalles del ejercicio
        return (
            <View style={styles.exerciseCard}>
                {exerciseDetails
                    ? renderExerciseTable(exerciseDetails, item.sets) // Pasar el número de sets desde el objeto de la rutina
                    : <Text>Ejercicio no encontrado</Text>}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header fijo */}
            <View style={styles.header}>
                <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
                <TouchableOpacity
                    style={styles.finishButton}
                    onPress={() => navigation.goBack()} // Regresar a la pantalla anterior
                >
                    <Text style={styles.finishButtonText}>Finalizar</Text>
                </TouchableOpacity>
            </View>

            {/* Información de la rutina */}
            <Text style={styles.title}>{routine.name}</Text>
            <Text style={styles.description}>{routine.description}</Text>

            {/* Lista de ejercicios */}
            <FlatList
                data={routine.exercises}
                keyExtractor={(item) => item.exerciseId}
                renderItem={renderExercise}
                contentContainerStyle={styles.listContent}
            />
        </View>
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
});