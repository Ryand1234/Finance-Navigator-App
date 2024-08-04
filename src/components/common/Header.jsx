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
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#007bff',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  navList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  navItem: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 15,
  },
});

export default Header;
