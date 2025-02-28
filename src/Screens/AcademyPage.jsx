import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fetchAcademyList } from '../api/acedemyApi';

const AcademyPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [academyList, setAcademyList] = useState([]);
  const [filteredAcademyList, setFilteredAcademyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch academies from the API
  const fetchAcademies = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const id = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      const imei_number = await AsyncStorage.getItem('imeiNumber');

      if (!id || !token || !imei_number) {
        throw new Error('Missing required credentials.');
      }

      const response = await fetchAcademyList(id, token, imei_number);

      if (response.status && Array.isArray(response.data)) {
        let academies = response.data.map((item) => ({
          id: item.id,
          academy_name: item.aaname || 'N/A',
          zone_name: item.zone_name || 'N/A',
        }));

        // Sort academies by `zone_name` alphabetically
        academies.sort((a, b) => a.zone_name.localeCompare(b.zone_name));

        setAcademyList(academies);
        setFilteredAcademyList(academies);
      } else {
        Alert.alert('No Data', 'No estimates found.');
      }
    } catch (error) {
      console.error('Error fetching academies:');
      setErrorMessage(error.message);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch academies on component mount
  useEffect(() => {
    fetchAcademies();
  }, [fetchAcademies]);

  // Filter academies based on search query
  useEffect(() => {
    const filteredList = academyList.filter(
      (academy) =>
        academy.academy_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        academy.zone_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAcademyList(filteredList);
  }, [searchQuery, academyList]);

  // Handle navigation to academy details
  const handleViewDetails = (academy) => {
    navigation.navigate('AcademyDetails', { academy });
  };

  // Render each academy row
  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.row} onPress={() => handleViewDetails(item)}>
      <Text style={styles.cellSerialNo}>{index + 1}</Text>
      <Text style={styles.cellZoneName}>{item.zone_name}</Text>
      <Text style={styles.cellAcademy}>{item.academy_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Academy or Zone"
        placeholderTextColor="#CCCCCC"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Heading */}
      <Text style={styles.heading}>Academy List</Text>

      {/* Subheading */}
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingSerialNo}>Serial No</Text>
        <Text style={styles.subHeadingZone}>Zone Name</Text>
        <Text style={styles.subHeadingAcademy}>Academy Name</Text>
      </View>

      {/* Loading State */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : hasError ? (
        <Text style={styles.errorText}>Failed to load data: {errorMessage}</Text>
      ) : (
        <FlatList
          data={filteredAcademyList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.noDataText}>No academies found.</Text>}
        />
      )}
    </View>
  );
};

export default AcademyPage;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333333',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  subHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  subHeadingSerialNo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    width: '20%',
  },
  subHeadingZone: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    width: '35%',
    marginLeft: 8,
  },
  subHeadingAcademy: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    width: '45%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cellSerialNo: {
    fontSize: 14,
    color: '#666666',
    width: '20%',
    textAlign: 'center',
  },
  cellZoneName: {
    fontSize: 14,
    color: '#007BFF',
    width: '35%',
    marginLeft: 10,
  },
  cellAcademy: {
    fontSize: 14,
    color: '#333333',
    width: '45%',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noDataText: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 20,
    fontSize: 16,
  },
});