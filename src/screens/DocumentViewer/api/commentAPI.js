import callAPI from "../../../Shared/utils/api";

export const fetchComments = async (documentId) => {
  try {
    const data = await callAPI({
      method: "GET",
      path: `/documents/${documentId}/comments`,
    });
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const postComment = async (documentId, text, accessToken) => {
  try {
    const payload = { content: text };
    const data = await callAPI({
      method: "POST",
      path: `/documents/${documentId}/comments`,
      payload,
      accessToken,
    });
    return data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};
