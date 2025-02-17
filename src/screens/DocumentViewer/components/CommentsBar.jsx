import React from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "../../../Shared/components";
import { List, ListItem, ListItemText } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentsBar = ({
  comments,
  loading,
  error,
  isLogin,
  comment,
  setComment,
  handleCommentSubmit,
  showAll,
  toggleShowMore,
}) => {
  const displayedComments = showAll ? comments : comments.slice(0, 3);

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3, borderRadius: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Comments
      </Typography>

      {isLogin && (
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
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

      {loading && (
        <CircularProgress sx={{ display: "block", margin: "10px auto" }} />
      )}
      {error && (
        <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
          {error}
        </Typography>
      )}

      <List sx={{ mt: 2 }}>
        {comments.length === 0 ? (
          <Typography color="textSecondary" sx={{ textAlign: "center" }}>
            No comments yet.
          </Typography>
        ) : (
          displayedComments.map((c) => (
            <ListItem key={c.id} divider sx={{ py: 1.5 }}>
              <ListItemText
                primary={c.content}
                secondary={`${c.author} - ${new Date(c.createdAt).toLocaleString()}`}
              />
            </ListItem>
          ))
        )}
      </List>

      {comments.length > 3 && (
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="text" onClick={toggleShowMore}>
            {showAll ? "Show Less" : "Show More Comments"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default CommentsBar;
