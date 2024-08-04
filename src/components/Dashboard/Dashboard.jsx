import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import OverviewCard from './OverviewCard';
import AIAssistant from '../AIAssistant/AIAssistant';
import { ExpenseVsTimeChart, SavingsRemainingChart } from '../Analytics/AnalyticsCharts';
import { useTransactions } from '../../hooks/useTransactions';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useFocusEffect } from '@react-navigation/native';

function Dashboard() {
  const { totalBalance, totalIncome, totalExpenses } = useTransactions();
  const { expenseVsTimeData, savingsRemainingData, refreshData } = useAnalytics();

  const aiAssistantData = {
    balance: totalBalance,
    income: totalIncome,
    expenses: totalExpenses,
  };

  useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [])
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.heading}>Overview of Financial Data</Text>
        <OverviewCard balance={totalBalance} income={totalIncome} expenses={totalExpenses} />
        <View style={styles.chartsContainer}>
          <ExpenseVsTimeChart data={expenseVsTimeData} />
          <SavingsRemainingChart data={savingsRemainingData} />
        </View>
      </View>
      <AIAssistant context="dashboard" data={aiAssistantData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  chartsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  heading: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
  },
});

export default Dashboard;
