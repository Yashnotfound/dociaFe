import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const callAPI = async ({ method = "GET", path, payload = null, accessToken, headers: customHeaders = {} }) => {
  try {
    const response = await api({
      method,
      url: path,
      data: payload,
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
