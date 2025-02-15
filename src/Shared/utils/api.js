import axios from "axios"

const baseURL = import.meta.env.VITE_APP_URL;
const api = axios.create({
  baseURL: baseURL,
});

const callAPI = async (method, path, headers, payload, successResponse, errorResponse) => {
  try {
    const response = await api({
      method: method,
      url: path,
      headers: headers,
      data: payload,
    });
    successResponse(response.data);
  } catch (error) {
    errorResponse(error);
  }
};

export { callAPI };
