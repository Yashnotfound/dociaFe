import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const createDocLogic = (type) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleEditorChange = (text) => setContent(text);

  const onUpload = (fileContent) => {
        setContent(fileContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
    const payload = {
      title,
      description,
      content,
      type : type
    };
    console.log
    
    try {
      await axios.post("http://localhost:8080/api/documents", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Document created successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Error submitting document:", error);
      setError("There was an issue creating the document.");
      toast.error("Failed to create document!");
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    description,
    content,
    loading,
    error,
    handleTitleChange,
    handleDescriptionChange,
    handleEditorChange,
    handleSubmit,
    onUpload,
  };
};
