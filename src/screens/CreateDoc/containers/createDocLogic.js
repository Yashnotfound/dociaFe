import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const createDocLogic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const staticImageUrl = "https://picsum.photos/300/160"; 

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleEditorChange = (text) => setContent(text);

  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      description,
      content,
      type: "GENERAL",
    };

    try {
      const response = await axios.post("http://localhost:8080/api/documents", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Document created:", response.data); 
      toast.success("Document created successfully!"); 
      setLoading(false);
      setTimeout(() => navigate("/"), 1000);

    } catch (error) {
      console.error("Error submitting document:", error);
      setError("There was an issue creating the document.");
      toast.error("Failed to create document!");
      setLoading(false);
    }
  };

  return {
    title,
    description,
    content,
    staticImageUrl,
    loading,
    error,
    handleTitleChange,
    handleDescriptionChange,
    handleEditorChange,
    handleSubmit,
  };
};
