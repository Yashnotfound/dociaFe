import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../App";
import callAPI from "../../../Shared/utils/api";
import { handleReviewDocument } from "../api/reviewDocumentAPI";
import DocumentViewerPage from "../components/DocumentViewerPage";
import { Box, CircularProgress, Typography } from "../../../Shared/components";
import yaml from "js-yaml";
import { saveAs } from "file-saver";

const DocumentViewer = () => {
  const { id: documentId } = useParams();
  const [document, setDocument] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const { userAuth: { accessToken, username, role } = {} } = useContext(UserContext);

  useEffect(() => {
    if (documentId) fetchDocument();
  }, [documentId, refresh]);

  const fetchDocument = async () => {
    try {
      const data = await callAPI({ method: "GET", path: `/documents/${documentId}` });
      setDocument(data);
    } catch (err) {
      toast.error("Failed to fetch document.");
      console.error("Error fetching document:", err);
    }
  };

  const refreshDocument = () => setRefresh((prev) => prev + 1);

  const handleReview = async (status) => {
    try {
      await handleReviewDocument(documentId, status, accessToken);
      toast.success(`Document ${status.toLowerCase()} successfully!`);
      refreshDocument();
    } catch (error) {
      toast.error("Failed to update document status!");
    }
  };

  const handleDelete = async () => {
    try {
      await callAPI({ method: "DELETE", path: `/documents/${documentId}`, accessToken });
      toast.success("Document deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete document!");
    }
  };

  const handleEdit = () => {
    if (document) navigate(`/documents/edit/${document.id}`);
  };

  const handleDownload = () => {
    if (!document) return;
    try {
      const fileContent =
        document.type === "GENERAL"
          ? document.content
          : yaml.dump(document.content, { indent: 2 });
  
      const fileExtension = document.type === "GENERAL" ? "md" : "yaml";
      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
  
      saveAs(blob, `${document.title.replace(/\s+/g, "_")}.${fileExtension}`);
    } catch (error) {
      console.error("Error generating file:", error);
    }
  };

  if (!document) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
        <CircularProgress />
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          Loading document...
        </Typography>
      </Box>
    );
  }

  return (
    <DocumentViewerPage
      document={document}
      handleReview={handleReview}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleDownload={handleDownload}
      isAdmin={accessToken && role === "ADMIN"}
      isAuthor={document && document.author === username}
    />
  );
};

export default DocumentViewer;
