import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure the import is correct
import DateTimePicker from '@react-native-community/datetimepicker';

const TransactionForm = ({ onSubmit, onClose }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!amount || !description || !date) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    onSubmit({ amount: parseFloat(amount), description, type, date });
    setAmount('');
    setDescription('');
    setType('income');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate.toISOString().split('T')[0]);
  };

  return (
    <Modal transparent={true} visible={true} animationType="slide">
      <View style={styles.popupOverlay}>
        <View style={styles.popupContent}>
          <Text style={styles.header}>Add Transaction</Text>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text>Amount</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                required
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                required
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Type</Text>
              <TextInput
                style={styles.input}
                value={type}
                onChangeText={setType}
                required
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateText}>{date}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date(date)}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Add Transaction" onPress={handleSubmit} />
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%', // Set the width of the modal content to 80% of the screen width
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TransactionForm;
