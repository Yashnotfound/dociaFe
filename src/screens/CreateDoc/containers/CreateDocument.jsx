import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../App";
import callAPI from "../../../Shared/utils/api";
import CreateDocumentPage from "../components/CreateDocumentPage";

const CreateDocument = ({ type }) => {
  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

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
        method: "POST",
        path: "/documents",
        payload: { title, description, content, type },
        accessToken,
      });
      toast.success("Document created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting document:", error);
      setError("There was an issue submitting the document.");
      toast.error("Failed to create document!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateDocumentPage
      type={type}
      formData={formData}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleEditorChange={handleEditorChange}
      handleSubmit={handleSubmit}
      onUpload={onUpload}
    />
  );
};

export default CreateDocument;
