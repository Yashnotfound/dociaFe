import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import callAPI from "../../../Shared/utils/api";
import CardHolderComponent from "../components/CardHolderComponent";

const CardHolder = ({ type }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("APPROVED");
  const [searchQuery, setSearchQuery] = useState("");

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
      try {
        const data = await callAPI({
          method: "GET",
          path: routes[type],
        });
        setDocuments(data);
      } catch (err) {
        console.error("Failed to fetch documents.", err);
      } finally {
        setLoading(false);
      }
    };

    if (type) fetchDocuments();
  }, [type, statusFilter, userId]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CardHolderComponent
      documents={filteredDocuments}
      loading={loading}
      statusFilter={statusFilter}
      handleFilterChange={handleFilterChange}
      type={type}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
    />
  );
};

export default CardHolder;
