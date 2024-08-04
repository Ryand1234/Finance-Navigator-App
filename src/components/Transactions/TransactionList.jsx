import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import TransactionForm from './TransactionForm'; // Assuming this is a React Native component
import { useTransactions } from '../../hooks/useTransactions';
import AIAssistant from '../AIAssistant/AIAssistant';

function TransactionList() {
  const { transactions, addTransaction } = useTransactions();
  const [filter, setFilter] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleFilterChange = (field, value) => {
    const newFilter = { ...filter, [field]: value };
    setFilter(newFilter);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter.description && !transaction.description.toLowerCase().includes(filter.description.toLowerCase())) {
      return false;
    }
    if (filter.type && transaction.type !== filter.type) {
      return false;
    }
    if (filter.startDate && new Date(transaction.date) < new Date(filter.startDate)) {
      return false;
    }
    if (filter.endDate && new Date(transaction.date) > new Date(filter.endDate)) {
      return false;
    }
    return true;
  });

  const transactionData = {
    recentTransactions: filteredTransactions.slice(0, 5),
    totalTransactions: filteredTransactions.length,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction Management</Text>
        <Button title="+ Add Transaction" onPress={() => setShowPopup(true)} />
      </View>
      <View style={styles.list}>
        <View style={styles.headers}>
          {['Description', 'Amount', 'Date', 'Type'].map((header, index) => (
            <TouchableOpacity key={index} onPress={() => handleFilterChange(header.toLowerCase(), prompt(`Filter by ${header.toLowerCase()}:`))}>
              <Text style={styles.headerItem}>{header}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.transaction}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
          )}
        />
        {showPopup && <TransactionForm onSubmit={addTransaction} onClose={() => setShowPopup(false)} />}
      </View>
      <AIAssistant
        context="transactions"
        data={transactionData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#e9ecef',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 100, // Set a fixed width for each header item
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  description: {
    flex: 1,
    textAlign: 'center',
  },
  amount: {
    flex: 1,
    textAlign: 'center',
  },
  date: {
    flex: 1,
    textAlign: 'center',
  },
  type: {
    flex: 1,
    textAlign: 'center',
  },
});

export default TransactionList;
