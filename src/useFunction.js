const useFunction = () => {
    const addComment = (tree, commentId, newComment) => {
      if (!Array.isArray(tree.replies)) {
        tree.replies = [];
      }
  
      if (tree.id === commentId) {
        // Add the new comment to the beginning of the replies array
        tree.replies.unshift(newComment);
        return tree;
      }
  
      // Recursively update the replies of each comment in the tree
      const updatedReplies = tree.replies.map(com =>
        addComment(com, commentId, newComment)
      );
  
      // Update the current comment with the updated replies
      return { ...tree, replies: updatedReplies };
    };


    const deleteComment =(tree, commentId)=>{

        if(tree.id === commentId){
           return tree.replies.filter(com => com.id !== commentId);
        }

         // Recursively update the replies of each comment in the tree
      const updatedReplies = tree.replies.map(com =>
        deleteComment(com, commentId)
      );
  
      // Update the current comment with the updated replies
      return { ...tree, replies: updatedReplies };

    }

    return { addComment , deleteComment};
  };
  
  export default useFunction;
  