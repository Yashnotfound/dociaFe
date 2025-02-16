import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { Box, CircularProgress, Paper, Button, Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "../../../App";
import { handleReviewDocument } from "../api/reviewDocumentAPI";
import {  toast } from "react-hot-toast";
import MarkdownViewer from "./MarkdownViewer";
import ApiContractViewer from "./ApiContractViewer";
import CommentsBar from "./CommentsBar";
import { callAPI } from "../../../Shared/utils/api";
import { documentViewLogic } from "../containers/documentViewLogic";
  
const DocumentViewerPage = () => {
  const { id } = useParams();
  const { document, refreshDocument } = documentViewLogic({ id });
  const { userAuth: { role, accessToken, username } = {} } = useContext(UserContext);
  const isAdmin = role === "ADMIN";
  const isAuthor = document && document.author === username;
  const navigate = useNavigate();

  const handleReview = async (status) => {
    try {
      await handleReviewDocument(id, status, accessToken);
      toast.success(`Document ${status.toLowerCase()} successfully!`);
      refreshDocument();
    } catch (error) {
      toast.error("Failed to update document status!");
    }
  };

  const handleEdit = () => {
    navigate(`/documents/edit/${document.id}`);
  };

  const deleteHandler = async () => {
    try {
      await callAPI({
        method: "DELETE",
        path: `/documents/${id}`,
        accessToken,
      });
      toast.success("Document deleted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("Failed to delete document!");
    }
  };

  if (!document) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box padding={2}>

      <div>
        <Typography variant="h4" gutterBottom style={{ display: "flex", alignItems: "center" }}>
          <span>{document.title}</span>
          <Chip
            label={document.status}
            color={document.status === "APPROVED" ? "success" : document.status === "REJECTED" ? "error" : "warning"}
            size="small"
            style={{ marginLeft: "10px" }}
          />
        </Typography>
        <Box display="flex" justifyContent="flex-end" marginTop={2} marginBottom={2} gap={1}>

          {isAdmin && document.status !== "APPROVED" && (
            <Button variant="contained" color="success" startIcon={<CheckIcon />} onClick={() => handleReview("APPROVED")}>
              Approve
            </Button>
          )}
          {isAdmin && document.status !== "REJECTED" && (
            <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={() => handleReview("REJECTED")}>
              Reject
            </Button>
          )}

          {isAuthor && (
            <>
              <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={deleteHandler}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </div>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          {document.author} | {document.createdAt.split('T')[0] + " " + document.createdAt.split('T')[1].substring(0, 8)}
        </Typography>
        {document.type === "GENERAL" ? (
          <MarkdownViewer markdown={document.content} />
        ) : (
          <ApiContractViewer content={document.content} />
        )}
      </Paper>

      <CommentsBar documentId={id} />
    </Box>
  );
};

export default DocumentViewerPage;
