import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Finance Navigator</Text>
      <View style={styles.navList}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
          <Text style={styles.navItem}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.navItem}>Transactions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    padding: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    margin: '0',
  },
  navList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    color: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    margin: '0 15px',
  },
});

export default Header;
