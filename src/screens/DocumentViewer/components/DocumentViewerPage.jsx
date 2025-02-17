import React from "react";
import { useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentsBar from "./CommentsBar";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Chip
} from "../../../Shared/components";
import MarkdownViewer from "./MarkdownViewer";
import ApiContractViewer from "./ApiContractViewer"
import { getStatusColor } from "../../../Shared/containers/getStatusColor";
import documentViewLogic from "../containers/documentViewLogic";

const DocumentViewerPage = () => {
  const { id } = useParams();
  const {
    document,
    handleReview,
    handleDelete,
    handleEdit,
    isAdmin,
    isAuthor,
  } = documentViewLogic({ id });

  if (!document) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <div>
        <Typography
          variant="h4"
          gutterBottom
          style={{ display: "flex", alignItems: "center" }}
        >
          <span>{document.title}</span>
          <Chip
            label={document.status}
            color={getStatusColor(document.status)}
            size="small"
            style={{ marginLeft: "10px" }}
          />
        </Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          marginTop={2}
          marginBottom={2}
          gap={1}
        >
          {isAdmin && document.status !== "APPROVED" && (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={() => handleReview("APPROVED")}
              label="Approve"
            />
          )}
          {isAdmin && document.status !== "REJECTED" && (
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={() => handleReview("REJECTED")}
              label="Reject"
            />
          )}
          {isAuthor && (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                label="Edit"
              />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                label="Delete"
              />
            </>
          )}
        </Box>
      </div>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          {document.author} |{" "}
          {document.createdAt.split("T")[0] +
            " " +
            document.createdAt.split("T")[1].substring(0, 8)}
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
