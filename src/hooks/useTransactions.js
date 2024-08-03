import { useState, useEffect, useCallback } from 'react';
import { getTransactions, addTransaction as apiAddTransaction } from '../services/api';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
      calculateTotals(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const calculateTotals = (transactionData) => {
    let income = 0;
    let expenses = 0;

    transactionData.forEach(transaction => {
       let transactionAmount;

      if (typeof transaction.amount === 'string') {
          transactionAmount = parseFloat(transaction.amount); // Convert to integer if it's a string
      } else if (typeof transaction.amount === 'number' && !Number.isInteger(transaction.amount)) {
          transactionAmount = transaction.amount; // Already an integer
      } else {
          transactionAmount = 0; // Handle other types as needed
      }
      if (transaction.type === 'income') {
        income += transactionAmount;
      } else {
        expenses += transactionAmount;
      }
    });

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setTotalBalance(income - expenses);
  };

  const addTransaction = async (newTransaction) => {
    try {
      const addedTransaction = await apiAddTransaction(newTransaction);
      setTransactions(prevTransactions => [...prevTransactions, addedTransaction]);
      calculateTotals([...transactions, addedTransaction]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return {
    transactions,
    totalBalance,
    totalIncome,
    totalExpenses,
    addTransaction,
    fetchTransactions
  };
}