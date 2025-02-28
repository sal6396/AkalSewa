import { apiClient } from './apiClient';
import DeviceInfo from 'react-native-device-info';

// Login API
export const loginUser = async (username, password) => {
  const imeiNumber = await DeviceInfo.getUniqueId();
  return apiClient('Login_Api/login', 'POST', { username, password, imei_number: imeiNumber });
};

// Update IMEI API
export const updateImei = async (id, token) => {
  const imeiNumber = await DeviceInfo.getUniqueId();
  return apiClient('Login_Api/updateImei', 'POST', { id, token, imei_number: imeiNumber }, token);
};
