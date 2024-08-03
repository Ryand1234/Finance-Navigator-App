import { useState, useEffect } from 'react';
import { getAnalyticsData, getForecastData } from '../services/api';

export function useAnalytics() {
  const [expenseVsTimeData, setExpenseVsTimeData] = useState(null);
  const [savingsRemainingData, setSavingsRemainingData] = useState(null);
  const [expenseForecastData, setExpenseForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch analytics data
        const analyticsData = await getAnalyticsData();
        setExpenseVsTimeData(analyticsData.expenseVsTime);
        setSavingsRemainingData(analyticsData.savingsRemaining);

        // Fetch forecast data
        const forecastData = await getForecastData();
        setExpenseForecastData(forecastData);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Function to refresh data
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const analyticsData = await getAnalyticsData();
      setExpenseVsTimeData(analyticsData.expenseVsTime);
      setSavingsRemainingData(analyticsData.savingsRemaining);

      const forecastData = await getForecastData();
      setExpenseForecastData(forecastData);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    expenseVsTimeData,
    savingsRemainingData,
    expenseForecastData,
    isLoading,
    error,
    refreshData
  };
}