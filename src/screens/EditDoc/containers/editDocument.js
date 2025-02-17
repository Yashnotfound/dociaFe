import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../App";
import callAPI from "../../../Shared/utils/api";

export const editDocument = (documentId) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [docType, setDocType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;

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

        setDocType(data.type || "");
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
    if (!accessToken) {
      setError("User not authenticated.");
      toast.error("Authentication error!");
      return;
    }
    const payload = { title, description, content, type: docType };

    try {
      await callAPI({
        method: "PUT",
        path: `/documents/${documentId}`,
        payload,
        accessToken,
      });
      toast.success("Document updated successfully!");
      setTimeout(() => navigate(`/documents/${documentId}`), 2000);
    } catch (err) {
      setError("There was an issue updating the document.");
      toast.error("Failed to update document!");
    } finally {
      setLoading(false);
    }
  };

  return { formData, type:docType, loading, error, handleChange, handleEditorChange, onUpload, handleSubmit };
};

export default editDocument;
