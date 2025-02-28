import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BudgetCard from '../Components/BudgetCard';
import { approveEstimate, fetchEstimatesId, fetchEstimatesListbyId } from '../api/estimateApi';

// Import platform-specific badge libraries
import AndroidBadge from 'react-native-android-badge'; // For Android
import { NativeModules } from 'react-native'; // For iOS
import moment from 'moment';
const { AppIconBadgeManager } = NativeModules; // Native module for iOS badge management

const Estimate = ({ navigation }) => {
  const [estimates, setEstimates] = useState([]);
  const [previousEstimates, setPreviousEstimates] = useState([]); // To track previous state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  // Fetch estimates on component mount
  useEffect(() => {
    fetchEstimates();
  }, []);

  // Check for new estimates
  const checkForNewEstimates = (newEstimates) => {
    const newEstimateIds = newEstimates.map((item) => item.estimate_id);
    const previousEstimateIds = previousEstimates.map((item) => item.estimate_id);
    // Detect new estimates
    const addedEstimates = newEstimates.filter(
      (item) => !previousEstimateIds.includes(item.estimate_id)
    );
    return addedEstimates.length > 0;
  };

  // Notify user about new estimates and update badge count
  const notifyUserAboutNewEstimates = (addedEstimatesCount) => {
    Alert.alert('New Estimates Added', `${addedEstimatesCount} new estimates have been added.`);
    // Update app icon badge count
    if (Platform.OS === 'android') {
      AndroidBadge.setBadge(addedEstimatesCount); // Set badge for Android
    } else if (Platform.OS === 'ios') {
      AppIconBadgeManager.setBadgeCount(addedEstimatesCount); // Set badge for iOS
    }
  };

  // Fetch estimates from the API
  const fetchEstimates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [userId, token, imeiNumber] = await Promise.all([
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('imeiNumber'),
      ]);
      if (userId && token && imeiNumber) {
        const estimateIds = await fetchEstimatesId(userId, token, imeiNumber);
        if (estimateIds.length > 0) {
          const estimateLists = await Promise.all(
            estimateIds.map(async (estimateId) => {
              const response = await fetchEstimatesListbyId(userId, token, imeiNumber, estimateId);
              return response?.data || [];
            })
          );
          const flattenedEstimates = estimateLists.flat();
          const sortedEstimates = flattenedEstimates.sort((a, b) => new Date(b.bill_date) - new Date(a.bill_date));
          // Compare with previous estimates to detect new estimates
          const hasNewEstimates = checkForNewEstimates(sortedEstimates);
          if (hasNewEstimates) {
            const addedEstimatesCount = sortedEstimates.filter(
              (item) => !previousEstimates.some((prev) => prev.estimate_id === item.estimate_id)
            ).length;
            notifyUserAboutNewEstimates(addedEstimatesCount);
          }
          setEstimates(sortedEstimates);
          setPreviousEstimates(sortedEstimates); // Update previous state
        } else {
          Alert.alert('No Data', 'No estimates found.');
          setEstimates([]);
        }
      } else {
        Alert.alert('Error', 'Missing user credentials.');
      }
    } catch (err) {
      console.error('Error fetching estimates:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle approval of an estimate
  const handleApprove = async (estimateId) => {
    try {
      setIsLoading(true);
  
      const [userId, token, imeiNumber] = await Promise.all([
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('imeiNumber'),
      ]);
  
      if (!userId || !token || !imeiNumber) {
        Alert.alert('Error', 'Missing user credentials.');
        return;
      }
  
      // Fetch the current date and time in the desired format
      const currentDate = moment().format('YYYY-MM-DD'); // Local time in SQL-compatible format
  
      // Call the API to approve the estimate, including the current date and time
      const approvalResponse = await approveEstimate(userId, token, imeiNumber, estimateId, {
        estimate_upload_date: currentDate, // Send the formatted date to the server
      });
  
      if (approvalResponse.success) {
        Alert.alert('Success', approvalResponse.message);
        fetchEstimates(); // Refresh the estimates list
      } else {
        Alert.alert('Error', approvalResponse.message || 'Failed to approve estimate.');
      }
    } catch (error) {
      console.error('Error during approval:', error);
      Alert.alert('Error', 'An unexpected error occurred while approving the estimate.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sorting of estimates
  const handleSort = (key) => {
    let sortedEstimates;
  
    if (key === 'estimate_id') {
      // Sort by Estimate ID (numeric)
      sortedEstimates = [...estimates].sort((a, b) => b.estimate_id - a.estimate_id);
    } else if (key === 'academy_name') {
      // Sort by Academy Name (alphabetical)
      sortedEstimates = [...estimates].sort((a, b) =>
        (a.academy_name || '').localeCompare(b.academy_name || '')
      );
    } else if (key === 'latest') {
      // Sort by Latest (most recent bill_date)
      sortedEstimates = [...estimates].sort(
        (a, b) => new Date(b.bill_date) - new Date(a.bill_date)
      );
    }
  
    console.log('API Debug - Sorted Estimates:', sortedEstimates);
    setEstimates(sortedEstimates);
    setSortModalVisible(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchEstimates}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Display total count of estimates */}
      <Text style={styles.totalCount}>Total Estimates: {estimates.length}</Text>
      {/* No data state */}
      {estimates.length === 0 ? (
        <Text style={styles.noDataText}>No estimates found.</Text>
      ) : (
        <FlatList
          data={estimates}
          keyExtractor={(item) => item.estimate_id?.toString() || Math.random().toString()}
          renderItem={({ item }) => <BudgetCard {...item} onApprove={handleApprove} />}
          contentContainerStyle={styles.list}
        />
      )}
      {/* Sort button */}
      <TouchableOpacity style={styles.sortButton} onPress={() => setSortModalVisible(true)}>
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
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
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

export default Estimate;