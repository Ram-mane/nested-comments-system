import { useState } from "react";
import Comments from "./components/comments/comments";
import { commentData } from "./Data/commentData";
import useFunction from "./useFunction";

function App() {
  const [comments, setComments] = useState(commentData);

  const { addComment, deleteComment } = useFunction();

  const handleAddComments = (commentId, comment) => {
    const updatedTree = addComment(comments, commentId, comment);
    setComments(updatedTree);
  };

  const handleCommentDelete = (commentId) => {
    const updatedTree = deleteComment(comments, commentId);
    setComments(updatedTree);
  };
  return (
    <div className="App">
      <Comments
        key={comments.id}
        comments={comments}
        handleAddComments={handleAddComments}
        handleCommentDelete = {handleCommentDelete}
      />
    </div>
  );
}

export default App;
