import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../App";
import callAPI from "../../../Shared/utils";

export const createDocLogic = ({ type }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;

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

    if (!accessToken) {
      setError("User not authenticated.");
      toast.error("Authentication error!");
      return;
    }

    setLoading(true);

    const payload = { title, description, content, type };

    try {
      await callAPI({
        method: "POST",
        path: "/documents",
        payload,
        accessToken,
      });
      toast.success("Document created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error submitting document:", error);
      setError("There was an issue submitting the document.");
      toast.error("Failed to create/update document!");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleEditorChange,
    handleSubmit,
    onUpload,
  };
};
