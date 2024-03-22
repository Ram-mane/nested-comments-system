import { useState } from "react";
import "./comments.css";

const Comments = ({ comments, handleAddComments, handleCommentDelete }) => {
  const [showInput, setShowInput] = useState(false);

  const [commentBody, setCommentBody] = useState("");

  const handleAdd = () => {
    let newComments = {
      id: Date.now(),
      text: commentBody,
      replies: [],
    };
    handleAddComments(comments.id, newComments);
    setShowInput(false);
  };

  return (
    <div>
      <div className={`${comments.text && "comment-container"}`}>
        <h3>{comments.text}</h3>
        {showInput && (
          <input
            type="text"
            onChange={(e) => setCommentBody(e.target.value)}
            autoFocus
          />
        )}
        {showInput ? (
          <div>
            <button onClick={handleAdd}>Add</button>
            <button onClick={() => setShowInput(false)}>Cancle</button>
          </div>
        ) : (
          comments.text?(
            <div>
            <button onClick={() => setShowInput(true)}>Reply</button>
            <button onClick={()=> handleCommentDelete(comments.id)}>Delete</button>
          </div>
          ) : null
        )}
      </div>
      <div style={{ paddingLeft: "30px" }}>
        {comments?.replies?.map((com) => (
          <Comments
            key={com.id}
            comments={com}
            handleAddComments={handleAddComments}
            handleCommentDelete={handleCommentDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
