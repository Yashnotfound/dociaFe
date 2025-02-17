import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import Comments from "../containers/Comments";
import {
  Button,
  Typography,
  Box,
  Paper,
  Chip,
} from "../../../Shared/components";
import MarkdownViewer from "./MarkdownViewer";
import ApiContractViewer from "./ApiContractViewer";
import { getStatusColor } from "../../../Shared/containers/getStatusColor";

const DocumentViewerPage = ({
  document,
  handleReview,
  handleDelete,
  handleEdit,
  handleDownload,
  isAdmin,
  isAuthor,
}) => {
  return (
    <Box padding={4}>
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
        <Chip
          label={document.status}
          color={getStatusColor(document.status)}
          size="small"
          sx={{ fontSize: "0.875rem", fontWeight: "bold", padding: "5px 10px" }}
        />
        <Typography variant="h4" fontWeight="bold">
          {document.title}
        </Typography>
      </Box>

      <Typography variant="subtitle1" color="textSecondary" paragraph>
        {document.author} | {new Date(document.createdAt).toLocaleString()}
      </Typography>

      <Box display="flex" justifyContent="flex-end" gap={1} sx={{ mb: 3 }}>
        {isAdmin && document.status !== "APPROVED" && (
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={() => handleReview("APPROVED")}
          >
            Approve
          </Button>
        )}
        {isAdmin && document.status !== "REJECTED" && (
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            onClick={() => handleReview("REJECTED")}
          >
            Reject
          </Button>
        )}
        {isAuthor && (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
        <Button
          variant="contained"
          color="info"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>
      </Box>

      <Paper elevation={3} sx={{ padding: 3, borderRadius: 4, mb: 4 }}>
        {document.type === "GENERAL" ? (
          <MarkdownViewer markdown={document.content} />
        ) : (
          <ApiContractViewer content={document.content} />
        )}
      </Paper>

      <Comments documentId={document.id} />
    </Box>
  );
};

export default DocumentViewerPage;
