import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Paper } from "@mui/material";
import { documentViewLogic } from "./containers/documentViewLogic";
import MarkdownViewer from "./components/MarkdownViewer";
import CommentsBar from "./components/CommentsBar";
import Chip from "@mui/material/Chip";
import { getStatusColor } from "./containers/getStatusColor";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../../App";
import { useContext } from "react";
import { handleReviewDocument } from "./api/reviewDocumentAPI";
import {Toaster} from "react-hot-toast";
import ApiContractViewer from "./components/ApiContractViewer";


const DocumentViewer = () => {
  const { id } = useParams();
  const document = documentViewLogic({ id });
  const { userAuth: { role,accessToken } = {} } = useContext(UserContext);
  const isAdmin = (role === "ADMIN");
  const handleReview = (status) => {
    console.log("Document Approved");
    handleReviewDocument(id, status ,accessToken);
  };

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
      <Toaster />
      {/* Document Title and Status */}
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
      </div>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          {document.author} | {document.createdAt}
        </Typography>

      {
        document.type == "GENERAL"?
        <MarkdownViewer markdown={document.content} />
        :
        <ApiContractViewer content={document.content}/>
      }
      </Paper>

       {/* Admin buttons: Approve/Reject */}
       {isAdmin && (
        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={()=>handleReview("APPROVED")}
            style={{ marginRight: "10px" }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            onClick={()=>handleReview("REJECTED")}
          >
            Reject
          </Button>
        </Box>
      )}

      <CommentsBar documentId={id} />
    </Box>
  );
};
export default DocumentViewer;
