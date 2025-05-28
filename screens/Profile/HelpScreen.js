import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Solo este import es necesario

// --- Componente de la Pantalla Help & FAQs ---
const HelpFAQsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('faq'); // 'faq' o 'contact'
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para las preguntas frecuentes y su estado de expansión
  const [faqs, setFaqs] = useState([
    {
      id: '1',
      category: 'general', // La categoría ya no se usará para filtrar por botones, pero se mantiene en los datos
      question: 'Lorem ipsum dolor sit amet?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam, Aenean in sagittis magna, ut feugiat diam.',
      expanded: false,
    },
    {
      id: '2',
      category: 'general',
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Respuesta 2 para la pregunta general.',
      expanded: false,
    },
    {
      id: '3',
      category: 'account',
      question: '¿Cómo cambio mi contraseña?',
      answer: 'Puedes cambiar tu contraseña desde la sección de "Configuración de Cuenta" en tu perfil.',
      expanded: false,
    },
    {
      id: '4',
      category: 'account',
      question: '¿Puedo eliminar mi cuenta?',
      answer: 'Sí, puedes solicitar la eliminación de tu cuenta contactando a soporte.',
      expanded: false,
    },
    {
      id: '5',
      category: 'services',
      question: '¿Qué servicios ofrecen?',
      answer: 'Ofrecemos una variedad de servicios de fitness personalizados, planes de nutrición y seguimiento de progreso.',
      expanded: false,
    },
    {
      id: '6',
      category: 'services',
      question: '¿Cómo me suscribo a un plan?',
      answer: 'Puedes suscribirte a un plan desde la sección de "Planes y Suscripciones" en la aplicación.',
      expanded: false,
    },
  ]);

  // Función para expandir/colapsar una pregunta frecuente
  const toggleFAQ = (id) => {
    setFaqs(faqs.map((faq) =>
      faq.id === id ? { ...faq, expanded: !faq.expanded } : faq
    ));
  };

  // Filtrar FAQs solo por término de búsqueda (ya no por categoría)
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Renderizado de la sección de FAQ
  const renderFAQSection = () => (
    <View style={styles.faqSection}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#94A3B8"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <ScrollView style={styles.faqList} contentContainerStyle={styles.faqListContent}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity onPress={() => toggleFAQ(faq.id)} style={styles.faqQuestionContainer}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqToggleIcon}>{faq.expanded ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {faq.expanded && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>No se encontraron resultados para tu búsqueda.</Text>
        )}
      </ScrollView>
    </View>
  );

  // Función para abrir URLs/aplicaciones externas
  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `No se puede abrir la URL: ${url}`);
      }
    } catch (error) {
      console.error('Error al abrir URL:', error);
      Alert.alert('Error', 'Hubo un problema al intentar abrir el enlace.');
    }
  };

  // Renderizado de la sección de Contact Us
  const renderContactUsSection = () => (
    <ScrollView style={styles.contactUsSection} contentContainerStyle={styles.contactUsContent}>
      <TouchableOpacity style={styles.contactOption}>
        <Text style={styles.contactIcon}>👤</Text>
        <View style={styles.contactDetails}>
          <Text style={styles.contactText}>Customer service</Text>
          <TouchableOpacity onPress={() => openLink('tel:+15551234567')}>
            <Text style={styles.contactDetail}>Phone: +1 (555) 123-4567</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('mailto:support@example.com')}>
            <Text style={styles.contactDetail}>Email: support@example.com</Text>
          </TouchableOpacity>
          <Text style={styles.contactDetail}>Hours: Mon-Fri, 9 AM - 5 PM</Text>
        </View>
        <Text style={styles.contactArrow}>▼</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactOption}>
        <Text style={styles.contactIcon}>📱</Text>
        <View style={styles.contactDetails}>
          <Text style={styles.contactText}>Whatsapp</Text>
          <TouchableOpacity onPress={() => openLink('whatsapp://send?phone=+15551234567')}>
            <Text style={styles.contactDetail}>Experto 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('whatsapp://send?phone=+15551234567')}>
            <Text style={styles.contactDetail}>Experto 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('whatsapp://send?phone=+15551234567')}>
            <Text style={styles.contactDetail}>Experto 3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('whatsapp://send?phone=+15551234567')}>
            <Text style={styles.contactDetail}>Experto 4</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.contactArrow}>▼</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactOption}>
        <Text style={styles.contactIcon}>📄</Text>
        <View style={styles.contactDetails}>
          <Text style={styles.contactText}>Facebook</Text>
          <TouchableOpacity onPress={() => openLink('https://www.facebook.com/')}>
            <Text style={styles.contactDetail}>Experto 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.facebook.com/')}>
            <Text style={styles.contactDetail}>Experto 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.facebook.com/')}>
            <Text style={styles.contactDetail}>Experto 3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.facebook.com/')}>
            <Text style={styles.contactDetail}>Experto 4</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.contactArrow}>▼</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactOption}>
        <Text style={styles.contactIcon}>📷</Text>
        <View style={styles.contactDetails}>
          <Text style={styles.contactText}>Instagram</Text>
          <TouchableOpacity onPress={() => openLink('https://www.instagram.com/')}>
            <Text style={styles.contactDetail}>Experto 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.instagram.com/')}>
            <Text style={styles.contactDetail}>Experto 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.instagram.com/')}>
            <Text style={styles.contactDetail}>Experto 3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.instagram.com/')}>
            <Text style={styles.contactDetail}>Experto 4</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.contactArrow}>▼</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Help & FAQs'}</Text>
      </TouchableOpacity>
      <Text style={styles.mainTitle}>How Can We Help You?</Text>

      {/* Selector de Pestañas */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'faq' && styles.tabButtonActive]}
          onPress={() => setActiveTab('faq')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'faq' && styles.tabButtonTextActive]}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'contact' && styles.tabButtonActive]}
          onPress={() => setActiveTab('contact')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'contact' && styles.tabButtonTextActive]}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido Dinámico */}
      {activeTab === 'faq' ? renderFAQSection() : renderContactUsSection()}

      {/* La barra de navegación inferior NO se incluye en esta pantalla */}
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
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#334155',
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#22D3EE',
  },
  tabButtonText: {
    color: '#CBD5E0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabButtonTextActive: {
    color: '#1E293B',
  },
  faqSection: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    backgroundColor: '#334155',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#CBD5E0',
    fontSize: 16,
  },
  faqList: {
    flex: 1,
  },
  faqItem: {
    backgroundColor: '#1E3433',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  faqQuestion: {
    color: '#22D3EE',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  faqToggleIcon: {
    color: '#22D3EE',
    fontSize: 16,
    marginLeft: 10,
  },
  faqAnswer: {
    color: '#CBD5E0',
    fontSize: 14,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  noResultsText: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  // Contact Us
  contactUsSection: {
    flex: 1,
    width: '100%',
    paddingBottom: 20,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1E3433',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 15,
    color: '#22D3EE',
    paddingTop: 2,
  },
  contactDetails: {
    flex: 1,
  },
  contactText: {
    color: '#CBD5E0',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactDetail: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 2,
    textDecorationLine: 'underline',
  },
  contactArrow: {
    color: '#94A3B8',
    fontSize: 16,
    marginLeft: 10,
    paddingTop: 2,
  },
});
export default HelpFAQsScreen;