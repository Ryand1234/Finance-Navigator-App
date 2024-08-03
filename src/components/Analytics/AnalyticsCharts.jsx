import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useAnalytics } from '../../hooks/useAnalytics';
import AIAssistant from '../AIAssistant/AIAssistant';

const screenWidth = Dimensions.get('window').width;

function Chart({ title, data }) {
  if (data === undefined && title === undefined)
    return <View></View>;
  if (!data || !data.labels || !data.datasets) {
    return <Text style={styles.loadingOrError}>No data available for {title}</Text>;
  }

  const currentMonthIndex = new Date().getMonth();
  const numberOfMonths = 4;
  const prevMonths = currentMonthIndex - numberOfMonths >= 1 ? currentMonthIndex - numberOfMonths : 0
  let currentChartData = JSON.parse(JSON.stringify(data));
  currentChartData.labels = currentChartData.labels.splice(prevMonths, numberOfMonths);
  currentChartData.datasets[0].data = currentChartData.datasets[0].data.splice(prevMonths, numberOfMonths);
  return (
    <View style={styles.chartWrapper}>
      <Text style={styles.chartTitle}>{title}</Text>
      <LineChart
        data={currentChartData}
        width={screenWidth-90} // from react-native
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
}

export function ExpenseVsTimeChart({ data }) {
  return <Chart title="Expenses vs Time" data={data} />;
}

export function SavingsRemainingChart({ data }) {
  return <Chart title="Savings Remaining vs Time" data={data} />;
}

function AnalyticsCharts() {
  const { expenseVsTimeData, savingsRemainingData, expenseForecastData, isLoading, error } = useAnalytics();

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingOrError} />;
  if (error) return <Text style={[styles.loadingOrError, { color: 'red' }]}>Error loading charts: {error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Analytics Dashboard</Text>
      <Text style={styles.subHeading}>View your financial performance over time</Text>
      <View>
        <ExpenseVsTimeChart data={expenseVsTimeData} />
        <SavingsRemainingChart data={savingsRemainingData} />
        <Chart title="Expense Forecast" data={expenseForecastData} />
      </View>
      <AIAssistant
        context="analytics"
        data={{ expenseVsTimeData, savingsRemainingData, expenseForecastData }}
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#f0f8ff",
  backgroundGradientTo: "#f0f8ff",
  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeading: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    color: '#666',
  },
  chartWrapper: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingOrError: {
    textAlign: 'center',
    padding: 20,
    fontSize: 18,
  },
});

export default AnalyticsCharts;
