import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import { callAPI } from "../../../Shared/utils/api";

export const useCardHolderLogic = ({ type, statusFilter }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userAuth: { userId } = {} } = useContext(UserContext);

  const routes = {
    general: `documents/find?type=GENERAL&status=APPROVED`,
    api: `documents/find?type=API_CONTRACT&status=APPROVED`,
    user: statusFilter
      ? `documents/find?userId=${userId}&status=${statusFilter}`
      : `documents/find?userId=${userId}`,
    "all-docs": statusFilter
      ? `documents/find?status=${statusFilter}`
      : `documents/find`,
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await callAPI({
          method: "GET",
          path: routes[type],
        });
        setDocuments(data);
      } catch (err) {
        setError("Failed to fetch documents.");
      } finally {
        setLoading(false);
      }
    };

    if (type) fetchDocuments();
  }, [type, statusFilter, userId]);

  return { items: documents, loading, error };
};
