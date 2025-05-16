import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert, // Importa Alert para mostrar mensajes
  ActivityIndicator, // Para indicar que está cargando
  ScrollView // Para asegurar que todo el contenido sea scrollable
} from 'react-native';
// Ya no necesitas useNavigation ni useRoute explícitamente si los pasas como props,
// pero si los usas en otros componentes internos, los puedes mantener.

const FillProfile = ({ route, navigation }) => {
  // 1. Estados para los campos que se pueden EDITAR en esta pantalla
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // 2. Estado para los datos de SOLO LECTURA (que vienen de pantallas anteriores)
  // Aquí guardaremos la contraseña, dob, weight, height, goal, activityLevel
  const [readOnlyData, setReadOnlyData] = useState({});

  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  // URL base de tu backend. ¡Asegúrate de que esta sea tu IP LOCAL!
  const BASE_URL = 'http://192.168.100.81:5000'; // Confirma que esta es la IP correcta de tu máquina

  // useEffect para inicializar los estados cuando los parámetros de ruta estén disponibles
  useEffect(() => {
    if (route.params) {
      const {
        fullName,
        nickname,
        email,
        mobileNumber,
        // Todos los demás campos que se pasaron
        password, // ¡Importante: la contraseña viene de la primera pantalla!
        age,
        weight,
        height,
        goal,
        activityLevel,
        
      } = route.params;

      // Inicializa los estados EDITABLES con los valores de los parámetros
      setFullName(fullName || '');
      setNickname(nickname || '');
      setEmail(email || '');
      setMobileNumber(mobileNumber || '');

      // Almacena los datos de SOLO LECTURA en un solo objeto
      setReadOnlyData({
        password,
        age,
        weight,
        height,
        goal,
        activityLevel,
        
      });
    }
  }, [route.params]); // Dependencia: se ejecuta cuando los parámetros de ruta cambian

  const handleStart = async () => {
    // Validaciones finales para los campos editables antes de enviar
    if (!fullName || !email) {
      Alert.alert('Error', 'Nombre completo y correo electrónico son obligatorios.');
      return;
    }

    setLoading(true); // Activa el indicador de carga

    // Combina todos los datos para enviar al backend
    const finalUserData = {
      fullName,       // Se toman del estado editable
      nickname,       // Se toman del estado editable
      email,          // Se toman del estado editable
      mobileNumber,   // Se toman del estado editable
      ...readOnlyData, // Se expanden los datos de solo lectura (incluyendo la contraseña)
      // Aquí podrías añadir lógica para la foto de perfil si la implementas
    };

    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalUserData), // Envía el objeto combinado
      });

      const data = await response.json(); // Parsea la respuesta del servidor

      if (response.ok) { // Si la respuesta HTTP es exitosa (código 2xx)
        Alert.alert('¡Registro Exitoso!', 'Tu cuenta ha sido creada con éxito.');
        console.log('Usuario registrado:', data);
        // Navega a la pantalla de inicio de sesión o directamente a la principal si lo prefieres
        navigation.navigate('Login'); // Asumo que volverás a la pantalla de Login
      } else {
        // Si hay un error en el backend (ej. email ya existe, validación)
        Alert.alert('Error de Registro', data.message || 'Hubo un problema al registrar tu cuenta.');
        console.error('Error del backend al registrar:', data.message);
      }
    } catch (error) {
      // Error de red, servidor no disponible, etc.
      console.error('Error de conexión al servidor:', error);
      Alert.alert('Error de Conexión', 'No se pudo conectar al servidor. Verifica tu conexión e inténtalo de nuevo.');
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Completa tu Perfil</Text>

      {/* Sección para la foto de perfil (comentada si no está implementada) */}
      <View style={styles.profileImageContainer}>
        {/* Aquí podrías añadir lógica para subir y mostrar la imagen real */}
        <Image
          source={require('../assets/img1.jpg')} // Placeholder image
          style={styles.profileImage}
        />
        {/* Botón para subir/cambiar la imagen */}
        {/* <TouchableOpacity onPress={handleImagePicker}>
          <Text style={styles.uploadImageText}>Cambiar foto</Text>
        </TouchableOpacity> */}
      </View>

      {/* Sección de Campos Editables */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Madison Smith"
          placeholderTextColor="#94A3B8" // Usar el mismo color que en Login
        />
        <Text style={styles.label}>Apodo</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Madison"
          placeholderTextColor="#94A3B8"
        />
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="madisons@example.com"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none" // Importante para emails
        />
        <Text style={styles.label}>Número de móvil</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="+123 567 89000"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
        />
      </View>

      {/* Sección de Campos de SOLO LECTURA (se muestran, pero no se editan aquí) */}
      <View style={styles.readOnlySection}>
        <Text style={styles.label}>Edad:</Text>
          <Text style={styles.readOnlyText}>
            {readOnlyData.age ? `${readOnlyData.age} años` : 'N/A'}
          </Text>

        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.readOnlyText}>
          {readOnlyData.weight?.value ? `${readOnlyData.weight.value} ${readOnlyData.weight.unit}` : 'N/A'}
        </Text>

        <Text style={styles.label}>Estatura:</Text>
        <Text style={styles.readOnlyText}>
          {readOnlyData.height?.value ? `${readOnlyData.height.value} ${readOnlyData.height.unit}` : 'N/A'}
        </Text>

        <Text style={styles.label}>Meta:</Text>
        <Text style={styles.readOnlyText}>{readOnlyData.goal || 'N/A'}</Text>

        <Text style={styles.label}>Nivel de Actividad Física:</Text>
        <Text style={styles.readOnlyText}>{readOnlyData.activityLevel || 'N/A'}</Text>

        {/* Puedes añadir más campos de solo lectura aquí si tienes `gender` etc. */}
        {readOnlyData.gender && (
          <>
            <Text style={styles.label}>Género:</Text>
            <Text style={styles.readOnlyText}>{readOnlyData.gender}</Text>
          </>
        )}

      </View>


      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStart}
        disabled={loading} // Deshabilita el botón mientras se carga
      >
        <Text style={styles.startButtonText}>
          {loading ? <ActivityIndicator color="#000" /> : 'Empezar'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 20,
  },
  backButtonText: {
    color: '#CBD5E0', // Color consistente con otros textos en el tema
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBD5E0',
    marginBottom: 20,
    textAlign: 'center', // Centrado para el título
  },
  profileImageContainer: {
    backgroundColor: 'rgba(1, 255, 242, 0.09)',
    height: 100,
    width: 100, // Añadir ancho para que sea un círculo
    borderRadius: 50, // Hace el contenedor circular
    alignSelf: 'center', // Centra el contenedor de la imagen
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    overflow: 'hidden', // Asegura que la imagen no se salga del círculo
  },
  profileImage: {
    width: '100%', // La imagen ocupa todo el contenedor
    height: '100%',
    resizeMode: 'cover', // Asegura que la imagen llene el espacio
  },
  uploadImageText: { // Nuevo estilo para el texto de subir foto
    color: '#22D3EE',
    marginTop: 10,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20, // Menos margen para dejar espacio para la sección de solo lectura
  },
  label: {
    color: '#CBD5E0', // Color consistente
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10, // Un poco de espacio entre labels
  },
  input: {
    backgroundColor: '#334155', // Color de fondo del input consistente
    color: '#CBD5E0', // Color del texto del input consistente
    paddingVertical: 10, // Ajuste para que se vea bien
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5, // Menos margen entre inputs
    fontSize: 16,
  },
  readOnlySection: { // Nuevo estilo para la sección de solo lectura
    backgroundColor: '#334155',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  readOnlyText: {
    color: '#94A3B8', // Color para el texto de solo lectura
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 10, // Pequeña indentación para diferenciar
  },
  startButton: {
    backgroundColor: '#22D3EE', // Color consistente
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#1E293B', // Color de texto consistente
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FillProfile;