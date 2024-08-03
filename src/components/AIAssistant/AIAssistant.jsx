import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAIAssistant } from '../../hooks/useAIAssistant';

function AIAssistant({ context, data }) {
  const { getAdvice, isLoading, error } = useAIAssistant();
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchAdvice = async () => {
      try {
        const jsonData = JSON.stringify(data);
        const newAdvice = await getAdvice(context, jsonData);
        if (isMounted) {
          setAdvice(newAdvice);
        }
      } catch (err) {
        console.error('Error fetching advice:', err);
      }
    };

    fetchAdvice();

    return () => {
      isMounted = false;
    };
  }, [context, data, getAdvice]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text style={styles.error}>Error loading advice: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Financial Assistant</Text>
      <Text style={styles.advice}>{advice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  advice: {
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default React.memo(AIAssistant);
