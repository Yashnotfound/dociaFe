import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const documentViewLogic = ({ id }) => {
  const [document, setDocument] = useState(null);
  const [refresh, setRefresh] = useState(0); 

  const fetchDocument = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/documents/${id}`);
      setDocument(response.data);
    } catch (err) {
      toast.error("Failed to fetch document.");
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [id, refresh]);

  const refreshDocument = () => setRefresh((prev) => prev + 1);

  return { document, refreshDocument };
};
