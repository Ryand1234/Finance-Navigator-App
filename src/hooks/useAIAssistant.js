// src/hooks/useAIAssistant.js
import { useState, useCallback, useRef } from 'react';
import { getAIAdvice } from '../services/api';

export function useAIAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const adviceCache = useRef({});

  const getAdvice = useCallback(async (context, data) => {
    const cacheKey = JSON.stringify({ context, data });

    if (adviceCache.current[cacheKey]) {
      return adviceCache.current[cacheKey];
    }

    setIsLoading(true);
    setError(null);
    try {
      const advice = await getAIAdvice(context, data);
      adviceCache.current[cacheKey] = advice;
      setIsLoading(false);
      return advice;
    } catch (err) {
      setError(err);
      setIsLoading(false);
      throw err;
    }
  }, []);

  return { getAdvice, isLoading, error };
}