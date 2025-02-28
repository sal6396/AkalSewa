import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  PermissionsAndroid,
  Linking,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchEstimatesId } from '../api/estimateApi';

const Dashboard = ({ route }) => {
  const { user } = route.params; // ✅ Receiving user data from LoginScreen
  const navigation = useNavigation();

  // State to track the estimate count
  const [estimateCount, setEstimateCount] = useState(0);
  const [previousCount, setPreviousCount] = useState(0);



    // Request storage permission for Android
    // const requestStoragePermission = async () => {
    //   try {
    //     if (Platform.OS === 'android') {
    //       const granted = await PermissionsAndroid.requestMultiple([
    //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       ]);
  
    //       if (
    //         granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
    //         granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
    //       ) {
    //         console.log('Storage permissions granted');
    //         await AsyncStorage.setItem('storagePermissionGranted', 'true'); // Persist permission status
    //         return true;
    //       } else {
    //         console.log('Storage permission denied');
    //         Alert.alert(
    //           'Permission Required',
    //           'Akalsewa App needs access to your storage to download files. Please grant the required permissions in the app settings.',
    //           [
    //             { text: 'Cancel', style: 'cancel' },
    //             {
    //               text: 'Go to Settings',
    //               onPress: () => {
    //                 Linking.openSettings(); // Open app settings
    //               },
    //             },
    //           ]
    //         );
    //         await AsyncStorage.setItem('storagePermissionGranted', 'false'); // Persist permission status
    //         return false;
    //       }
    //     }
    //     // No need for permissions on iOS
    //     await AsyncStorage.setItem('storagePermissionGranted', 'true'); // Assume granted on iOS
    //     return true;
    //   } catch (err) {
    //     console.warn('Error requesting storage permissions:', err);
    //     Alert.alert('Error', 'An unexpected error occurred while requesting storage permissions.');
    //     return false;
    //   }
    // };
  
    // // Check and request permissions when the dashboard screen loads
    // useEffect(() => {
    //   const checkAndRequestPermission = async () => {
    //     const permissionStatus = await AsyncStorage.getItem('storagePermissionGranted');
    //     if (permissionStatus !== 'true') {
    //       await requestStoragePermission();
    //     }
    //   };
    //   checkAndRequestPermission();
    // }, []);

    


  // Fetch estimate count on component mount
  useEffect(() => {
    fetchEstimateCount();
  }, []);
  

  // Fetch estimate count from the API
  const fetchEstimateCount = async () => {
    try {
      const [userId, token, imeiNumber] = await Promise.all([
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('imeiNumber'),
      ]);
      if (userId && token && imeiNumber) {
        const estimateIds = await fetchEstimatesId(userId, token, imeiNumber);
        const newCount = estimateIds.length;

        // Compare with previous count to detect changes
        if (newCount !== previousCount) {
          setPreviousCount(newCount);
          setEstimateCount(newCount);

        
        }
      } else {
        Alert.alert('Error', 'Missing user credentials.');
      }
    } catch (err) {
      console.error('Error fetching estimate count:', err);
    }
  };

  // Dashboard items with badge for "All Estimates"
  const dashboardItems = [
    { icon: '📚', title: 'All Academy', color: '#2196F3', screen: 'AcademyPage' },
    {
      icon: '📊',
      title: 'All Estimates',
      color: '#4CAF50',
      screen: 'Estimate',
      badgeCount: estimateCount, // Add badge count here
    },
    { icon: '📊', title: 'Approved Estimate History', color: '#FF9800', screen: 'ApprovedEstimateHistory' },
    { icon: '🧑‍💼', title: 'Profile', color: '#9C27B0', screen: 'Profile' },
  ];

  // Render dashboard item with badge
  const renderDashboardItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.screen, { user })}
    >
      {/* Badge */}
      {item.badgeCount !== undefined && (
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badgeCount}</Text>
          </View>
        </View>
      )}

      {/* Icon and Title */}
      <Text style={[styles.icon, { color: item.color }]}>{item.icon}</Text>
      <Text style={[styles.cardTitle, { color: item.color }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Prevent going back to LoginScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of going back
      e.preventDefault();

      // Optionally, show an alert to inform the user
      Alert.alert(
        'Logout Blocked',
        'You cannot log out from this screen. Please contact support if needed.',
        [{ text: 'OK', style: 'cancel' }]
      );
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
        
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Admin Dashboard</Text>
      </View>
      <FlatList
        data={dashboardItems}
        renderItem={renderDashboardItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('../Assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Dashboard;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  appBar: {
    backgroundColor: 'blue',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  appBarTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  grid: {
    padding: 16,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    flex: 1,
    elevation: 4,
    minHeight: 150,
    position: 'relative', // Required for absolute positioning of the badge
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  icon: {
    fontSize: 48,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  image: {
    width: 250,
    height: 250,
    opacity: 0.2,
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});