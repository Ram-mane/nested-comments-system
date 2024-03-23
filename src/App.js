import { useState, useEffect } from "react";
import Comments from "./components/comments/comments";
import { commentData } from "./Data/commentData";
import useFunction from "./useFunction";

function App() {
  const [comments, setComments] = useState([]);
  const { addComment, deleteComment } = useFunction();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:7878/api/post/4");
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const commentsData = await response.json();
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComments = async (commentId, comment) => {
    try {
      await addComment(comments, commentId, comment);
      fetchComments()

    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentDelete = (commentId) => {
     deleteComment( commentId);
     fetchComments()
  };

  return (
    <div className="App">
      {
        comments.map((ele)=>(
          <Comments
        key={ele.id}
        comments={ele}
        handleAddComments={handleAddComments}
        handleCommentDelete={handleCommentDelete}
      />
        ))
      }
    </div>
  );
}

export default App;
