import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { estimateSearch, fetchAcademyList } from '../api/estimateSearch';

const EstimateSearch = ({ navigation }) => {
  const [selectedAcademy, setSelectedAcademy] = useState('');
  const [estimateNo, setEstimateNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [academies, setAcademies] = useState([]); // List of academies

  // Fetch academies on component mount
  useEffect(() => {
    fetchAcademies();
  }, []);

  // Fetch academies from the server
  const fetchAcademies = async () => {
    try {
      setIsLoading(true);

      // Fetch user credentials from AsyncStorage
      const [userId, token, imeiNumber] = await Promise.all([
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('imeiNumber'),
      ]);

      if (!userId || !token || !imeiNumber) {
        throw new Error('Missing user credentials.');
      }

      // Call the API to fetch academies
      const response = await fetchAcademyList(userId, token, imeiNumber);

      if (response?.status && Array.isArray(response?.data)) {
        setAcademies(response.data);
      } else {
        throw new Error(response?.message || 'Failed to fetch academies.');
      }
    } catch (error) {
      console.error('Error fetching academies:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred while fetching academies.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedAcademy || !estimateNo.trim()) {
      Alert.alert('Validation Error', 'Please select an academy and enter an estimate number.');
      return;
    }

    // Validate that estimateNo contains only numeric values
    if (!/^\d+$/.test(estimateNo)) {
      Alert.alert('Validation Error', 'Estimate number must contain only numeric values.');
      return;
    }

    setIsLoading(true);

    try {
      // Fetch user credentials from AsyncStorage
      const [userId, token, imeiNumber] = await Promise.all([
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('imeiNumber'),
      ]);

      if (!userId || !token || !imeiNumber) {
        Alert.alert('Error', 'Missing user credentials.');
        return;
      }

      // Call the API to search for estimates
      const response = await estimateSearch(userId, token, imeiNumber, estimateNo, selectedAcademy);

      if (response?.status && Array.isArray(response?.data)) {
        // Navigate to the results screen or display the data
        navigation.navigate('EstimateResults', { estimates: response.data });
      } else {
        Alert.alert('Error', response?.message || 'Failed to fetch estimates.');
      }
    } catch (error) {
      console.error('Error during estimate search:', error);
      Alert.alert('Error', 'An unexpected error occurred while searching for estimates.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {/* Academy Picker */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedAcademy}
                onValueChange={(itemValue) => setSelectedAcademy(itemValue)}
                style={[styles.picker, { color: 'black' }]}
                mode="dropdown"
                dropdownIconColor="black"
              >
                <Picker.Item label="Select Academy" value="" color="black" />
                {academies.map((academy) => (
                  <Picker.Item
                    key={academy.academy_id}
                    label={academy.academy}
                    value={academy.academy_id}
                    color="black"
                    style={{ backgroundColor: '#f0f0f0' }}
                  />
                ))}
              </Picker>
            </View>

            {/* Estimate Number Input */}
            <TextInput
              style={styles.input}
              placeholder="Estimate No"
              placeholderTextColor={'#000'}
              value={estimateNo}
              onChangeText={setEstimateNo}
              keyboardType="numeric" // Ensure numeric input
            />

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#e0e0e0',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#e0e0e0',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EstimateSearch;