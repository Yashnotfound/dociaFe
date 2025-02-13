import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";

export const useCardHolderLogic = ({ type }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userAuth:{userId} = {} } = useContext(UserContext);
  const routes = {
    "general": "/api/documents/find?type=GENERAL&status=APPROVED",
    "api": "/api/documents/find?type=API_CONTRACT",
    "user": `/api/documents/find?userId=${userId}`,
    "pending": "/api/documents/find?status=PENDING"
  }
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`http://localhost:8080${routes[type]}`);
        setDocuments(response.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to fetch documents.");
      } finally {
        setLoading(false);
      }
    };

    if (type) fetchDocuments();
  }, [type]);
  return { items : documents, loading, error };
};

