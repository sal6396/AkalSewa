import { apiClient } from "./apiClient";

export const fetchApprovedEstHis = async (user_id, token, imei_number) => {
    try {
      console.log('API Call: Fetching approved estimates...');
      console.log('Request Parameters:', { user_id, token, imei_number });
  
      // Use the apiClient function to make the API call
      const response = await apiClient('Sewadar_Api/sewadar_estimate_his', 'POST', {
        user_id, // User ID
        token, // Authentication token
        imei_number, // Device IMEI number
        
      }, token);
  
      console.log('API Response:', response); // Log the full API response
  
      if (!response || !response.status) {
        console.error('API Error: Invalid or missing response status.');
      }
  
      return response;
    } catch (error) {
      console.error('Error fetching approved estimates history:', error);
      return { status: false, message: error.message };
    }
  };