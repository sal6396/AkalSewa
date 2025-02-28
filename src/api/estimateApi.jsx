import { apiClient } from './apiClient';

export const fetchEstimatesId = async (id, token, imei_number) => {
  console.log('fetchEstimatesId:', { id, token, imei_number });
  try {
    const response = await apiClient('Sewadar_Api/sewadar_estimate_list', 'POST', {
      id,
      token,
      imei_number,
    }, token);

    console.log('API Response:', response);

    if (response?.status && Array.isArray(response?.data)) {
      return response.data.map(item => item.estimate_id);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching estimate IDs:', error);
    return [];
  }
};

export const fetchEstimatesListbyId = async (user_id, token, imei_number, estimate_id) => {
  try {
    const response = await apiClient('Sewadar_Api/sewadar_estimate_listbyid', 'POST', {
      user_id, // Use 'user_id' if the API expects this field name
      token,
      imei_number,
      estimate_id,
    }, token);

    console.log('API Debug - fetchEstimatesListbyId Response:', response); // Debugging
    return response;
  } catch (error) {
    console.error('Error fetching estimates list by ID:', error);
    return { status: false, message: error.message };
  }
}; 

export const approveEstimate = async (user_id, token, imei_number, estimate_id, { estimate_upload_date }) => {
  try {
    console.log('Approve Estimate Payload:', { user_id, token, imei_number, estimate_id, estimate_upload_date });

    const response = await apiClient('Sewadar_Api/estimate_approve_by_sewadar', 'POST', {
      user_id,
      token,
      imei_number,
      estimate_id,
      estimate_upload_date, // Ensure this field is included
    }, token);

    console.log('API Debug - Approve Estimate Response:', response);

    if (response?.status) {
      return {
        success: true,
        message: response.message,
        data: {
          estimate_id: response.data?.estimate_id,
          status: response.data?.status,
          estimate_upload_date: response.data?.estimate_upload_date, // Include approved_date
        },
      };
    } else {
      return { success: false, message: response.message || 'Failed to approve estimate' };
    }
  } catch (error) {
    console.error('Error approving estimate:', error);
    return { success: false, message: error.message || 'An unexpected error occurred' };
  }
};