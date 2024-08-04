import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_STORAGE_KEY = 'financeAppData';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const zero_data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
const BASE_ANALYTICS_DATA = {
  expenseVsTime: {
    labels: months,
    datasets: [
      {
        label: 'Expenses',
        data: zero_data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  },
  savingsRemaining: {
    labels: months,
    datasets: [
      {
        label: 'Savings',
        data: zero_data,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  },
  forecastData: {
    labels: months,
    datasets: [
      {
        label: 'Forecast',
        data: zero_data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }
};

// Helper function to get data from AsyncStorage
const getDataFromAsyncStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : { transactions: [], accountSummary: {}, analyticsData: {} };
  } catch (e) {
    console.error('Error getting data from AsyncStorage', e);
    return { transactions: [], accountSummary: {}, analyticsData: {} };
  }
};

// Helper function to save data to AsyncStorage
const saveDataToAsyncStorage = async (data) => {
  try {
    await AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving data to AsyncStorage', e);
  }
};

const getNumber = (amount) => {
  let transactionAmount;

  if (typeof amount === 'string') {
    transactionAmount = parseFloat(amount); // Convert to integer if it's a string
  } else if (typeof amount === 'number') {
    transactionAmount = amount * 1.0; // Already an integer
  } else {
    transactionAmount = 0.0; // Handle other types as needed
  }
  return transactionAmount;
};

// Savings by month
export const getCurrentMonthSavings = async (monthIndex) => {
  const data = await getDataFromAsyncStorage();
  // Calculate account summary based on transactions
  const totalSavings = data.transactions.reduce((acc, tx) => {
    const txMonth = new Date(tx.date).getMonth();
    // Check if the transaction is in the current month
    if (txMonth === monthIndex) {
      return tx.type === 'income' ? acc + tx.amount : acc - tx.amount; // Add if income, subtract if expense
    }
    return acc; // If not in current month, keep the accumulator unchanged
  }, 0);
  return getNumber(totalSavings);
};

const updateChartData = async (data, transaction) => {
  // Assuming you have chart data structure like this
  if (!data.analyticsData) {
    data.analyticsData = { expenseVsTime: [], savingsRemaining: [] }; // Initialize if not present
  }

  // Example of updating expenseVsTime data
  const monthIndex = new Date(transaction.date).getMonth();
  const year = new Date(transaction.date).getFullYear();

  // Update based on transaction type
  if (transaction.type === 'expense') {
    if (!data.analyticsData[year]) {
      const currentMonthSavings = await getCurrentMonthSavings(monthIndex);
      data.analyticsData[year] = JSON.parse(JSON.stringify(BASE_ANALYTICS_DATA));
      data.analyticsData[year].savingsRemaining['datasets'][0]['data'][monthIndex] = getNumber(currentMonthSavings);
    }
    data.analyticsData[year].expenseVsTime['datasets'][0]['data'][monthIndex] += getNumber(transaction.amount);
    data.analyticsData[year].savingsRemaining['datasets'][0]['data'][monthIndex] -= getNumber(transaction.amount);
  } else if (transaction.type === 'income') {
    if (!data.analyticsData[year]) {
      const currentMonthSavings = await getCurrentMonthSavings(monthIndex);
      data.analyticsData[year] = JSON.parse(JSON.stringify(BASE_ANALYTICS_DATA));
      data.analyticsData[year].savingsRemaining['datasets'][0]['data'][monthIndex] = getNumber(currentMonthSavings);
    }
    data.analyticsData[year].savingsRemaining['datasets'][0]['data'][monthIndex] += getNumber(transaction.amount);
  }

  // Update savingsRemaining or other datasets as needed
};

// Transactions
export const getTransactions = async () => {
  const data = await getDataFromAsyncStorage();
  return data.transactions;
};

export const addTransaction = async (transaction) => {
  const data = await getDataFromAsyncStorage();
  const newTransaction = { ...transaction, id: Date.now() }; // Generate a unique ID based on timestamp
  data.transactions.push(newTransaction);
  await updateChartData(data, newTransaction);
  await saveDataToAsyncStorage(data);
  return newTransaction;
};

// Account Summary
export const getAccountSummary = async () => {
  const data = await getDataFromAsyncStorage();
  // Calculate account summary based on transactions
  const totalBalance = data.transactions.reduce((acc, tx) => {
    return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
  }, 0);

  const totalIncome = data.transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpenses = data.transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const summary = { totalBalance, totalIncome, totalExpenses };
  data.accountSummary = summary;
  await saveDataToAsyncStorage(data);
  return summary;
};

// Analytics
export const getAnalyticsData = async () => {
  const data = await getDataFromAsyncStorage();
  const year = new Date().getFullYear();
  // new app case when there is not data in localstorage
  if(data.analyticsData[year] == undefined) {
    return BASE_ANALYTICS_DATA;
  }
  // Placeholder for analytics logic, can be enhanced later
  return data.analyticsData[year];
};

// Forecasting
export const getForecastData = async () => {
  const data = await getDataFromAsyncStorage();
  const year = new Date().getFullYear();
  // new app case when there is not data in localstorage
  if(data.analyticsData[year] == undefined) {
    return BASE_ANALYTICS_DATA.forcastData;
  }
  // Placeholder for forecasting logic, can be enhanced later
  return data.analyticsData[year].forecastData;
};

// AI Advice
export const getAIAdvice = async () => {
  // Placeholder for AI advice logic, can be enhanced later
  return "This is mock AI advice.";
};
