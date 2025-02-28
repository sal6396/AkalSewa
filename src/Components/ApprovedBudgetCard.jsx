import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  Image,
  Linking,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs'; // For file system operations
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApprovedBudgetCard = ({
  id,
  estimate_title,
  estimate_approve_date,
  estimate_upload_date,
  estimate_approve_using,
  bill_date,
  subwork,
  materials_list = [],
  ce_file_1, // Single file URL or filename
  status,
}) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Track the currently selected file
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // Track download state

  // Calculate total amount
  const totalAmount = materials_list.reduce((sum, item) => sum + item.qty * item.rate, 0).toFixed(2);

  // Calculate source-wise totals
  const sourceWiseTotal = materials_list.reduce((acc, item) => {
    if (!acc[item.source_type]) {
      acc[item.source_type] = 0;
    }
    acc[item.source_type] += item.qty * item.rate;
    return acc;
  }, {});

  const usedSources = Object.entries(sourceWiseTotal).filter(([_, value]) => value > 0);

  // Base S3 URL for file storage
  const BASE_S3_URL =
    "https://akalconuploaddoc.s3.ap-south-1.amazonaws.com/uploads/estimate/";

  // Construct the full file URL
  const constructFileUrl = (fileName) => {
    if (!fileName) return null;
    return `${BASE_S3_URL}${encodeURIComponent(fileName)}?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5YUG5A7WIQB7ZZOM%2F20250219%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250219T114349Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=cba895f430b4d3a9e22e601b6c4e29ab3a9bd527803ebe598f700aad967b3ca3`;
  };

  // Extract the file extension
  const extractFileExtension = (fileName) => {
    if (!fileName) return null;
    const decodedFileName = decodeURIComponent(fileName);
    const matches = decodedFileName.match(/\.([a-zA-Z0-9]+)(?:\?.*)?$/);
    return matches ? matches[1].toLowerCase() : null;
  };

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
  //           'Akalsewa App needs access to your storage to download files. Please grant the required permissions.',
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

  // // Check and request storage permission when the component mounts
  // useEffect(() => {
  //   const checkAndRequestPermission = async () => {
  //     const permissionStatus = await AsyncStorage.getItem('storagePermissionGranted');
  //     if (permissionStatus !== 'true') {
  //       await requestStoragePermission();
  //     }
  //   };
  //   checkAndRequestPermission();
  // }, []);

  // Handle downloading files
  // const handleDownloadFile = async () => {
  //   if (!ce_file_1) {
  //     Alert.alert('Error', 'File not available');
  //     return;
  //   }

  //   const fileUrl = constructFileUrl(ce_file_1); // Construct the full file URL
  //   const fileExtension = extractFileExtension(ce_file_1); // Extract the file extension

  //   if (!fileExtension) {
  //     Alert.alert('Error', 'Unable to determine file type.');
  //     return;
  //   }

  //   try {
  //     const hasPermission = await requestStoragePermission();
  //     if (!hasPermission) return;

  //     setIsDownloading(true);

  //     // Define the local file path
  //     const fileName = `downloaded_file_${moment().format('YYYYMMDDHHmmss')}.${fileExtension}`;
  //     const localFilePath =
  //       Platform.OS === 'ios'
  //         ? `${RNFS.DocumentDirectoryPath}/${fileName}`
  //         : `${RNFS.DownloadDirectoryPath}/${fileName}`;

  //     console.log('Downloading file from:', fileUrl);
  //     console.log('Saving to local path:', localFilePath);

  //     // Download the file
  //     const downloadResult = await RNFS.downloadFile({
  //       fromUrl: fileUrl,
  //       toFile: localFilePath,
  //       progressDivider: 5, // Optional: Update progress every 5%
  //     }).promise;

  //     if (downloadResult.statusCode === 200) {
  //       Alert.alert('Success', 'File downloaded successfully.');

  //       // Open the downloaded file
  //       const canOpen = await Linking.canOpenURL(`file://${localFilePath}`);
  //       if (canOpen) {
  //         await Linking.openURL(`file://${localFilePath}`);
  //       } else {
  //         Alert.alert('Error', 'Unable to open the downloaded file.');
  //       }
  //     } else {
  //       Alert.alert('Error', `Failed to download the file. Status code: ${downloadResult.statusCode}`);
  //     }
  //   } catch (error) {
  //     console.error('Error downloading file:', error.message || error);
  //     Alert.alert('Error', 'An unexpected error occurred while downloading the file.');
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

  return (
    <View style={styles.card}>
      {/* Card Header */}
      <Text style={styles.estimateTitle}>{estimate_title}</Text>

      {/* Card Body */}
      <Text style={styles.cardText}>
        Estimate ID: {id}
      </Text>
      <Text style={styles.cardText}>Bill Date: {bill_date}</Text>
      <Text style={styles.cardText}>Estimate Approved Date: {estimate_approve_date}</Text>
      <Text style={styles.cardText}>Estimate Approved Using: {estimate_approve_using}</Text>
      <Text style={styles.cardText}>Estimate Upload Date: {estimate_upload_date}</Text>
      <Text style={styles.cardText}>Subwork: {subwork}</Text>

      {/* Clerk CE File Section */}
      <View style={styles.ceFileButton}>
        <Text style={styles.ceFileButtonText}>Clerk CE File</Text>
        {ce_file_1 ? (
          <TouchableOpacity
            style={styles.ceFileViewButton}
            onPress={() => Alert.alert('Info', 'Download feature is available Soon .')}
            disabled={isDownloading}
          >
            <Text style={styles.ceFileViewText}>
              {isDownloading ? 'Downloading...' : 'Download File'}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.notUploadedText}>Not Uploaded</Text>
        )}
      </View>

      {/* Image Modal */}
      <Modal visible={imageModalVisible} transparent={true} onRequestClose={() => setImageModalVisible(false)}>
        <View style={styles.imageModalContainer}>
          <TouchableOpacity
            style={styles.closeImageButton}
            onPress={() => {
              setImageModalVisible(false);
              setSelectedFile(null);
            }}
          >
            <Text style={styles.closeImageButtonText}>Close</Text>
          </TouchableOpacity>
          {imageLoading && <ActivityIndicator size="large" color="#fff" />}
          {imageError ? (
            <Text style={styles.errorText}>Failed to load image</Text>
          ) : (
            selectedFile && (
              <Image
                style={styles.image}
                source={{ uri: selectedFile }}
                onLoad={() => {
                  console.log('Image loaded successfully');
                  setImageLoading(false);
                }}
                onError={(error) => {
                  console.log('Image loading error:', error.nativeEvent.error);
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
            )
          )}
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  estimateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  ceFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ceFileButtonText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  ceFileViewButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  ceFileViewText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  notUploadedText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  closeImageButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8, 
  },
  closeImageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
});

export default ApprovedBudgetCard;