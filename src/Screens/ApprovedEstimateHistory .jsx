import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { fetchApprovedEstHis } from '../api/approvedEstimateHis';
import ApprovedBudgetCard from '../Components/ApprovedBudgetCard';

const ApprovedEstimateHistory = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estimateCount, setEstimateCount] = useState(0); // State to track the count of estimates
  const [sortModalVisible, setSortModalVisible] = useState(false); // State to control sort modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching approved estimates...');
        // Retrieve user_id, token, and imei_number from AsyncStorage
        const [userId, token, imeiNumber] = await Promise.all([
          AsyncStorage.getItem('userId'),
          AsyncStorage.getItem('userToken'),
          AsyncStorage.getItem('imeiNumber'),
        ]);
        console.log('AsyncStorage Parameters:', { userId, token, imeiNumber });
        // Validate parameters
        if (!userId || !token || !imeiNumber) {
          console.error('Missing required parameters for API call');
          Alert.alert('Error', 'Required parameters are missing. Please try again.');
          setLoading(false);
          return;
        }
        // Call the API function
        console.log('Calling fetchApprovedEstHis with parameters:', { userId, token, imeiNumber });
        const response = await fetchApprovedEstHis(userId, token, imeiNumber);
        if (response && response.status && Array.isArray(response.data)) {
          console.log('Raw API Data:', response.data);
          // Directly use the raw API data without filtering
          const rawData = response.data;
          // Update the budget data and estimate count
          setBudgetData(rawData);
          setEstimateCount(rawData.length); // Set the count of estimates
        } else {
          console.error('Invalid API response:', response);
          Alert.alert('Error', 'Invalid API response. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching approved estimates:', error.message || error);
        Alert.alert('Error', 'Failed to fetch data. Please check your internet connection and try again.');
      } finally {
        setLoading(false); // Stop loading after data is fetched
        console.log('Loading state set to false.');
      }
    };
    fetchData();
  }, []); // Removed dependency on route.params since we're using AsyncStorage

  // Handle sorting of estimates
  const handleSort = (key) => {
    let sortedEstimates;

    if (key === 'estimate_id') {
      // Sort by Estimate ID (numeric)
      sortedEstimates = [...budgetData].sort((a, b) => b.estimate_id - a.estimate_id);
    } else if (key === 'academy_name') {
      // Sort by Academy Name (alphabetical)
      sortedEstimates = [...budgetData].sort((a, b) =>
        (a.academy_name || '').localeCompare(b.academy_name || '')
      );
    } else if (key === 'latest') {
      // Sort by Latest (most recent bill_date)
      sortedEstimates = [...budgetData].sort(
        (a, b) => new Date(b.bill_date) - new Date(a.bill_date)
      );
    }

    console.log('API Debug - Sorted Estimates:', sortedEstimates);
    setBudgetData(sortedEstimates);
    setSortModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Display the counter */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Total Estimates:</Text>
        <Text style={styles.counterNoText}>{estimateCount}</Text>
      </View>

      {/* Loading state */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : budgetData.length === 0 ? (
        <Text style={styles.noDataText}>No estimates found.</Text>
      ) : (
        <FlatList
          data={budgetData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ApprovedBudgetCard {...item} />}
        />
      )}

      {/* Sort button */}
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortModalVisible(true)}
      >
        <Text style={styles.sortButtonText}>Sort Estimates</Text>
      </TouchableOpacity>

      {/* Sort modal */}
      <Modal visible={sortModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            {/* Sort by Estimate ID */}
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSort('estimate_id')}
            >
              <Text style={styles.sortButtonText}>Estimate ID</Text>
            </TouchableOpacity>
            {/* Sort by Academy Name */}
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSort('academy_name')}
            >
              <Text style={styles.sortButtonText}>Academy Name</Text>
            </TouchableOpacity>
            {/* Sort by Latest */}
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSort('latest')}
            >
              <Text style={styles.sortButtonText}>Latest</Text>
            </TouchableOpacity>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSortModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  counterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  counterNoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  sortButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    margin: 16,
    alignSelf: 'center',
  },
  sortButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sortOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ApprovedEstimateHistory;