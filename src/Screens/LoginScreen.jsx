import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { loginUser, updateImei } from '../api/authService';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    const checkLoginStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userToken = await AsyncStorage.getItem('userToken');
        const imeiNumber = await AsyncStorage.getItem('imeiNumber');

        if (userId && userToken && imeiNumber) {
          const currentImei = await DeviceInfo.getUniqueId();
          if (currentImei === imeiNumber) {
            navigation.replace('Dashboard', { user: { id: userId, token: userToken } });
          } else {
            Alert.alert(
              'Access Denied',
              'You are trying to access the app from a different device. Please use your registered device.'
            );
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  const validateInputs = () => {
    if (!username.trim()) {
      Alert.alert('Validation Error', 'Username is required.');
      return false;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Password is required.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return; // Stop if validation fails
    setIsLoading(true);
  
    try {
      const imeiNumber = await DeviceInfo.getUniqueId();
      const loginResponse = await loginUser(username, password);
  
      if (loginResponse.status) {
        const { id, token, hasImei, isImeiMatch } = loginResponse.user;
  
        if (hasImei) {
          if (isImeiMatch) {
            await AsyncStorage.multiSet([
              ['userId', id.toString()],
              ['userToken', token],
              ['imeiNumber', imeiNumber],
            ]);
            Alert.alert('Success', 'Login Successful!');
            navigation.replace('Dashboard', { user: loginResponse.user });
          } else {
            Alert.alert(
              'Login Blocked',
              'You are trying to log in from a different device. Please use your original device.'
            );
          }
        } else {
          // If IMEI is not registered, update it
          const imeiUpdateResponse = await updateImei(id, token);
          if (!imeiUpdateResponse.status) {
            Alert.alert('IMEI Update Failed', imeiUpdateResponse.message);
            return; // Stop further execution if IMEI update fails
          }
          
          await AsyncStorage.multiSet([
            ['userId', id.toString()],
            ['userToken', token],
            ['imeiNumber', imeiNumber],
          ]);
          Alert.alert('Success', 'Login & IMEI Updated Successfully!');
          navigation.replace('Dashboard', { user: loginResponse.user });
        }
      } else {
        Alert.alert('Login Failed', loginResponse.message);
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={require('../Assets/logo.png')} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.title}>Admin Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#1976D2"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#1976D2"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginVertical: 24,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#1976D2',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
