import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import {MarkdownEditor} from "../../../Shared/components";
import {UploadYaml} from "../../../Shared/components";
import { editDocument } from "../containers/editDocument";
import { useParams } from "react-router-dom";

const EditDocumentPage = () => {
  const { id } = useParams();
  const {
    formData,
    loading,
    error,
    handleChange,
    handleEditorChange,
    onUpload,
    handleSubmit,
    type,
  } = editDocument(id);

  if (loading) {
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
      <Paper sx={{ padding: 3, maxWidth: 800, margin: "auto", marginTop: 6 }}>
        <Typography variant="h4" gutterBottom>
          Edit Document
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
          {
            type === "GENERAL" && (
              <MarkdownEditor
                content={formData.content}
                handleEditorChange={handleEditorChange}
              />
            )
          }
          {
            type !== "GENERAL" && <UploadYaml onUpload={onUpload} />
          }
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </form>
      </Paper>
  );
};

export default EditDocumentPage;
