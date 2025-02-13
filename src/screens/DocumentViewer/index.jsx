import { Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Paper } from '@mui/material'
import { documentViewLogic } from './containers/documentViewLogic'
import MarkdownViewer from './components/MarkdownViewer'
import CommentsBar from './components/CommentsBar'

const DocumentViewer = () => {
    const {id} = useParams();
    const document = documentViewLogic({ id });
    if (!document) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
      }
    
      return (
        <Box padding={2}>
          <Typography variant="h4" gutterBottom>
            {document.title}
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              {document.author} | {document.createdAt}
            </Typography>
            <MarkdownViewer markdown={document.content}/>
          </Paper>
          <CommentsBar documentId={id} />
        </Box>
  )
}
export default DocumentViewer;
