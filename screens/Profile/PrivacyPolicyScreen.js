import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// --- Componente de la Pantalla de Políticas de Privacidad ---
const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Políticas de Privacidad'}</Text>
      </TouchableOpacity>
      <Text style={styles.mainTitle}>Políticas de Privacidad</Text>

      <ScrollView style={styles.policyContent}>
        <Text style={styles.sectionTitle}>1. Introducción</Text>
        <Text style={styles.paragraph}>
          Bienvenido a nuestra aplicación. Nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestra aplicación móvil (la "Aplicación"). Lea atentamente esta política de privacidad. Si no está de acuerdo con los términos de esta política de privacidad, no acceda a la Aplicación.
        </Text>

        <Text style={styles.sectionTitle}>2. Información que Recopilamos</Text>
        <Text style={styles.paragraph}>
          Podemos recopilar información sobre usted de varias maneras. La información que podemos recopilar a través de la Aplicación incluye:
        </Text>
        <Text style={styles.listItem}>• Datos Personales: Información de identificación personal, como su nombre, dirección de correo electrónico, número de teléfono, edad, peso, altura y contraseña, que nos proporciona voluntariamente al registrarse en la Aplicación.</Text>
        <Text style={styles.listItem}>• Datos de Actividad: Información sobre su uso de la Aplicación, como las funciones que utiliza, el tiempo que pasa en la Aplicación y sus interacciones.</Text>
        <Text style={styles.listItem}>• Datos del Dispositivo: Información sobre su dispositivo móvil, como su ID de dispositivo, modelo y sistema operativo.</Text>

        <Text style={styles.sectionTitle}>3. Cómo Usamos Su Información</Text>
        <Text style={styles.paragraph}>
          La información recopilada sobre usted a través de la Aplicación se utiliza para:
        </Text>
        <Text style={styles.listItem}>• Crear y gestionar su cuenta.</Text>
        <Text style={styles.listItem}>• Proporcionarle y mejorar nuestros servicios.</Text>
        <Text style={styles.listItem}>• Personalizar su experiencia en la Aplicación.</Text>
        <Text style={styles.listItem}>• Enviarle notificaciones relacionadas con la cuenta.</Text>
        <Text style={styles.listItem}>• Monitorear y analizar el uso y las tendencias para mejorar su experiencia con la Aplicación.</Text>

        <Text style={styles.sectionTitle}>4. Seguridad de los Datos</Text>
        <Text style={styles.paragraph}>
          Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger su información personal. Si bien hemos tomado medidas razonables para proteger la información personal que nos proporciona, tenga en cuenta que a pesar de nuestros esfuerzos, ninguna medida de seguridad es perfecta o impenetrable, y ningún método de transmisión de datos puede garantizarse contra cualquier intercepción u otro tipo de uso indebido.
        </Text>

        <Text style={styles.sectionTitle}>5. Sus Derechos</Text>
        <Text style={styles.paragraph}>
          Tiene derecho a acceder, corregir o eliminar su información personal. Si desea ejercer estos derechos, contáctenos a través de las opciones proporcionadas en la sección "Contact Us" de la aplicación.
        </Text>

        <Text style={styles.sectionTitle}>6. Cambios en Esta Política</Text>
        <Text style={styles.paragraph}>
          Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Se le aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio. Los cambios a esta Política de Privacidad son efectivos cuando se publican en esta página.
        </Text>

        <Text style={styles.sectionTitle}>7. Contáctenos</Text>
        <Text style={styles.paragraph}>
          Si tiene alguna pregunta o comentario sobre esta Política de Privacidad, contáctenos a través de:
        </Text>
        <Text style={styles.contactInfo}>Email: privacidad@ejemplo.com</Text>
        <Text style={styles.contactInfo}>Teléfono: +1 (555) 123-4567</Text>
        <Text style={styles.contactInfo}>Dirección: Calle Falsa 123, Ciudad Ficticia, País Imaginario</Text>
      </ScrollView>
    </View>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(35, 35, 35, 1)',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
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
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBD5E0',
    textAlign: 'center',
    marginBottom: 30,
  },
  policyContent: {
    flex: 1,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22D3EE',
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: '#CBD5E0',
    marginBottom: 10,
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#CBD5E0',
    marginBottom: 5,
    marginLeft: 10,
    lineHeight: 18,
  },
  contactInfo: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 5,
    marginLeft: 10,
  },
});
 
export default PrivacyPolicyScreen;