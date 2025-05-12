import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { AsyncStorage } from '@react-native-community/async-storage';
import { pipeline } from '@xenova/transformers';

export default function GymAssistantChat() {
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(false);

  // Cargar el modelo al iniciar
  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const localModel = await pipeline(
        'text-generation',
        'Xenova/LaMini-Flan-T5-248M', // Modelo pequeño para móviles
        { progress_callback: (progress) => console.log(progress) }
      );
      setModel(localModel);
    } catch (error) {
      console.error('Error loading model:', error);
    } finally {
      setIsModelLoading(false);
    }
  };

  // Generar respuesta de la IA
  const generateResponse = async (userInput) => {
    if (!model) {
      await loadModel();
    }
    
    try {
      const response = await model(userInput, {
        max_new_tokens: 100,
        temperature: 0.7,
      });
      return response[0]?.generated_text || "No pude generar una respuesta.";
    } catch (error) {
      console.error('Error generating response:', error);
      return "Hubo un error al procesar tu solicitud.";
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    
    const userMessage = newMessages[0].text;
    const botResponse = await generateResponse(userMessage);
    
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {
          _id: Math.round(Math.random() * 1000000),
          text: botResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Gym AI',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    );
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});