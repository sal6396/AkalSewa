import { apiClient } from "./apiClient";

// Fetch Academy List
export const fetchAcademyList = async () => {
  try {
    console.log('API Call: Fetching academy list...');
    
    // Use the apiClient function to make the API call
    const response = await apiClient('Academy_Api/getAcademyList', 'POST', {}, null); // No need for user credentials here

    console.log('API Response:', response); // Log the full API response

    if (!response || !response.status) {
      console.error('API Error: Invalid or missing response status.');
      throw new Error(response?.message || 'Invalid API response');
    }

    return response;
  } catch (error) {
    console.error('Error during academy list fetch:', error);
    return { status: false, message: error.message || 'An unexpected error occurred' };
  }
};

// Search Estimates by Academy and Estimate ID
export const estimateSearch = async (user_id, token, imei_number, estimate_id, academy_id) => {
  try {
    console.log('API Call: Fetching approved estimates...');
    console.log('Request Parameters:', { user_id, token, imei_number, estimate_id, academy_id });

    // Use the apiClient function to make the API call
    const response = await apiClient('Sewadar_Api/sewadar_estimate_search_by_estimateid_academy', 'POST', {
      user_id,
      token,
      imei_number,
      estimate_id,
      academy_id,
    }, token);

    console.log('API Response:', response); // Log the full API response

    if (!response || !response.status) {
      console.error('API Error: Invalid or missing response status.');
      throw new Error(response?.message || 'Invalid API response');
    }

    return response;
  } catch (error) {
    console.error('Error during estimate search:', error);
    return { status: false, message: error.message || 'An unexpected error occurred' };
  }
};