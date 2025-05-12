import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { InferenceSession, Tensor } from 'onnxruntime-react-native';
import RNFS from 'react-native-fs';


export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollViewRef = useRef();

  // Model configuration
  const modelConfig = {
    name: 'deepseek-model-quantized',
    url: 'https://your-model-storage.com/deepseek-model-quantized.onnx',
    filePath: `${RNFS.DocumentDirectoryPath}/deepseek-model.onnx`,
    tokenizerUrl: 'https://your-model-storage.com/deepseek-tokenizer.json',
    tokenizerPath: `${RNFS.DocumentDirectoryPath}/deepseek-tokenizer.json`
  };

  // Initialize model
  useEffect(() => {
    const initModel = async () => {
      try {
        setIsLoading(true);
        
        // Check if model already exists
        const modelExists = await RNFS.exists(modelConfig.filePath);
        
        if (!modelExists) {
          await downloadModel();
        }
        
        // Load model
        const newSession = await InferenceSession.create(modelConfig.filePath);
        setSession(newSession);
        setModelLoaded(true);
        
        // Load tokenizer
        await loadTokenizer();
        
      } catch (error) {
        console.error('Error initializing model:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initModel();
  }, []);

  // Download model
  const downloadModel = async () => {
    try {
      const download = RNFS.downloadFile({
        fromUrl: modelConfig.url,
        toFile: modelConfig.filePath,
        progress: (res) => {
          const progressPercent = (res.bytesWritten / res.contentLength) * 100;
          setProgress(progressPercent);
        },
        progressDivider: 1
      });

      await download.promise;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  };

  // Load tokenizer (simplified example)
  const loadTokenizer = async () => {
    try {
      const tokenizerExists = await RNFS.exists(modelConfig.tokenizerPath);
      
      if (!tokenizerExists) {
        const download = RNFS.downloadFile({
          fromUrl: modelConfig.tokenizerUrl,
          toFile: modelConfig.tokenizerPath
        });
        await download.promise;
      }
      
      // In a real app, you would load and parse the tokenizer here
    } catch (error) {
      console.error('Error loading tokenizer:', error);
    }
  };

  // Handle user message
  const handleSend = async () => {
    if (input.trim() === '' || !session || isLoading) return;

    const userMessage = { sender: 'user', text: input, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Generate response
      const botResponse = await generateAIResponse(input);
      
      const botMessage = { 
        sender: 'bot', 
        text: botResponse,
        id: Date.now() + 1
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = { 
        sender: 'bot', 
        text: 'Lo siento, hubo un error al procesar tu solicitud.',
        id: Date.now() + 1
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate AI response
  const generateAIResponse = async (inputText) => {
    try {
      // Tokenize input (simplified - in real app use proper tokenizer)
      const tokens = tokenizeText(inputText);
      
      // Prepare input tensor
      const inputTensor = new Tensor(
        'int64',
        new BigInt64Array(tokens.map(t => BigInt(t))),
        [1, tokens.length]
      );
      
      // Run model
      const feeds = { input: inputTensor };
      const options = { logSeverityLevel: 0 };
      const results = await session.run(feeds, options);
      
      // Get output
      const outputTensor = results.output;
      const outputIds = Array.from(outputTensor.data);
      
      // Decode output
      const responseText = decodeOutput(outputIds);
      
      return responseText;
      
    } catch (error) {
      console.error('Error in AI processing:', error);
      throw error;
    }
  };

  // Simplified tokenizer
  const tokenizeText = (text) => {
    // In a real app, use the actual tokenizer
    // This is a simplified version for demonstration
    const words = text.toLowerCase().split(/\s+/);
    return words.map(word => {
      // Simple hash-based token ID
      let hash = 0;
      for (let i = 0; i < word.length; i++) {
        hash = (hash << 5) - hash + word.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash) % 10000; // Limit to vocab size
    });
  };

  // Simplified output decoder
  const decodeOutput = (tokenIds) => {
    // In a real app, use the actual tokenizer
    // This generates placeholder text
    const responses = [
      "Basado en tu consulta, te recomiendo una rutina equilibrada con ejercicios de fuerza y cardio.",
      "Para optimizar tus resultados, considera alternar días de entrenamiento intenso con días de recuperación activa.",
      "Según los últimos estudios, lo ideal es realizar al menos 150 minutos de actividad moderada por semana.",
      "Una buena rutina debería incluir ejercicios compuestos como sentadillas, press de banca y peso muerto.",
      "Recuerda que la nutrición es clave. Asegúrate de consumir suficientes proteínas para la recuperación muscular."
    ];
    
    return responses[Math.abs(tokenIds[0]) % responses.length];
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      {!modelLoaded ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>
            {progress > 0 ? `Descargando modelo... ${progress.toFixed(0)}%` : 'Inicializando IA...'}
          </Text>
        </View>
      ) : (
        <>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.chatContainer}
            contentContainerStyle={styles.chatContent}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.message,
                  message.sender === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))}
            {isLoading && (
              <View style={[styles.message, styles.botMessage]}>
                <ActivityIndicator size="small" color="#666" />
              </View>
            )}
          </ScrollView>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Escribe tu mensaje..."
              placeholderTextColor="#999"
              editable={modelLoaded && !isLoading}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Button 
              title="Enviar" 
              onPress={handleSend} 
              disabled={!modelLoaded || isLoading || input.trim() === ''}
              color="#6200ee"
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  chatContent: {
    paddingBottom: 20,
  },
  message: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 18,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6200ee',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 24,
    fontSize: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});