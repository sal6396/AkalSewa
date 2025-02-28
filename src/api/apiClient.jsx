
export const apiClient = async (endpoint, method = 'POST', body = null, token = null) => {
  const BASE_URL = 'https://www.akaledu.net/akalsewa/api/';

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error in ${endpoint}:`, error);
    return { status: false, message: 'Network error. Please try again.' };
  }
};


// https://www.akaledu.net/akalsewa/api/Sewadar_Api/sewadar_estimate_his