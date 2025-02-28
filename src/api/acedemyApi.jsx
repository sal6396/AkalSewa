import { apiClient } from "./apiClient";

export const fetchAcademyList = (id, token, imei_number) => {
  return apiClient('Academy_Api/getAcademyList', 'POST', {
    id,
    token,
    imei_number,
  }, token);
};
