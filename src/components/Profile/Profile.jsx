import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [savingGoal, setSavingGoal] = useState('');
  const [expenseMeter, setExpenseMeter] = useState('');
  const [showClearTransactionsModal, setShowClearTransactionsModal] = useState(false);
  const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        const email = await AsyncStorage.getItem('email');
        const mobile = await AsyncStorage.getItem('mobile');
        const savingGoal = await AsyncStorage.getItem('savingGoal');
        const expenseMeter = await AsyncStorage.getItem('expenseMeter');

        if (name !== null) setName(name);
        if (email !== null) setEmail(email);
        if (mobile !== null) setMobile(mobile);
        if (savingGoal !== null) setSavingGoal(savingGoal);
        if (expenseMeter !== null) setExpenseMeter(expenseMeter);
      } catch (error) {
        Alert.alert("Error loading profile data");
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('mobile', mobile);
      await AsyncStorage.setItem('savingGoal', savingGoal);
      await AsyncStorage.setItem('expenseMeter', expenseMeter);
      Alert.alert("Profile saved successfully");
    } catch (error) {
      Alert.alert("Error saving profile data");
    }
  };

  const handleClearTransactions = () => {
    onClearTransactions();
    setShowClearTransactionsModal(false);
  };

  const handleDeleteData = () => {
    onDeleteData();
    setShowDeleteDataModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.inputGroup}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          required
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          required
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Mobile</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Saving Goal</Text>
        <TextInput
          style={styles.input}
          value={savingGoal}
          onChangeText={setSavingGoal}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Expense Meter</Text>
        <TextInput
          style={styles.input}
          value={expenseMeter}
          onChangeText={setExpenseMeter}
          keyboardType="numeric"
        />
      </View>
      <Button title="Save Profile" onPress={saveProfile} />
      <Button title="Clear Transactions" onPress={() => setShowClearTransactionsModal(true)} />
      <Button title="Delete My Data" onPress={() => setShowDeleteDataModal(true)} color="red" />

      <Modal
        visible={showClearTransactionsModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to clear all transactions?</Text>
            <View style={styles.modalButtons}>
              <Button title="Yes" onPress={handleClearTransactions} />
              <Button title="No" onPress={() => setShowClearTransactionsModal(false)} color="gray" />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showDeleteDataModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to delete all your data?</Text>
            <View style={styles.modalButtons}>
              <Button title="Yes" onPress={handleDeleteData} />
              <Button title="No" onPress={() => setShowDeleteDataModal(false)} color="gray" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});


export default ProfilePage;
