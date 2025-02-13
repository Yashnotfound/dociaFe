import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/documents";

export const fetchComments = async (documentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${documentId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const postComment = async (documentId, text, accessToken) => {
    debugger;
  try {
    const req = {
        content : text
    }
    const response =  await axios.post(`${API_BASE_URL}/${documentId}/comments`,
      req,
    {
        headers: {
            Authorization: `Bearer ${accessToken}`}
    });
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};
