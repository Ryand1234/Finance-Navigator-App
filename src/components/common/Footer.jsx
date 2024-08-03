import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© {new Date().getFullYear()} Finance Navigator. All rights reserved.</Text>
      <Text style={styles.footerText}>Designed for personal financial management.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: '2%',
    backgroundColor: '#007bff',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
//     position: 'fixed',
//     bottom: 0,
    width: '100%',
  },
});

export default Footer;
