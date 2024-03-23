import { useState } from "react";
import "./comments.css";

const Comments = ({ comments, handleAddComments, handleCommentDelete }) => {
  const [showInput, setShowInput] = useState(false);

  const [commentBody, setCommentBody] = useState("");

  const handleAdd = () => {
    // let newComments = {
    //   content: commentBody,
    // };
    handleAddComments(comments.id, commentBody);
    setShowInput(false);
  };

  return (
    <div>
      <div className={`${comments.content && "comment-container"}`}>
        <h3>{comments.content}</h3>
        {showInput && (
          <input
            type="content"
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
          comments.content?(
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
