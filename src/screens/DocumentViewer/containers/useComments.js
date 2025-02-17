import { useState, useEffect,useContext } from "react";
import { fetchComments, postComment } from "../api/commentAPI";
import {UserContext} from "../../../App";

const useComments = (documentId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userAuth: { accessToken } = {} } = useContext(UserContext);
  const [isLogin, SetIsLogin] = useState(false);
  const [comment, setComment] = useState("");


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

  useEffect(()=>{
    SetIsLogin(accessToken!=null)
  },[accessToken])

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    await addComment(comment);
    setComment("");
  };

  const addComment = async (text) => {
    try {
      if(!accessToken){
        setError("You need to be logged in to post a comment");
        return;
    } 
      const newComments = await postComment(documentId, text, accessToken);
      setComments(newComments);
    } catch (err) {
      setError("Failed to post comment.");
    }
  };

  return { comments, loading, error, isLogin, addComment,comment,setComment,handleCommentSubmit };
};

export default useComments;
