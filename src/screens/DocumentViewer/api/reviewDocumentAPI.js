import axios from 'axios';
import { toast } from 'react-hot-toast';

export const handleReviewDocument = async (id, status, accessToken) => {
  try {
    const data = { status };

    const response = await axios.patch(
      `http://localhost:8080/api/documents/${id}/review`,
      data, 
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`, 
        },
      }
    );

    toast.success("Document reviewed successfully!");
    return response;
  } catch (error) {
    console.error("Error fetching document:", error);
    toast.error("Failed to review document!");
  }
};
