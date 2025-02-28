import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const AddEstimate = ({ navigation }) => {
  const [estimateCost, setEstimateCost] = useState('');
  const [estimateNumber, setEstimateNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [vendorName, setVendorName] = useState('');
  const [branch, setBranch] = useState('');
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const types = ['Type A', 'Type B', 'Type C', 'Type D'];

  const validateForm = () => {
    if (!estimateCost || isNaN(estimateCost)) {
      Alert.alert('Error', 'Please enter a valid estimate cost.');
      return false;
    }
    if (!estimateNumber) {
      Alert.alert('Error', 'Please enter the estimate number.');
      return false;
    }
    if (!vendorName) {
      Alert.alert('Error', 'Please enter the vendor name.');
      return false;
    }
    if (!branch) {
      Alert.alert('Error', 'Please enter the branch.');
      return false;
    }
    if (!title) {
      Alert.alert('Error', 'Please enter the title.');
      return false;
    }
    if (!selectedType) {
      Alert.alert('Error', 'Please select a type.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Estimate saved successfully!');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.formContainer}>
        <InputField
          label="Estimate Cost (₹)"
          value={estimateCost}
          onChangeText={setEstimateCost}
          keyboardType="numeric"
        />
        <InputField
          label="Estimate Number"
          value={estimateNumber}
          onChangeText={setEstimateNumber}
        />

        <DatePickerField
          label="Estimate Date"
          date={date}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          onDateChange={setDate}
        />

        <InputField label="Vendor Name" value={vendorName} onChangeText={setVendorName} />
        <InputField label="Branch" value={branch} onChangeText={setBranch} />
        <InputField label="Title" value={title} onChangeText={setTitle} />

        <Dropdown
          label="Type"
          data={types}
          selectedValue={selectedType}
          onValueChange={setSelectedType}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SAVE ESTIMATE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const InputField = ({ label, value, onChangeText, keyboardType }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={`Enter ${label}`}
      placeholderTextColor={'#AAAAAA'}
    />
  </View>
);

const DatePickerField = ({ label, date, showDatePicker, setShowDatePicker, onDateChange }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity
      style={styles.datePicker}
      onPress={() => setShowDatePicker(true)}
    >
      <Text style={styles.dateText}>{
        date ? date.toISOString().split('T')[0] : 'Select Estimate Date'
      }</Text>
    </TouchableOpacity>

    <DatePicker
      modal
      open={showDatePicker}
      date={date}
      mode="date"
      minimumDate={new Date(2000, 0, 1)}
      maximumDate={new Date(2030, 11, 31)}
      onConfirm={(selectedDate) => {
        setShowDatePicker(false);
        onDateChange(selectedDate);
      }}
      onCancel={() => setShowDatePicker(false)}
    />
  </View>
);

const Dropdown = ({ label, data, selectedValue, onValueChange }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity
      style={styles.dropdown}
      onPress={() =>
        Alert.alert(
          `Select ${label}`,
          null,
          data.map((item) => ({
            text: item,
            onPress: () => onValueChange(item),
          }))
        )
      }
    >
      <Text style={selectedValue ? styles.dropdownText : styles.placeholderText}>
        {selectedValue || `Select ${label}`}
      </Text>
    </TouchableOpacity>
  </View>
);

export default AddEstimate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appBar: {
    backgroundColor: '#007BFF',
    padding: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 4,
  },
  appBarTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F9F9F9',
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  dateText: {
    color: '#000000',
    fontSize: 16,
  },
  placeholderText: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F9F9F9',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
    alignContent: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
