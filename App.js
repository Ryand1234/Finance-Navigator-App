import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dashboard from './src/components/Dashboard/Dashboard'; // Replace with your actual screen component
import AnalyticsChart from './src/components/Analytics/AnalyticsCharts'
import TransactionList from './src/components/Transactions/TransactionList'
import Header from './src/components/common/Header'; // Adjust the path as needed
import Footer from './src/components/common/Footer'; // Adjust the path as needed

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Dashboard} />
            <Stack.Screen name="Analytics" component={AnalyticsChart} />
            <Stack.Screen name="Transactions" component={TransactionList} />
          </Stack.Navigator>
        </View>
        <Footer />
      </View>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});