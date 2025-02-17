import React from "react";
import { TextField, Button, Box, Typography,MarkdownEditor,UploadYaml } from "../../../Shared/components";
import AnimationWrapper from "../../../navigation/hoc/page-animation";

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


          {type === "GENERAL" ? (
            <MarkdownEditor content={formData.content} handleEditorChange={handleEditorChange} />
          ) : (
            <UploadYaml onUpload={onUpload} />
          )}


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

export default CreateDocumentPage;
