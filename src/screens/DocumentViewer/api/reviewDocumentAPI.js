import callAPI from "../../../Shared/utils/api";
import { toast } from "react-hot-toast";

export const handleReviewDocument = async (id, status, accessToken) => {
  try {
    const payload = { status };
    const response = await callAPI({
      method: "PATCH",
      path: `/documents/${id}/review`,
      payload,
      accessToken,
    });
    return response;
  } catch (error) {
    console.error("Error reviewing document:", error);
    toast.error("Failed to review document!");
    throw error;
  }
};
