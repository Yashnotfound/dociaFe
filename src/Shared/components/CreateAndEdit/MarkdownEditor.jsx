import React from "react";
import { Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

const MarkdownEditor = ({content,handleEditorChange}) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Content
      </Typography>
      <MDEditor value={content} onChange={handleEditorChange} />
    </>
  );
};

export default MarkdownEditor;
