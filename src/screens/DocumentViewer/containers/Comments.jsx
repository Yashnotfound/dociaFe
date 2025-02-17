import { useState, useEffect, useContext } from "react";
import { fetchComments, postComment } from "../api/commentAPI";
import { UserContext } from "../../../App";
import CommentsBar from "../components/CommentsBar";

const Comments = ({ documentId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userAuth: { accessToken } = {} } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      try {
        const data = await fetchComments(documentId);
        setComments(data);
      } catch (err) {
        setError("Failed to load comments.");
      }
      setLoading(false);
    };

    loadComments();
  }, [documentId]);

  useEffect(() => {
    setIsLogin(accessToken != null);
  }, [accessToken]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    await addComment(comment);
    setComment("");
  };

  const addComment = async (text) => {
    try {
      if (!accessToken) {
        setError("You need to be logged in to post a comment");
        return;
      }
      const newComments = await postComment(documentId, text, accessToken);
      setComments(newComments);
    } catch (err) {
      setError("Failed to post comment.");
    }
  };

  const toggleShowMore = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <CommentsBar
      comments={comments}
      loading={loading}
      error={error}
      isLogin={isLogin}
      comment={comment}
      setComment={setComment}
      handleCommentSubmit={handleCommentSubmit}
      showAll={showAll}
      toggleShowMore={toggleShowMore}
    />
  );
};

export default Comments;
