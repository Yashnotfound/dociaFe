import { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../App";
import callAPI from "../../../Shared/utils/api";
import { handleReviewDocument } from "../api/reviewDocumentAPI";
import { useNavigate } from "react-router-dom";

export const documentViewLogic = ({ id }) => {
  const [document, setDocument] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const { userAuth: { accessToken, username, role } = {} } = useContext(UserContext);

  const fetchDocument = async () => {
    try {
      debugger;
      const data = await callAPI({
        method: "GET",
        path: `/documents/${id}`,
      });
      setDocument(data);
    } catch (err) {
      toast.error("Failed to fetch document.");
      console.error("Error fetching document:", err);
    }
  };
  

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id, refresh]);

  const refreshDocument = () => setRefresh((prev) => prev + 1);

  const handleReview = async (status) => {
    try {
      await handleReviewDocument(id, status, accessToken);
      toast.success(`Document ${status.toLowerCase()} successfully!`);
      refreshDocument();
    } catch (error) {
      toast.error("Failed to update document status!");
    }
  };

  const handleDelete = async () => {
    try {
      await callAPI({
        method: "DELETE",
        path: `/documents/${id}`,
        accessToken,
      });
      toast.success("Document deleted successfully!");
      navigate("/")
    } catch (error) {
      toast.error("Failed to delete document!");
    }
  };

  const handleEdit = () => {
    if (document) {
      navigate(`/documents/edit/${document.id}`);
    }
  };

  return {
    document,
    refreshDocument,
    handleReview,
    handleDelete,
    handleEdit,
    isAdmin: accessToken && role === "ADMIN",
    isAuthor: document && document.author === username,
  };
};

export default documentViewLogic;
