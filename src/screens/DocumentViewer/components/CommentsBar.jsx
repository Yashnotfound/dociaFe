import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useComments from "../containers/useComments";
import { UserContext } from "../../../App";

const CommentsBar = ({ documentId }) => {
  const { comments, loading, error, addComment } = useComments(documentId);
  const [comment, setComment] = useState("");
  const { userAuth: { accessToken } = {} } = useContext(UserContext);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    await addComment(comment);
    setComment("");
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      {/* Comment Input */}
      {accessToken && (
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            label="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ marginRight: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            disabled={!comment.trim()}
            endIcon={<SendIcon />}
          >
            Post
          </Button>
        </Box>
      )}

      {/* Loading & Error Handling */}
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "10px auto" }} />
      )}
      {error && <Typography color="error">{error}</Typography>}

      {/* Comments List */}
      <List sx={{ marginTop: 2 }}>
        {comments.length === 0 ? (
          <Typography color="textSecondary">No comments yet.</Typography>
        ) : (
          comments.map((c) => (
            <ListItem key={c.id} divider>
              <ListItemText
                primary={c.content}
                secondary={`${c.author} at ${c.createdAt.split('T')[0] + " " + c.createdAt.split('T')[1].substring(0, 8)}`}
                sx={{ wordWrap: "break-word" }}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default CommentsBar;
