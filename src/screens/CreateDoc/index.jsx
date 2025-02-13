import React from "react";
import { TextField, Button, Typography, Card, CardMedia, Box } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { createDocLogic } from "../CreateDoc/containers/createDocLogic";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AnimationWrapper from "../../utils/page-animation";
import { Toaster } from "react-hot-toast";

const CreateDocument = () => {
  debugger;
  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  const {
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
  } = createDocLogic();

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

        {/* Static Image Display */}
        <Card sx={{ maxWidth: 300, mb: 2 }}>
          <CardMedia component="img" height="160" image={staticImageUrl} alt="Banner" />
        </Card>

        {/* Markdown Editor */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          Content
        </Typography>
        <MDEditor value={content} onChange={handleEditorChange} />

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
