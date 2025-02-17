import React from "react";
import { TextField, Button, Box, Typography, Paper, CircularProgress, MarkdownEditor, UploadYaml } from "../../../Shared/components";
import AnimationWrapper from "../../../navigation/hoc/page-animation";
import { motion } from "framer-motion";

const CreateDocumentPage = ({
  type,
  formData,
  loading,
  error,
  handleChange,
  handleEditorChange,
  handleSubmit,
  onUpload,
}) => {
  return (
    <AnimationWrapper>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 800,
            borderRadius: 4,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Create a New Document
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title Input */}
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

            {/* Description Input */}
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

            {/* Markdown Editor or YAML Upload */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              sx={{ mb: 2 }}
            >
              {type === "GENERAL" ? (
                <MarkdownEditor content={formData.content} handleEditorChange={handleEditorChange} />
              ) : (
                <UploadYaml onUpload={onUpload} />
              )}
            </Box>

            {/* Submit Button */}
            <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: 3,
                  transition: "all 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </AnimationWrapper>
  );
};

export default CreateDocumentPage;
