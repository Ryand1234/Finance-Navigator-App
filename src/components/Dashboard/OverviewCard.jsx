import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const OverviewCard = ({ balance, income, expenses }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Financial Overview</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.value}>{balance}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Income</Text>
        <Text style={styles.value}>{income}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Expenses</Text>
        <Text style={styles.value}>{expenses}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});

OverviewCard.propTypes = {
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  income: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expenses: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default OverviewCard;
