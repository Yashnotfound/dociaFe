import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../App";
import callAPI from "../../../Shared/utils/api";
import EditDocumentPage from "../components/EditDocumentPage";

const EditDocument = () => {
  const { id: documentId } = useParams();
  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [docType, setDocType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await callAPI({
          method: "GET",
          path: `/documents/${documentId}`,
          accessToken,
        });
        setFormData({
          title: data.title || "",
          description: data.description || "",
          content: data.content || "",
        });

        setDocType(data.type || "GENERAL");
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Failed to fetch document details.");
        toast.error("Failed to fetch document details.");
      } finally {
        setLoading(false);
      }
    };

    if (documentId && accessToken) {
      fetchDocument();
    }
  }, [documentId, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (text) => {
    setFormData((prev) => ({ ...prev, content: text }));
  };

  const onUpload = (fileContent) => {
    setFormData((prev) => ({ ...prev, content: fileContent }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, content } = formData;
    if (!title || !description || !content) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);

    try {
      await callAPI({
        method: "PUT",
        path: `/documents/${documentId}`,
        payload: { title, description, content, type: docType },
        accessToken,
      });
      toast.success("Document updated successfully!");
      navigate(`/documents/${documentId}`);
    } catch (err) {
      setError("There was an issue updating the document.");
      toast.error("Failed to update document!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditDocumentPage
      formData={formData}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleEditorChange={handleEditorChange}
      onUpload={onUpload}
      handleSubmit={handleSubmit}
      type={docType}
    />
  );
};

export default EditDocument;
