import React, { useContext } from "react";
import { TextField, Button, Box, Typography, Card, CardMedia } from "@mui/material";
import { createDocLogic } from "../containers/createDocLogic";
import { UserContext } from "../../../App";
import { Navigate } from "react-router-dom";
import AnimationWrapper from "../../../navigation/hoc/page-animation";
import { Toaster } from "react-hot-toast";
import MarkdownEditor from "../../../Shared/components/CreateAndEdit/MarkdownEditor";
import UploadYaml from "../../../Shared/components/CreateAndEdit/UploadYaml";

const CreateDocPage = ({ type }) => {
  const { userAuth } = useContext(UserContext);
  const accessToken = userAuth?.accessToken;

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  const {
    formData,
    loading,
    error,
    handleChange,
    handleEditorChange,
    handleSubmit,
    onUpload,
  } = createDocLogic({ type });

  return (
    <AnimationWrapper>
      <Box sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {document ? "Edit Document" : "Create Document"}
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <TextField
            fullWidth
            name="title"
            label="Title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />

          {/* Description */}
          <TextField
            fullWidth
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
            multiline
            rows={3}
          />

          {/* Markdown Editor or YAML Upload based on type */}
          {type === "GENERAL" ? (
            <MarkdownEditor content={formData.content} handleEditorChange={handleEditorChange} />
          ) : (
            <UploadYaml onUpload={onUpload} />
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
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

export default CreateDocPage;