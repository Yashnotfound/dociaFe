import React from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  Box,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { createDocLogic } from "../CreateDoc/containers/createDocLogic";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AnimationWrapper from "../../utils/page-animation";
import { Toaster } from "react-hot-toast";
import Markdown from "react-markdown";
import MarkdownEditor from "./components/MarkdownEditor";
import UploadYaml from "./components/UploadYaml";

const CreateDocument = ({type}) => {
  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;
  const staticImageUrl = "https://random.imagecdn.app/500/150"
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  const {
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
  } = createDocLogic({type});

  return (
    <AnimationWrapper>
      <Toaster />
      <Box sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Document
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            sx={{ mb: 2 }}
          />

          {/* Description */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={handleDescriptionChange}
            sx={{ mb: 2 }}
          />

          <Card sx={{ maxWidth: 300, mb: 2 }}>
            <CardMedia
              component="img"
              height="160"
              image={staticImageUrl}
              alt="Banner"
            />
          </Card>

          {/* Markdown Editor */}
          {type === "GENERAL" ? (
            <MarkdownEditor
              content={content}
              handleEditorChange={handleEditorChange}
            />
          ) : (
            <UploadYaml onUpload={onUpload} />
          )}
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Box>
    </AnimationWrapper>
  );
};

export default CreateDocument;
